# Alarife - Mongo plugin
Alarife mongo plugin es una libreria que otorga un patron decorador sobre [mongoose](https://www.npmjs.com/package/mongoose).


## Decoradores
### @Mongo
Mongo es un decorador de **class**
This decorator makes the connection to the database.

Los decoradores son dependientes del orden primero tienes que declarar @App despues los plugins.

```JS
const config = {
  uri     : 'mongodb+srv://admin:alarife@cluster0.caomnsc.mongodb.net/alarife',
  options : {
    debug : true
  }
};

@Mongo(config)
@App({ ip : '0.0.0.0', port : 9000, apiRoot : '/' }, false)
class Main {
  constructor() { }
}
```
