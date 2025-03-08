const { fork } = require('child_process');

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

const instancia = new Process('Fibonacci');

const child = fork(__filename); // Se copia el proceso
console.log("🚀 ~ __filename:", __filename)

if (process.send) {
    console.log("Hijo:", instancia.run());
} else {
    console.log("Padre:", instancia.getName());
}
