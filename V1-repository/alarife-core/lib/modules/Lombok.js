"use strict";var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports, "__esModule", { value: true });exports.Setters = exports.NoArgsConstructor = exports.Getters = exports.ArgsConstructor = void 0;var _DeveloperError = _interopRequireDefault(require("../modules/DeveloperError.js"));

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

const Getters = (Target, { kind }) => {
  if (kind !== 'class') {
    throw new _DeveloperError.default('The App decorator can only be applied to classes.');
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
    fields.forEach((field) => {
      Object.defineProperty(this, field, {
        // eslint-disable-next-line require-jsdoc, object-shorthand
        get: function () {

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

};exports.Getters = Getters;

const Setters = (Target, { kind }) => {
  if (kind !== 'class') {
    throw new _DeveloperError.default('The App decorator can only be applied to classes.');
  }

  Object.keys(Target.prototype).forEach((prop) => {
    Object.defineProperty(prop, prop, {
      // eslint-disable-next-line require-jsdoc, object-shorthand
      set: function (x) {
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
exports.Setters = Setters;
const ArgsConstructor = (Target, { kind }) => {
  if (kind !== 'class') {
    throw new _DeveloperError.default('The App decorator can only be applied to classes.');
  }

  return class extends Target {
    // eslint-disable-next-line require-jsdoc, no-useless-constructor
    constructor(...args) {
      super(...args);
    }
  };
};exports.ArgsConstructor = ArgsConstructor;

const NoArgsConstructor = (Target, { kind }) => {
  if (kind !== 'class') {
    throw new _DeveloperError.default('The App decorator can only be applied to classes.');
  }

  return class extends Target {
    // eslint-disable-next-line require-jsdoc, no-useless-constructor
    constructor() {
      super();
    }
  };
};exports.NoArgsConstructor = NoArgsConstructor;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfRGV2ZWxvcGVyRXJyb3IiLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0IiwicmVxdWlyZSIsIkdldHRlcnMiLCJUYXJnZXQiLCJraW5kIiwiRGV2ZWxvcGVyRXJyb3IiLCJwcm90b3R5cGUiLCJfX2ZpbmRQcml2YXRlRmllbGRzX18iLCJyZWdleCIsImZpZWxkcyIsImNvaW5jaWRlbmNlIiwiZXhlYyIsInRvU3RyaW5nIiwicHVzaCIsImRhdGFBcnIiLCJTZXQiLCJfX2dlbmVyYXRlR2V0dGVyc19fIiwiZm9yRWFjaCIsImZpZWxkIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJnZXQiLCJjb25zb2xlIiwibG9nIiwiY29uc3RydWN0b3IiLCJleHBvcnRzIiwiU2V0dGVycyIsImtleXMiLCJwcm9wIiwic2V0IiwieCIsIkFyZ3NDb25zdHJ1Y3RvciIsImFyZ3MiLCJOb0FyZ3NDb25zdHJ1Y3RvciJdLCJzb3VyY2VzIjpbIi4uLy4uL3NvdXJjZS9tb2R1bGVzL0xvbWJvay5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRGV2ZWxvcGVyRXJyb3IgZnJvbSAnLi4vbW9kdWxlcy9EZXZlbG9wZXJFcnJvci5qcyc7XHJcblxyXG4vLyBmdW5jdGlvbiBQZXJzb25hKG5vbWJyZSwgYXBlbGxpZG8sIGVkYWQpIHtcclxuLy8gICB0aGlzLl9ub21icmUgPSBub21icmU7XHJcbi8vICAgdGhpcy5fYXBlbGxpZG8gPSBhcGVsbGlkbztcclxuLy8gICB0aGlzLl9lZGFkID0gZWRhZDtcclxuLy8gfVxyXG5cclxuLy8gLy8gRGVmaW5lIGVsIGdldHRlciBmdWxsbmFtZSBlbiBlbCBwcm90b3RpcG8gZGUgUGVyc29uYVxyXG4vLyBPYmplY3QuZGVmaW5lUHJvcGVydHkoUGVyc29uYS5wcm90b3R5cGUsICdmdWxsbmFtZScsIHtcclxuLy8gICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuLy8gICAgIHJldHVybiBgJHt0aGlzLl9ub21icmV9ICR7dGhpcy5fYXBlbGxpZG99YDtcclxuLy8gICB9LFxyXG4vLyAgIGVudW1lcmFibGU6IHRydWUsIC8vIFB1ZWRlcyBhanVzdGFyIGVzdG8gc2Vnw7puIHR1cyBuZWNlc2lkYWRlc1xyXG4vLyAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSwgLy8gUHVlZGVzIGFqdXN0YXIgZXN0byBzZWfDum4gdHVzIG5lY2VzaWRhZGVzXHJcbi8vIH0pO1xyXG5cclxuLy8gLy8gRWplbXBsbyBkZSB1c29cclxuLy8gY29uc3QgcGVyc29uYTEgPSBuZXcgUGVyc29uYSgnSnVhbicsICdQw6lyZXonLCAyNSk7XHJcblxyXG4vLyBjb25zb2xlLmxvZyhwZXJzb25hMS5mdWxsbmFtZSk7IC8vIFNhbGlkYTogSnVhbiBQw6lyZXpcclxuXHJcbi8qKlxyXG4gKiogRXNxdWVtYSBkZSBkZXNhcnJvbGxvXHJcbiAgKiBUT0RPOiBMb21ib2sgcHJvcG9yc2FsXHJcbiAgKlxyXG4gICogISBHZXR0ZXJzIHkgU2V0dGVycyAtLT4gTm8gcHVlZGVuIGFjY2VkZXIgYSBsb3MgcGFyYW1ldHJvcyBkZWwgb2JqZXRpdm9cclxuICAqICEgQXJnc0NvbnN0cnVjdG9yIHkgTm9BcmdzQ29uc3RydWN0b3IgLS0+IERldnVlbHZlbiBjbGFzZXMgYW5vbmltYXMgbm8gcmVmZXJlbmNpYWJsZXMgY29uIGxhIGRlY29yYWRhXHJcbiAqL1xyXG5cclxuLy8gZnVuY3Rpb24gZmluZFByaXZhdGVGaWVsZHMoVGFyZ2V0KSB7XHJcbi8vICAgY29uc3QgcmVnZXggPSAvIyguKj8pKD86O3xcXHN8JCkvZztcclxuXHJcbi8vICAgLy8gT2J0ZW5lciB0b2RhcyBsYXMgY29pbmNpZGVuY2lhc1xyXG4vLyAgIGNvbnN0IGZpZWxkcyA9IFtdO1xyXG4vLyAgIGxldCBjb2luY2lkZW5jZTtcclxuLy8gICB3aGlsZSAoKGNvaW5jaWRlbmNlID0gcmVnZXguZXhlYyhUYXJnZXQudG9TdHJpbmcoKSkpICE9PSBudWxsKSB7XHJcbi8vICAgICBmaWVsZHMucHVzaChjb2luY2lkZW5jZVsxXSk7XHJcbi8vICAgfVxyXG5cclxuLy8gICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcclxuLy8gICBjb25zdCBkYXRhQXJyID0gbmV3IFNldChmaWVsZHMpO1xyXG4vLyAgIHJldHVybiBbLi4uZGF0YUFycl07XHJcbi8vIH1cclxuXHJcbmV4cG9ydCBjb25zdCBHZXR0ZXJzID0gKFRhcmdldCwgeyBraW5kIH0pID0+IHtcclxuICBpZiAoa2luZCAhPT0gJ2NsYXNzJykge1xyXG4gICAgdGhyb3cgbmV3IERldmVsb3BlckVycm9yKCdUaGUgQXBwIGRlY29yYXRvciBjYW4gb25seSBiZSBhcHBsaWVkIHRvIGNsYXNzZXMuJyk7XHJcbiAgfVxyXG5cclxuICAvLyBjb25zdCBmaWVsZHMgPSBmaW5kUHJpdmF0ZUZpZWxkcyhUYXJnZXQpO1xyXG5cclxuICBUYXJnZXQucHJvdG90eXBlLl9fZmluZFByaXZhdGVGaWVsZHNfXyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGNvbnN0IHJlZ2V4ID0gLyMoLio/KSg/Ojt8XFxzfCQpL2c7XHJcblxyXG4gICAgLy8gT2J0ZW5lciB0b2RhcyBsYXMgY29pbmNpZGVuY2lhc1xyXG4gICAgY29uc3QgZmllbGRzID0gW107XHJcbiAgICBsZXQgY29pbmNpZGVuY2U7XHJcbiAgICB3aGlsZSAoKGNvaW5jaWRlbmNlID0gcmVnZXguZXhlYyhUYXJnZXQudG9TdHJpbmcoKSkpICE9PSBudWxsKSB7XHJcbiAgICAgIGZpZWxkcy5wdXNoKGNvaW5jaWRlbmNlWzFdKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcclxuICAgIGNvbnN0IGRhdGFBcnIgPSBuZXcgU2V0KGZpZWxkcyk7XHJcbiAgICByZXR1cm4gWy4uLmRhdGFBcnJdO1xyXG4gIH07XHJcblxyXG4gIFRhcmdldC5wcm90b3R5cGUuX19nZW5lcmF0ZUdldHRlcnNfXyA9IGZ1bmN0aW9uIChmaWVsZHMpIHtcclxuICAgIGZpZWxkcy5mb3JFYWNoKGZpZWxkID0+IHtcclxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIGZpZWxkLCB7XHJcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jLCBvYmplY3Qtc2hvcnRoYW5kXHJcbiAgICAgICAgZ2V0IDogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXNbYCMke2ZpZWxkfWBdKTtcclxuXHJcbiAgICAgICAgICByZXR1cm4gdGhpc1tgIyR7ZmllbGR9YF07XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH07XHJcblxyXG4gIFRhcmdldC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBjb25zdCBmaWVsZHMgPSB0aGlzLl9fZmluZFByaXZhdGVGaWVsZHNfXygpO1xyXG4gICAgdGhpcy5fX2dlbmVyYXRlR2V0dGVyc19fKGZpZWxkcyk7XHJcbiAgfTtcclxuXHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgU2V0dGVycyA9IChUYXJnZXQsIHsga2luZCB9KSA9PiB7XHJcbiAgaWYgKGtpbmQgIT09ICdjbGFzcycpIHtcclxuICAgIHRocm93IG5ldyBEZXZlbG9wZXJFcnJvcignVGhlIEFwcCBkZWNvcmF0b3IgY2FuIG9ubHkgYmUgYXBwbGllZCB0byBjbGFzc2VzLicpO1xyXG4gIH1cclxuXHJcbiAgT2JqZWN0LmtleXMoVGFyZ2V0LnByb3RvdHlwZSkuZm9yRWFjaChwcm9wID0+IHtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShwcm9wLCBwcm9wLCB7XHJcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jLCBvYmplY3Qtc2hvcnRoYW5kXHJcbiAgICAgIHNldCA6IGZ1bmN0aW9uICh4KSB7XHJcbiAgICAgICAgdGhpc1twcm9wXSA9IHg7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH0pO1xyXG59O1xyXG5cclxuLy8gZnVuY3Rpb24gUGVyc29uYShub21icmUsIGFwZWxsaWRvLCBlZGFkKSB7XHJcbi8vICAgdGhpcy5fbm9tYnJlID0gbm9tYnJlO1xyXG4vLyAgIHRoaXMuX2FwZWxsaWRvID0gYXBlbGxpZG87XHJcbi8vICAgdGhpcy5fZWRhZCA9IGVkYWQ7XHJcbi8vIH1cclxuXHJcbi8vIC8vIE1vZGlmaWNhIGVsIGNvbnN0cnVjdG9yIHBhcmEgYWNlcHRhciBzb2xvIG5vbWJyZSB5IGFwZWxsaWRvXHJcbi8vIFBlcnNvbmEucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gZnVuY3Rpb24obm9tYnJlLCBhcGVsbGlkbykge1xyXG4vLyAgIHRoaXMuX25vbWJyZSA9IG5vbWJyZTtcclxuLy8gICB0aGlzLl9hcGVsbGlkbyA9IGFwZWxsaWRvO1xyXG4vLyB9O1xyXG5cclxuLy8gLy8gRGVmaW5lIHVuIGdldHRlciBwYXJhIGVsIG5vbWJyZSBjb21wbGV0byBlbiBlbCBwcm90b3RpcG8gZGUgUGVyc29uYVxyXG4vLyBPYmplY3QuZGVmaW5lUHJvcGVydHkoUGVyc29uYS5wcm90b3R5cGUsICdmdWxsbmFtZScsIHtcclxuLy8gICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuLy8gICAgIHJldHVybiBgJHt0aGlzLl9ub21icmV9ICR7dGhpcy5fYXBlbGxpZG99YDtcclxuLy8gICB9LFxyXG4vLyAgIGVudW1lcmFibGU6IHRydWUsXHJcbi8vICAgY29uZmlndXJhYmxlOiB0cnVlLFxyXG4vLyB9KTtcclxuXHJcbi8vIC8vIEVqZW1wbG8gZGUgdXNvXHJcbi8vIGNvbnN0IHBlcnNvbmExID0gbmV3IFBlcnNvbmEoJ0p1YW4nLCAnUMOpcmV6JywgMjUpO1xyXG5cclxuLy8gY29uc29sZS5sb2cocGVyc29uYTEuY29uc3RydWN0b3IgPT09IFBlcnNvbmEpOyAvLyBTYWxpZGE6IHRydWVcclxuLy8gY29uc29sZS5sb2cocGVyc29uYTEuZnVsbG5hbWUpOyAvLyBTYWxpZGE6IEp1YW4gUMOpcmV6XHJcblxyXG5leHBvcnQgY29uc3QgQXJnc0NvbnN0cnVjdG9yID0gKFRhcmdldCwgeyBraW5kIH0pID0+IHtcclxuICBpZiAoa2luZCAhPT0gJ2NsYXNzJykge1xyXG4gICAgdGhyb3cgbmV3IERldmVsb3BlckVycm9yKCdUaGUgQXBwIGRlY29yYXRvciBjYW4gb25seSBiZSBhcHBsaWVkIHRvIGNsYXNzZXMuJyk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gY2xhc3MgZXh0ZW5kcyBUYXJnZXQge1xyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MsIG5vLXVzZWxlc3MtY29uc3RydWN0b3JcclxuICAgIGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcclxuICAgICAgc3VwZXIoLi4uYXJncyk7XHJcbiAgICB9XHJcbiAgfTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBOb0FyZ3NDb25zdHJ1Y3RvciA9IChUYXJnZXQsIHsga2luZCB9KSA9PiB7XHJcbiAgaWYgKGtpbmQgIT09ICdjbGFzcycpIHtcclxuICAgIHRocm93IG5ldyBEZXZlbG9wZXJFcnJvcignVGhlIEFwcCBkZWNvcmF0b3IgY2FuIG9ubHkgYmUgYXBwbGllZCB0byBjbGFzc2VzLicpO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGNsYXNzIGV4dGVuZHMgVGFyZ2V0IHtcclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jLCBuby11c2VsZXNzLWNvbnN0cnVjdG9yXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuICB9O1xyXG59O1xyXG4iXSwibWFwcGluZ3MiOiJpUUFBQSxJQUFBQSxlQUFBLEdBQUFDLHNCQUFBLENBQUFDLE9BQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FB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