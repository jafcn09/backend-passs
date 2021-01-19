*/ AUTHOR: JAFET CANEPA*/
Construccion del proyecto de la parte backend:
EL proyecto està realizado con mongo atlas , utilizando su cluster y una ip aleatoria que ofrece mongo.
El proyecto se va a correr en el puerto 3005, y para querer mostrar sus datos que se han guardado en la base de datos. se debe mostrar la url: localhost:3005/api/usuarios
Se ha hechon un apirest en node.js , para los usuarios.
para poder realizar el metodo post: se debe poner localhost:3005/api/usuarios, de esa forma podemos almacenar los datos json en fidller, en postman entre otros. 
Una vez que hemos almacenado  los datos de los usuarios, va a dar un token para que se pueda fortalecer la ruta del login, cada 24 horas se va a tener que renovar ese token en el postman.
Ese token se va a utilizar en el front, para que el usuario pueda ingresar a la aplicacion.
 en la base de datos va a mostrar la contraseña encryptada y los datos del usuario.
 Para poder mostrar a los usuarios en el get: se debe dirigir lo siguiente localhost:3005/api/usuarios y aparte se debe poner el x-token, si no ponemos el x-token en el header: nos va a tirar una alerta en el postman o difller que por favor necesitamos ese token para poder mostrar los usuarios que tenemos en el mongodb.
  Para poder actualizar a los usuarios en el put: se debe dirigir lo siguiente localhost:3005/api/usuarios/id y aparte se debe poner el x-token, si no ponemos el x-token en el header: nos va a tirar una alerta en el postman o difller que por favor necesitamos ese token para poder actualizar a  los usuarios que tenemos en el mongodb.
  En el delete hemos puesto una funcion que una vez que en la parte front quiera eliminar un usuario, no se va a mostrar en la base de datos, pero si queremos mostrarlo en el postman de la siguiente manera localhost:3005/api/usuarios/id , nos saldra un mensaje que esta desactivado.
  para el metodo login, vamos a esperar que nos den un token al momento que se crea un usuario, o podemos utilizarlo de la siguiente manera localhost:3005/api/usuarios/login  para que nos  de un token aleatorio, para que en el front nuestro usuario pueda acceder al dashboard de la app, si no obtiene el token del backend, el usuario no podra acceder a la app.
  Para poder buscar a los usuarios hemos creado su rutas, utilizandolo en el metodo get colocamos localhost:3005/api/total, de esta forma en el postman podemos mostrar la cantidad de usuarios que tenemos almacenado en la base de datos o en los servicios del front agregamos `${base_url}/usuarios/?todo=${todo}`, y nos saldra la cantidad de usuarios que tenemos almacenados.


  Librerias Utilizadas: Hemos utilizado el  npm i bycrpit para la encriptacion de la contraseña en los controller.
   El npm i nodemailer para la verificacion de correo electronico en el contraller.
   Npm i mongoose para que nuestra base de datos pueda funcionar correctamente con la conexion a node.express
   Npm i  dotenv para poder configurar la ruta de nuestra base de datos, el puerto 3005 que va a correr nuestra base de datos y nuestro clave secreta que esta abreviada con JWT_SECRET.
   Npm i uuid para que podamos utilizar nuestro id de una forma mas abreviada en el postman o en la parte frond.
   Npm i validator se va a encargar cada parametro del usuario, al momento de que se vaya almacenar la informacion correcta.
   Npm i cors  para permitir que un user agent obtenga permiso para acceder a recursos seleccionados desde un servidor.

