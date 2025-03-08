#include <napi.h>
#include <string>
#include <fstream>
#include <sstream>
#ifdef _WIN32
#include <windows.h>
#include <psapi.h>
#else
#include <unistd.h>
#include <sys/types.h>
#include <sys/sysctl.h>
#endif

Napi::Object GetMemoryUsage(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    if (info.Length() < 1 || !info[0].IsNumber()) {
        Napi::TypeError::New(env, "PID requerido").ThrowAsJavaScriptException();
        return Napi::Object::New(env);
    }
    int pid = info[0].As<Napi::Number>().Int32Value();
    
    size_t heapTotal = 0, heapUsed = 0, rss = 0;

#ifdef _WIN32
    HANDLE hProcess = OpenProcess(PROCESS_QUERY_INFORMATION | PROCESS_VM_READ, FALSE, pid);
    if (hProcess) {
        PROCESS_MEMORY_COUNTERS pmc;
        if (GetProcessMemoryInfo(hProcess, &pmc, sizeof(pmc))) {
            rss = pmc.WorkingSetSize;
            heapUsed = pmc.PagefileUsage;
            heapTotal = pmc.PeakPagefileUsage;
        }
        CloseHandle(hProcess);
    }
#elif __linux__
    std::ifstream statusFile("/proc/" + std::to_string(pid) + "/status");
    std::string line;
    while (std::getline(statusFile, line)) {
        std::istringstream iss(line);
        std::string key;
        size_t value;
        std::string unit;
        if (iss >> key >> value >> unit) {
            if (key == "VmRSS:") rss = value * 1024;
        }
    }
    std::ifstream statmFile("/proc/" + std::to_string(pid) + "/statm");
    size_t size, resident;
    if (statmFile >> size >> resident) {
        heapTotal = size * sysconf(_SC_PAGE_SIZE);
        heapUsed = resident * sysconf(_SC_PAGE_SIZE);
    }
#elif __APPLE__
    struct task_basic_info info;
    mach_msg_type_number_t count = TASK_BASIC_INFO_COUNT;
    if (task_info(mach_task_self(), TASK_BASIC_INFO, (task_info_t)&info, &count) == KERN_SUCCESS) {
        rss = info.resident_size;
        heapUsed = info.virtual_size;
        heapTotal = info.virtual_size;
    }
#endif

    Napi::Object result = Napi::Object::New(env);
    result.Set("heapTotal", Napi::Number::New(env, heapTotal));
    result.Set("heapUsed", Napi::Number::New(env, heapUsed));
    result.Set("rss", Napi::Number::New(env, rss));
    return result;
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
    exports.Set("getMemoryUsage", Napi::Function::New(env, GetMemoryUsage));
    return exports;
}

NODE_API_MODULE(memoryusage, Init)
