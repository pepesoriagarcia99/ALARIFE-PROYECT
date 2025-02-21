/* eslint-disable require-jsdoc */

import { Document } from '../../../../source/decorators/Document';
import { String } from '../../../../source/decorators/Field';

@Document()
export class Image {

  @String({ index : true, trim : true }) ref;

  // @String({ trim : true }) data;
}
