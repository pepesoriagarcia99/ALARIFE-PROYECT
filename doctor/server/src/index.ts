import argv from "./services/argv";

argv().then(() => {
    const { start } = require('./app');
    start();
})

