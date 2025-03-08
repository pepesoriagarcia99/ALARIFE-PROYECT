#include <napi.h>
#include <windows.h>
#include <psapi.h>
#include <chrono>
#include <thread>

double GetCPUUsage(DWORD pid, int intervalMs = 100) {
    HANDLE hProcess = OpenProcess(PROCESS_QUERY_INFORMATION | PROCESS_VM_READ, FALSE, pid);
    if (!hProcess) {
        return -1.0;
    }

    FILETIME ftCreation, ftExit, ftKernel1, ftUser1, ftKernel2, ftUser2;
    ULARGE_INTEGER kernelTime1, userTime1, kernelTime2, userTime2;
    
    if (!GetProcessTimes(hProcess, &ftCreation, &ftExit, &ftKernel1, &ftUser1)) {
        CloseHandle(hProcess);
        return -1.0;
    }
    kernelTime1.LowPart = ftKernel1.dwLowDateTime;
    kernelTime1.HighPart = ftKernel1.dwHighDateTime;
    userTime1.LowPart = ftUser1.dwLowDateTime;
    userTime1.HighPart = ftUser1.dwHighDateTime;
    
    std::this_thread::sleep_for(std::chrono::milliseconds(intervalMs));
    
    if (!GetProcessTimes(hProcess, &ftCreation, &ftExit, &ftKernel2, &ftUser2)) {
        CloseHandle(hProcess);
        return -1.0;
    }
    kernelTime2.LowPart = ftKernel2.dwLowDateTime;
    kernelTime2.HighPart = ftKernel2.dwHighDateTime;
    userTime2.LowPart = ftUser2.dwLowDateTime;
    userTime2.HighPart = ftUser2.dwHighDateTime;
    
    CloseHandle(hProcess);

    ULONGLONG totalKernel = kernelTime2.QuadPart - kernelTime1.QuadPart;
    ULONGLONG totalUser = userTime2.QuadPart - userTime1.QuadPart;
    ULONGLONG totalTime = totalKernel + totalUser;
    
    return (double)totalTime / (intervalMs * 10000.0) * 100.0; // Convertimos a porcentaje
}

Napi::Value GetCPUUsageWrapped(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    if (info.Length() < 1 || !info[0].IsNumber()) {
        Napi::TypeError::New(env, "Expected a process ID (number)").ThrowAsJavaScriptException();
        return env.Null();
    }
    DWORD pid = info[0].As<Napi::Number>().Uint32Value();
    double cpuUsage = GetCPUUsage(pid);
    return Napi::Number::New(env, cpuUsage);
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
    exports.Set("getCPUUsage", Napi::Function::New(env, GetCPUUsageWrapped));
    return exports;
}

NODE_API_MODULE(cpu_usage_addon, Init)
