/* eslint-disable require-jsdoc */
import { Document } from '../../../../source/decorators/Document';
import { ObjectId, String } from '../../../../source/decorators/Field';

import { Image } from '../image/Image';

//  options : { timestamps : true }
// @Document('User')
// @Document({ ...options })
// @Document('User', { ...options })
@Document('User')
export class User {

  // @String()
  //   id;

  // @String({
  //   match     : /^\S+@\S+\.\S+$/,
  //   required  : true,
  //   // unique    : true,
  //   trim      : true,
  //   lowercase : true
  // })
  //   email;

  @String({
    index : true,
    trim  : true
  })
    name;

  // @String({
  //   required  : true,
  //   minlength : 6
  // }) password;

  // @Number('phone_number', { required : true })
  //   phone;

  // @String('role_name', { required : true })
  //   role;

  // shoppingCart;

  @ObjectId(Image) image;

  // @Date('createdAt')
  //   createdAt;

  /**
    constructor(email, name, password, phone) {
      super();

      this.email = email;
      this.name = name;
      this.password = password;
      this.phone = phone;
    }
  */

  // details() {
  //   return {
  //     id    : this._id,
  //     name  : this.name,
  //     email : this.email,
  //     phone : this.phone,
  //     image : this.image
  //   };
  // }

  // viewSimple() {
  //   return {
  //     name  : this.name,
  //     email : this.email
  //   };
  // }

  // @Path('email')
  // patchEmail(email) {
  //   if (!this.picture || this.picture.indexOf('https://gravatar.com') === 0) {
  //     // const hash = crypto.createHash('md5').update(email)
  //     //   .digest('hex');
  //     // this.picture = `https://gravatar.com/avatar/${hash}?d=identicon`;
  //   }

  //   if (!this.name) {
  //     this.name = email.replace(/^(.+)@.+$/, '$1');
  //   }

  //   return email;
  // }

  // userSchema.pre('save', function (next) {
  //   if (!this.isModified('password')) return next()

  //   /* istanbul ignore next */
  //   const rounds = env === 'test' ? 1 : 9

  //   bcrypt.hash(this.password, rounds).then((hash) => {
  //     this.password = hash
  //     next()
  //   }).catch(next)
  // })

}
