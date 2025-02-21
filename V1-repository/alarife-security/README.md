# easyex-secure

cerca trova (busca y encontraras)

JWT security module

uso de passport, jwt

## @secure
-configuraciones de seguridad
temas de cifradl token
datos que guarda
masterkey true or false
logout true or false

logout: no se como caducar los tokens en servidor sin usar una bbdd o una bbdd en memoria

## @Token
si no encuentran el token en el sitio indicado 401
si no encuentran el usuario 401
inyecta el user en el req

Sistema de validacion de tokens en WebSocket, un primer mensaje con el token

## @Master
Solo valida el master

## @Secure
Misma funcion que el @Use pero a diferencia de este añade el middleware el primero en el stack
Recibe una funcion middleware que validara roles, permisos o lo que el usuraio quiera

!podria sustiruirse por un parametro de entrada en el Token


SISTEMA de OneSessionPermison
Solo un token permitido, el resto a la lista negra
-configurado en el modelo de usuario

### FEATURES:
- Sistema de caducidad de tokens, no solo se espera a que el token caduque por tiempo, si no que se crea una lista negra de tokens y cuando se hace /logout ese token se guarda y ya no es valido.
- Una sola sesion, solo se permite un token activo por cada ususario, cada vez que se hace /login el token anterior es caducado.

