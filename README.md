## **multi-destination-api**

**Multi-destination-api** fue desarrollado como una herramienta para personas que realizan entregas de ecommerce o cualquier otra que se beneficie de un servicio como este el cual permite gestionar su pedidos y realizar rutas de entregas segun: **comuna** y **status**

**Realizado con Node.Js + Express, MongoAtlas** 

**User:**
Creacion de usuario `endpoint`

    POST /api/user
Este necesita el siguiente `schema` mediante el `req.body`: 

    {
    "name":  "Jose",
    "email":  "jose@gmail.com",
    "password":  "123456"
    }
Retorna el siguiente JSON:

    {
    "data":  {
	    "trips":  [],
	    "routes":  [],
	    "userType":  "USER",
	    "name":  "Jose",
	    "email":  "jose@gmail.com",
	    "id":  "6090648738db7b0015473cdb"
	    },
    "msg":  "User: Jose create"
    }
Obtener todos los usuarios (solo ADMIN) `endpoint`

    GET /api/user
devuelve un `JSON` con todos los usuarios registrados

Obtener usuario por ID `endpoint`

    GET /api/user/userID
devuelve el usuario segun el `ID` dado en `userID`

Modificar usuario `endpoint`

    PUT /api/user/userID
   devuelve el usuario modificado.
   
Eliminar usuario (solo ADMIN) `endpoint`  .

    DELETE /api/user/userID
devuelve el usuario eliminado.

**Trip:**
Crear un trip `endpoint`

    POST /api/trip
Este necesita un `schema` mediante el `req.body`:

    {
    "clientName":  "claudio test",
    "phoneNumber":  22423,
    "orderNumber":  242323,
    "street":  "callao",
    "number":  2929,
    "comuna":  "las condes",
    "city":  "santiago",
    "region":  "metropolitana",
    "zipCode":  35343,
    "deliveryStatus":  false
    }

Obtener todos los `trip` del usuario `endpoint`.

    GET /api/trip
devuleve `JSON` con todos los `trip` del usuario.

Obtener `trip` por `ID` `endpoint`

    GET /api/trip/tripID
devuelve un `JSON` del `trip` encontrado segun `tripID`.

Modificar `trip` segun su `ID` `endpoint`

    PATCH /api/trip/tripID

devuelve un `JSON` del `trip` segun su `ID` ya modificado.
 
 Eliminar un `trip` del usuario `endpoint`
 
    DELETE /api/trip/tripID
devuelve el `ID` del `trip` eliminado.

**Login:**
Login del usuario `endpoint`

    POST /api/auth/login
este necesita que se le envie los siguiente `schema` mendiate el `req.body`:

    {
    "email":  "test@gmail.com",
    "password":  "test"
    }
devuelve un `JSON` con todos los datos del usuario y genera un `JSONWEBTOKEN`:

    {
    "data":  {
    	"trips":  [
    		"6084f225ae761053500184aa"
    	],
    	"routes":  [],
    	"userType":  "USER",
    	"name":  "test User",
    	"email":  "test@gmail.com",
    	"id":  "6084eba607b29a582c640696"
    	},
    	"token":""
    }
**Routes:**
Generar rutas siguiendo los parametros dados. Los parametros disponibles: **`comuna`**, **`status`** y **`limit`**. `endpoint`

    GET /api/routes/routemaker?
Este devuelve un `JSON`de los `trip`en encontrados segundo los parametros enviados.

`comuna`:`string`: Este  indica cual `trip` en su propiedad `comuna` se deben encontrar. Por `default` su valor es `santiago`.

`status`: `boolean`: Este indica cual `trip`en su propiedad `deliveryStatus`se deben encontrar. Por `default` su valor es `false`.

`limit`: `number`: Este indica la cantidad de `trip` a en contrar. Su valor por `default` es `2`.

Creacion de ruta segun los datos enviados en `req.body`. `endpoint`

    POST /api/routes/createroute
devuelve un JSON con la ruta creada.

Generar ruta con coordenadas `endpoint`

    GET /api/routes/getmap/routeID
devuelve un `JSON` con lo siguiente

    {
	    "destination":  [
			{
			    "distance":  36.032861765,
			    "name":  "",
			    "location":  [
			    -70.631469,
			    -33.437844
				]
		    },
		    {
			    "distance":  2.506678641,
			    "name":  "Seminario",
			    "location":  [
			    -70.627345,
			    -33.451704
			    ]
		    }
	    ],
	    "distance":  [
		    [
			    0,
			    3048.3
		    ]
		],
	    "msg":  "Your details succesffuly ok"
    }

