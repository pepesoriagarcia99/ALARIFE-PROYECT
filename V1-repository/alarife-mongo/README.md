# Alarife - Mongo plugin
Alarife mongo plugin is a library that provides a decorator pattern for [mongoose](https://www.npmjs.com/package/mongoose).

To start a project with this library you first need to know the [alarife-core](https://www.npmjs.com/package/@alarife/core).
Application example code [alarife](https://github.com/pepesoriagarcia99/alarife-example).

## Decorators
### @Mongo
Mongo is a **class** decorator.
This decorator makes the connection to the database.

The decorators are order dependent, first you have to declare @App then the plugins.

```JS
import { App, Value } from '@alarife/core/decorators';
import { Mongo } from '@alarife/mongo/decorators';

const configuration = {
  uri     : 'mongodb+srv://admin:alarife@cluster0.caomnsc.mongodb.net/alarife',
  options : {
    debug : true
  }
};

@App()
@Mongo(configuration)
class Main {
  constructor() { }
}
```


### @MongoEvent[event]
MongoEvent is a **method** decorator.

> Support for **connecting**, **connected**, **disconnected**, **error** , **disconnecting**, **reconnected**, **timeout** and **close** events.

```JS
  @MongoEvents.connected
  onConnected() {
    this.log.info('Connected');
  }

  @MongoEvents.error
  onError(err) {
    this.log.error('Error', err);
  }
```

**LIBRARY IN DEVELOPMENT**

## Related

- [alarife-http](https://www.npmjs.com/package/@alarife/http) - Library to create HTTP servers.
- [alarife-mongo](https://www.npmjs.com/package/@alarife/mongo) - Library to use Mongo database.
