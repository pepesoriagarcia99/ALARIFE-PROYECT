/* eslint-disable no-console */
import fs from 'node:fs';
import { resolve } from 'node:path';

/**
 * Read file
 * @param {String} path Master route
 * @returns {*} File content
 */
export const getFile = path => fs.readFileSync(path, 'utf8');

/**
  * Deep form directory listing
  * @param {String} path Master route
  * @return {Array<String>} Route list
*/
export const getFiles = async path => {
  const directories = await fs.promises.readdir(path, { withFileTypes : true });

  const files = await Promise.all(
    directories.map(directory => {
      const res = resolve(path, directory.name);
      return directory.isDirectory() ? getFiles(res) : res;
    })
  );
  return Array.prototype.concat(...files);
};

/**
  * Check if a string exists in a file
  * @param {String} path Path
  * @param {String} key New key
  * @return {Boolean} True if the string exists
*/
export const includesFile = (path, key) => {
  try {
    const data = fs.readFileSync(path, 'utf8');
    return data.toString().includes(key);
  }
  catch (err) {
    console.error(err);
    return false;
  }
};

/**
  * Check if a file exists in a path
  * @param {String} path Path
  * @return {Boolean} True if the file exists
*/
export const existsFile = path => {
  try {
    return fs.existsSync(path);
  }
  catch (err) {
    console.error(err);
    return false;
  }
};

/**
 * Read the content of a file
 * @param {String} path Path
 * @returns {String} File content
 */
export const readFile = path => {
  try {
    return fs.readFileSync(path, 'utf8');
  }
  catch (err) {
    console.error('Error reading the file: ', path);
    return undefined;
  }
};

/**
  * Create write stream
  * @param {String} path Path
  * @return {Object} Stream
*/
export const createWriteStream = path => fs.createWriteStream(path, { flags : 'a' });

/**
  * Create folder
  * @param {String} path Path
*/
export const createFolder = path => {
  try {
    fs.mkdirSync(path);
  }
  catch (err) {
    console.error(err);
  }
};

/**
  * Write file
  * @param {String} path Path
  * @param {String} data Data
*/
export const writeFile = (path, data) => {
  fs.writeFileSync(path, data, { encoding : 'utf8', flag : 'w' });
};

export const appendFile = (path, content) => {
  try {
    fs.appendFileSync(path, content);
  }
  catch (err) {
    console.error(err);
  }
};
