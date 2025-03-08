const addon = require("./build/Release/addon");

class Process {

  #name;

  constructor(name) {
    this.#name = name;
  }

  run() {
    console.log("🚀 Ejecutando cálculo bloqueante en otro hilo...");

    const result = this.#fibonacci(40);
    console.log("✅ Fibonacci(40) =", result);
  }

  #fibonacci(n) {
    if (n <= 1) return n;
    return this.#fibonacci(n - 1) + this.#fibonacci(n - 2);
  }

  getName() {
    return this.#name;
  }
}

const instance = new Process('Fibonacci');
addon.set(instance);

instance.run(40);

console.log("Proceso ", instance.getName());
