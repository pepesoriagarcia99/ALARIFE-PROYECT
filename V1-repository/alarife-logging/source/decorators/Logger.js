
/**
 * TODO: Integrar https://www.npmjs.com/package/winston
 */

/**
  ** Logger decorator
  * @returns {function} The decorator function
*/
export const Logger = () => (Target, { kind }) => {
    if (kind !== 'class') {
      throw new DeveloperError('The Logger decorator can only be applied to classes.');
    }
  
    /**
     * Funcion en main que lanza todo
     */
  };