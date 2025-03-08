import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceDirArgv = process.argv[2];
const destDirArgv = process.argv[3];

if(!sourceDirArgv || !destDirArgv) {
    console.log('Por favor, ingrese la ruta de la carpeta de origen y destino.');
    process.exit(1);
}

// Ruta de la carpeta de origen y destino
const sourceDir = path.join(__dirname, sourceDirArgv);
const destDir = path.join(__dirname, destDirArgv);

// Función para copiar archivos
function copyFileSync(source, target) {
  let targetFile = target;

  // Si el destino es una carpeta, añade el nombre del archivo al destino
  if (fs.existsSync(target) && fs.lstatSync(target).isDirectory()) {
    targetFile = path.join(target, path.basename(source));
  }

  fs.copyFileSync(source, targetFile);
}

// Función para copiar el contenido de una carpeta
function copyFolderRecursiveSync(source, target) {
  // Verifica si la carpeta destino existe; si no, créala
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target, { recursive: true });
  }

  // Lee el contenido de la carpeta origen
  if (fs.lstatSync(source).isDirectory()) {
    const files = fs.readdirSync(source);

    // Copia cada archivo o carpeta
    files.forEach((file) => {
      const currentSource = path.join(source, file);
      const currentTarget = path.join(target, file);

      if (fs.lstatSync(currentSource).isDirectory()) {
        // Si es una carpeta, copia recursivamente
        copyFolderRecursiveSync(currentSource, currentTarget);
      } else {
        // Si es un archivo, copia directamente
        copyFileSync(currentSource, currentTarget);
      }
    });
  }
}

// Copia el contenido de la carpeta
copyFolderRecursiveSync(sourceDir, destDir);

console.log('Contenido copiado con éxito!');