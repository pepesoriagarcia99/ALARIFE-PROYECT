# Alarife - HTTP server plugin
Alarife http plugin is a library that provides a decorator pattern for generating servers with [express](https://www.npmjs.com/package/express).

To start a project with this library you first need to know the [alarife-core](https://www.npmjs.com/package/@alarife/core).
Application example code [alarife](https://github.com/pepesoriagarcia99/alarife-example).

## Decorators

### @HttpServer

HttpServer is a **class** decorator.

HttpServer decorator parameters:

- Server parameters
  - ip `String` IP address to server
  - port `Number`  The port address to server
  - apiRoot `String` The base path to server
  - controllers `Array<T>` Drivers assigned to server

- SSL parameters
  - Parameter `Object | Boolean` default is false. [HTTPS](https://nodejs.org/api/https.html) Options Setting Guide. (If ssl=true, look for the key.pem and cert.pem files in the project root.)

This decorator instantiates the class to which it is applied to launch its constructor, so you can add additional configuration.

You can add the parameters belonging to **HttpServer** to your instance with **@Value**.

> **HttpServer** includes: protocol, ip, port, apiRoot, app, webSocket, hasSsl, options (SSL), accessLog
> **configuration** includes: accessLog configuration functions.

```JS
import { App, Value } from '@alarife/core/decorators';
import { HttpServer } from '@alarife/http/decorators';

import TestController from '...';

@App()
@HttpServer({ port : 9000, controllers : [TestController] })
class Main {

  @Value('HttpServer.protocol') protocol;

  @Value('HttpServer.ip') ip;

  @Value('HttpServer.port') port;

  @Value('HttpServer.apiRoot') apiRoot;

  @Value('HttpServer.app') app;

  @Value('HttpServer.webSocket') webSocket;

  @Value('HttpServer.ssl.hasSsl') hasSsl;

  @Value('HttpServer.ssl.options') sslOptions;

  @Value('HttpServer.accessLog') accessLog;

  /** Core configuration value */

  @Value('configuration') configuration;

  constructor() {
    this.configuration.traceLog({ levels : ['info', 'debug', 'error', 'warn'] });
    this.configuration.accessLog({ active : true });

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended : false }));

    this.log.info('ip: ', this.ip);
    this.log.info(`port: ${this.port}`);
  }
}
```

### @Controller

Controller is a **class** decorator.

Receives a path parameter that would be the parent path, the **path** is **required**.

The operation of the controller system is simple.

The **@Controller** decorator injects the Logger module.

> Support for **Get**, **Post**, **Delete**, **Put** and **Ws** methods.
> Just to decorate methods.

```JS
import { Controller, Get } from '@alarife/http/decorators';

@Controller('/test')
class TestController {

  @Get('/ping')
  ping(req, res) {
    return res.success(200).json({ message : 'pong' });
  }
}
```

#### @Get, @Post, @Delete, @Put and @Ws

This decorator applies to **methods**.

The REST function receives the parameters of [express](https://www.npmjs.com/package/express) **req**, **res** and **next**.

The WebSocket function receives the [express-ws](https://www.npmjs.com/package/express-ws) parameters **ws** and **req**.

```JS
import { Controller, Get, Ws } from '@alarife/http/decorators';

@Controller('/test')
class TestController {

  @Get('/ping')
  ping(req, res, next) {
    return res.success(200).json({ message : 'pong' });
  }

  @Ws('/status')
  serverStatus(ws, req) {
    ws.on('message', function(msg) {
      this.log.info(msg);
      ws.send('OK');
    });
  }
}
```

#### @Use

To make a stack of different methods in the same route we can use the **Use**.

In the following example we see the Use of **Use** with various middlewares. The order of execution would be as indicated in the comments.

**The input parameter is an express middleware function**

```JS
import { AutoWired } from '@alarife/core/decorators';
import { Controller, Get, Use } from '@alarife/http/decorators';

// Protect example
const protect = ({ headers }, res, next) => {
  if(!headers.token) {
    return res.unauthorized().end();
  }
}

const roleProtect = (roles = []) => ({ headers }, res, next) => {
  if(!headers.token) {
    return res.unauthorized().end();
  }
}

@Controller('/user')
@Use(protect) //execution 1
class UserController {

  @AutoWired(UserService) userService;

  @Get('/list')
  @Use((req, res, next) => {
    //execution 2

    next();
  })
  @Use(roleProtect(['admin'])) //execution 3
  userList(req, res) {
    //execution 4
    const users = this.userService.getAllUsers();

    res.success().json(users);
  }
}
```


### @Body

Body is a **JSON body validator** middleware, decorate **methods**.

[ajv](https://www.npmjs.com/package/ajv) is used as a library to validate json objects.

```JS
import { AutoWired } from '@alarife/core/decorators';
import { Controller, Post, Body } from '@alarife/core/decorators';

// Ajv schema
const productBody = {
  type: "object",
  properties: {
    name: {type: "string"},
    description : {type: "string"},
    price: {type: "number"}
  },
  required: ["name", "price"],
  additionalProperties: false,
};


@Controller('/store')
class StoreController {

  @AutoWired(ProductsService) productsService;

  @Post('/create')
  @Body(productBody)
  products({ body }, res) {
    return this.productsService.createProduct(body)
      .then(product => {
        this.log.info(product);
        res.success().json(product);
      })
      .catch(err => {
        this.log.error(err);
        res.serverError().json(err).end();
      });
  }
}
```

### @Dto

The DTO class decorator generates validation models for ajv from javascript classes.

The **@Dto** decorator injects the Logger module.

```JS
import { Dto } from '@alarife/http/decorators/dto';

@Dto()
class ProductModel { ... }
```

#### Fields

Parameter decorators generate the properties to validate.
The decorators are: **@String**, **@Number**, **@Date**, **@Boolean**, **@Enum**, **@ObjectId** and **@ArrayId**

Field options:

- name `String | undefined` Reference name that the validator will get.
- values `Array` List of elements, only used in Enum.
- target `Class`
- configuration.optional `Boolean` Field is optional.
- configuration.required `Boolean` Field is required.
- configuration.nullable `Boolean` Field is nullable.
- configuration.error `String` Custom error message for this field.

```JS
import { Dto, String, Enum, ArrayId, ObjectId } from '@alarife/http/decorators/dto';

@Dto 
class Category { ... }

@Dto({
  error : {
    type                 : 'should be an object',
    required             : 'should have property foo',
    additionalProperties : 'should not have properties other than foo'
  }
})
class ProductModel { 

  /**
   * Four parameter variants 
  */

  /** Without parameters, Use the parameter name as the field name and use default options. */
  @String() name;

  /** With String parameter, Use the entered field name and default options. */
  @String('product_name') name;

  /** With object parameter, Use the field name of the parameter as the field name and combine default options and those introduced by parameters. */
  @String({ required: true }) name;

  /** With String and Object parameters, use the field name entered by parameters and combine the default options and those entered by parameters. */
  @String('product_name', { required: true }) name;

  /** Insert by parameters name, values and options */
  @Enum('product_role', [...], {...}) role;

  /**
   * In reference decorators you can insert an AJV class or object.
  */

  /** Insert by parameters name, Schema reference and options */
  @ArrayId('comments_list', Comment, { uniqueItems: true }) comments;

  /** Insert by parameters name, Schema reference and options */
  @ObjectId('image', Image, {...}) image;

  /**
   * Configuration options
   * 
  */
  @String({ 
    required: true,
    required: [true, 'Error message required field'], // Required field with custom error message

    optional: true,
    nullable: true,

    error: 'Error message' // Error message for any field error
  }) name;
  
  ...
}
```

#### Full mode of use (Class)

```JS
import { Controller, Post, Body } from '@alarife/http/decorators';
import { Dto, String, Number } from '@alarife/http/decorators/dto';

@Dto()
class ProductModel {

  @String({ required: true })
  name

  @String()
  description

  @Number({ required: true })
  price
}


@Controller('/store')
class StoreController {


  /**
   * Simple mode 
  */
  @Post('/create')
  @Body(ProductModel)
  products({ body }, res) {
    ...
  }

  /**
   * Object array mode
  */
  @Post('/import')
  @Body([ProductModel])
  products({ body }, res) {
    ...
  }
}
```

## Addons

Some of the additional functionalities that the library contains are listed.

### Response

The response contains new methods that simplify responses a bit.

```JS
res.success(200).json({ message : 'pong' });
res.success(204);

res.badRequest().json({ message : 'Error' });
res.badRequest().end();

res.unauthorized().end();
res.notFound().end();
res.serverError().end();
```

## Related

- [alarife-core](https://www.npmjs.com/package/@alarife/core) - Library core.
- [alarife-mongo](https://www.npmjs.com/package/@alarife/mongo) - Library to use Mongo database.
