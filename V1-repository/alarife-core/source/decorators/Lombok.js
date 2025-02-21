import DeveloperError from '../services/logger/DeveloperError.js';

// function Persona(nombre, apellido, edad) {
//   this._nombre = nombre;
//   this._apellido = apellido;
//   this._edad = edad;
// }

// // Define el getter fullname en el prototipo de Persona
// Object.defineProperty(Persona.prototype, 'fullname', {
//   get: function () {
//     return `${this._nombre} ${this._apellido}`;
//   },
//   enumerable: true, // Puedes ajustar esto según tus necesidades
//   configurable: true, // Puedes ajustar esto según tus necesidades
// });

// // Ejemplo de uso
// const persona1 = new Persona('Juan', 'Pérez', 25);

// console.log(persona1.fullname); // Salida: Juan Pérez

/**
 ** Esquema de desarrollo
  * TODO: Lombok proporsal
  *
  * ! Getters y Setters --> No pueden acceder a los parametros del objetivo
  * ! ArgsConstructor y NoArgsConstructor --> Devuelven clases anonimas no referenciables con la decorada
 */

// function findPrivateFields(Target) {
//   const regex = /#(.*?)(?:;|\s|$)/g;

//   // Obtener todas las coincidencias
//   const fields = [];
//   let coincidence;
//   while ((coincidence = regex.exec(Target.toString())) !== null) {
//     fields.push(coincidence[1]);
//   }

//   // eslint-disable-next-line no-undef
//   const dataArr = new Set(fields);
//   return [...dataArr];
// }

export const Getters = (Target, { kind }) => {
  if (kind !== 'class') {
    throw new DeveloperError('The App decorator can only be applied to classes.');
  }

  // const fields = findPrivateFields(Target);

  Target.prototype.__findPrivateFields__ = function () {
    const regex = /#(.*?)(?:;|\s|$)/g;

    // Obtener todas las coincidencias
    const fields = [];
    let coincidence;
    while ((coincidence = regex.exec(Target.toString())) !== null) {
      fields.push(coincidence[1]);
    }

    // eslint-disable-next-line no-undef
    const dataArr = new Set(fields);
    return [...dataArr];
  };

  Target.prototype.__generateGetters__ = function (fields) {
    fields.forEach(field => {
      Object.defineProperty(this, field, {
      // eslint-disable-next-line require-jsdoc, object-shorthand
        get : function () {

          console.log(this[`#${field}`]);

          return this[`#${field}`];
        }
      });
    });
  };

  Target.prototype.constructor = function () {
    const fields = this.__findPrivateFields__();
    this.__generateGetters__(fields);
  };

};

export const Setters = (Target, { kind }) => {
  if (kind !== 'class') {
    throw new DeveloperError('The App decorator can only be applied to classes.');
  }

  Object.keys(Target.prototype).forEach(prop => {
    Object.defineProperty(prop, prop, {
      // eslint-disable-next-line require-jsdoc, object-shorthand
      set : function (x) {
        this[prop] = x;
      }
    });
  });
};

// function Persona(nombre, apellido, edad) {
//   this._nombre = nombre;
//   this._apellido = apellido;
//   this._edad = edad;
// }

// // Modifica el constructor para aceptar solo nombre y apellido
// Persona.prototype.constructor = function(nombre, apellido) {
//   this._nombre = nombre;
//   this._apellido = apellido;
// };

// // Define un getter para el nombre completo en el prototipo de Persona
// Object.defineProperty(Persona.prototype, 'fullname', {
//   get: function () {
//     return `${this._nombre} ${this._apellido}`;
//   },
//   enumerable: true,
//   configurable: true,
// });

// // Ejemplo de uso
// const persona1 = new Persona('Juan', 'Pérez', 25);

// console.log(persona1.constructor === Persona); // Salida: true
// console.log(persona1.fullname); // Salida: Juan Pérez

export const ArgsConstructor = (Target, { kind }) => {
  if (kind !== 'class') {
    throw new DeveloperError('The App decorator can only be applied to classes.');
  }

  return class extends Target {
    // eslint-disable-next-line require-jsdoc, no-useless-constructor
    constructor(...args) {
      super(...args);
    }
  };
};

export const NoArgsConstructor = (Target, { kind }) => {
  if (kind !== 'class') {
    throw new DeveloperError('The App decorator can only be applied to classes.');
  }

  return class extends Target {
    // eslint-disable-next-line require-jsdoc, no-useless-constructor
    constructor() {
      super();
    }
  };
};
