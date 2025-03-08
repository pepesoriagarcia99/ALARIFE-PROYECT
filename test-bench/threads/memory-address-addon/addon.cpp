// #include <napi.h>
// #include <unordered_map>
// #include <mutex>

// class SharedInstanceManager {
// private:
//     std::unordered_map<std::string, Napi::ObjectReference> instances;
//     std::mutex mtx;

// public:
//     void set(const std::string& key, Napi::Object obj) {
//         std::lock_guard<std::mutex> lock(mtx);
//         instances[key] = Napi::Persistent(obj); // Guardamos una referencia persistente
//     }

//     Napi::Value get(const Napi::CallbackInfo& info, const std::string& key) {
//         Napi::Env env = info.Env();
//         std::lock_guard<std::mutex> lock(mtx);

//         auto it = instances.find(key);
//         if (it != instances.end()) {
//             return it->second.Value(); // Retorna la referencia almacenada
//         }
//         return env.Null();
//     }
// };

// // Instancia global del administrador
// SharedInstanceManager instanceManager;

// // Función para almacenar una instancia de JS
// Napi::Value SetInstance(const Napi::CallbackInfo& info) {
//     Napi::Env env = info.Env();
//     if (info.Length() < 2 || !info[0].IsString() || !info[1].IsObject()) {
//         Napi::TypeError::New(env, "Invalid arguments").ThrowAsJavaScriptException();
//         return env.Null();
//     }

//     std::string key = info[0].As<Napi::String>();
//     instanceManager.set(key, info[1].As<Napi::Object>());

//     return Napi::Boolean::New(env, true);
// }

// // Función para recuperar una instancia de JS
// Napi::Value GetInstance(const Napi::CallbackInfo& info) {
//     Napi::Env env = info.Env();
//     if (info.Length() < 1 || !info[0].IsString()) {
//         Napi::TypeError::New(env, "Invalid arguments").ThrowAsJavaScriptException();
//         return env.Null();
//     }

//     std::string key = info[0].As<Napi::String>();
//     return instanceManager.get(info, key);
// }

// // Inicialización del módulo
// Napi::Object Init(Napi::Env env, Napi::Object exports) {
//     exports.Set(Napi::String::New(env, "set"), Napi::Function::New(env, SetInstance));
//     exports.Set(Napi::String::New(env, "get"), Napi::Function::New(env, GetInstance));
//     return exports;
// }

// NODE_API_MODULE(addon, Init)
#include <node.h>
#include <v8.h>
#include <uv.h>
#include <memory>
#include <iostream>

using namespace v8;

struct Task {
    uv_work_t request;
    Isolate* isolate;
    Global<Object> jsInstance;
    Persistent<Function> callback;
};

// Global para almacenar la instancia JS
Global<Object> storedInstance;

// ✅ `set()` - Recibe y guarda la instancia de la clase JS
void Set(const FunctionCallbackInfo<Value>& args) {
    Isolate* isolate = args.GetIsolate();
    HandleScope handleScope(isolate);

    if (args.Length() < 1 || !args[0]->IsObject()) {
        isolate->ThrowException(String::NewFromUtf8(isolate, "Expected an object").ToLocalChecked());
        return;
    }

    Local<Object> instance = args[0].As<Object>();
    storedInstance.Reset(isolate, instance);
}

// 🛠 Simulación de tarea bloqueante en otro hilo
// void DoWork(uv_work_t* req) {
//     Task* task = static_cast<Task*>(req->data);
    // std::this_thread::sleep_for(std::chrono::seconds(2));  // Simula una tarea bloqueante
// }

// ✅ `get()` - Accede a la instancia y ejecuta un método en un worker thread
void Get(const FunctionCallbackInfo<Value>& args) {
    Isolate* isolate = args.GetIsolate();
    HandleScope handleScope(isolate);

    if (storedInstance.IsEmpty()) {
        args.GetReturnValue().Set(Null(isolate));
        return;
    }

    // Crear la tarea
    Task* task = new Task;
    task->request.data = task;
    task->isolate = isolate;
    task->jsInstance.Reset(isolate, Local<Object>::New(isolate, storedInstance));

    // Ejecutar la tarea en un worker thread
    uv_queue_work(uv_default_loop(), &task->request, DoWork,
        [](uv_work_t* req, int status) {
            Task* task = static_cast<Task*>(req->data);
            Isolate* isolate = task->isolate;
            HandleScope handleScope(isolate);

            // Obtener el contexto actual
            Local<Context> context = isolate->GetCurrentContext();

            // Recuperar la instancia JS
            Local<Object> instance = Local<Object>::New(isolate, task->jsInstance);

            // Obtener el método `run()`
            Local<Value> methodVal = instance->Get(context, String::NewFromUtf8(isolate, "run").ToLocalChecked()).ToLocalChecked();

            if (methodVal->IsFunction()) {
                Local<Function> method = methodVal.As<Function>();
                method->Call(context, instance, 0, nullptr);
            }

            delete task;
        }
    );

    args.GetReturnValue().Set(Undefined(isolate));
}

// Inicialización del módulo
void Init(Local<Object> exports) {
    NODE_SET_METHOD(exports, "set", Set);
    NODE_SET_METHOD(exports, "get", Get);
}

NODE_MODULE(NODE_GYP_MODULE_NAME, Init)
