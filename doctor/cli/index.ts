#!/usr/bin/env node

import { fileURLToPath } from "url";
import path from "path";
import { ChildProcess, fork } from "child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let targetProcess: ChildProcess;
let doctorServerProcess: ChildProcess;
const targetScript = process.argv.slice(0, 2).join(" ");

console.log("🚀 ~ target:", targetScript)

try {
    targetProcess = fork('node ' + targetScript);

    targetProcess.on("message", (data) => {
        console.log("🚀 ~ targetProcess.on ~ data:", data)
        console.log("🚀 ~ targetProcess.on ~ data:", data.toString())

        // aqui llega el evento del target si tiene el midleware activo
        if(doctorServerProcess) {
            doctorServerProcess.send(data);
        }
    });

    targetProcess.stderr?.on("data", (data) => {
        console.log("🚀 ~ targetProcess.stderr?.on ~ data:", data.toString())
        //   if (!data.toString().includes("DeprecationWarning")) {
        //     event.reply("server-log", "Error al iniciar el servidor");
        //     event.reply("server-status", "error");
        //   }
    });
} catch (error) {
    console.error(error);
}

if (targetProcess?.pid) {
    try {
        doctorServerProcess = fork(
            path.join(__dirname, "/server/index.js"),
            ["env=production", `pid=${targetProcess.pid}`],
            { silent: true }
        );

        doctorServerProcess.stdout?.on('data', (data) => {
            console.log(`stdout: ${data.toString()}`);
        });

        doctorServerProcess.stderr?.on('data', (data) => {
            console.error(`stderr: ${data.toString()}`);
        });
    } catch (error) {
        console.error(error);
    }
}
