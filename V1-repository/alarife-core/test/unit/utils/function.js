/* eslint-disable require-jsdoc */
import { describe, it } from 'mocha';
import { expect } from 'chai';

import { decodeArgs, isFunction } from '../../../source/utils/function.js';

describe('Utils function', () => {

  it('isFunction', () => {
    expect(isFunction(() => {})).to.equal(true);

    function f() {}

    expect(isFunction(f)).to.equal(true);
  });

  it('decodeArgs no params', () => {
    const data = decodeArgs([]);
    expect(data).to.be.an('object');

    expect(data.name).to.equal(undefined);
    expect(data.target).to.equal(undefined);
    expect(data.values).to.equal(undefined);
    expect(data.options).to.equal(undefined);
  });

  /** Options */
  it('decodeArgs 1 param (Object)', () => {
    const options = { required : true };
    const data = decodeArgs([options]);

    expect(data).to.be.an('object');

    expect(data.name).to.equal(undefined);
    expect(data.target).to.equal(undefined);
    expect(data.values).to.equal(undefined);
    expect(data.options).to.equal(options);
  });

  /** Name */
  it('decodeArgs 1 param (String)', () => {
    const name = 'Name';
    const data = decodeArgs([name]);

    expect(data).to.be.an('object');

    expect(data.name).to.equal(name);
    expect(data.target).to.equal(undefined);
    expect(data.values).to.equal(undefined);
    expect(data.options).to.equal(undefined);
  });

  /** Reference */
  it('decodeArgs 1 param (Class)', () => {
    class Test {}

    const data = decodeArgs([Test]);

    expect(data).to.be.an('object');

    expect(data.name).to.equal(undefined);
    expect(data.target).to.equal(Test);
    expect(data.values).to.equal(undefined);
    expect(data.options).to.equal(undefined);
  });

  /** Enum options */
  it('decodeArgs 1 param (Array)', () => {
    const enumOptions = ['a', 'b', 'c'];
    const data = decodeArgs([enumOptions]);

    expect(data).to.be.an('object');

    expect(data.name).to.equal(undefined);
    expect(data.target).to.equal(undefined);
    expect(data.values).to.equal(enumOptions);
    expect(data.options).to.equal(undefined);
  });

  /** Name and options */
  it('decodeArgs 2 params (String, Object)', () => {
    const name = 'Name';
    const options = { required : true };
    const data = decodeArgs([name, options]);

    expect(data).to.be.an('object');

    expect(data.name).to.equal(name);
    expect(data.target).to.equal(undefined);
    expect(data.values).to.equal(undefined);
    expect(data.options).to.equal(options);
  });

  /** Enum options and options*/
  it('decodeArgs 2 params (Array, Object)', () => {
    const enumOptions = ['a', 'b', 'c'];
    const options = { required : true };
    const data = decodeArgs([enumOptions, options]);

    expect(data).to.be.an('object');

    expect(data.name).to.equal(undefined);
    expect(data.target).to.equal(undefined);
    expect(data.values).to.equal(enumOptions);
    expect(data.options).to.equal(options);
  });

  /** Reference and options */
  it('decodeArgs 2 params (Class, Object)', () => {
    class Test {}

    const options = { required : true };
    const data = decodeArgs([Test, options]);

    expect(data).to.be.an('object');

    expect(data.name).to.equal(undefined);
    expect(data.target).to.equal(Test);
    expect(data.values).to.equal(undefined);
    expect(data.options).to.equal(options);
  });

  /** Name, Enum options and options */
  it('decodeArgs 3 params (String, Array, Object)', () => {
    const name = 'Name';
    const enumOptions = ['a', 'b', 'c'];
    const options = { required : true };
    const data = decodeArgs([name, enumOptions, options]);

    expect(data).to.be.an('object');

    expect(data.name).to.equal(name);
    expect(data.target).to.equal(undefined);
    expect(data.values).to.equal(enumOptions);
    expect(data.options).to.equal(options);
  });

  /** Name, Reference and options */
  it('decodeArgs 3 params (String, Class, Object)', () => {
    const name = 'Name';

    class Test {}

    const options = { required : true };
    const data = decodeArgs([name, Test, options]);

    expect(data).to.be.an('object');

    expect(data.name).to.equal(name);
    expect(data.target).to.equal(Test);
    expect(data.values).to.equal(undefined);
    expect(data.options).to.equal(options);
  });
});
