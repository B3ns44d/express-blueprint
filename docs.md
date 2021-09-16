# The folder structure

```
.
├── bin
│   └── www       # The entry point for the app
├── core          # Core modules (here all you're express routes, middlewares, controllers... goes)
│   ├── auth
│   │   └── index.js
│   ├── controllers
│   │   └── auth.controller.js
│   ├── middlewares
│   │   ├── endpointsLogger.js
│   │   ├── index.js
│   │   └── swagger.js
│   ├── routes
│   │   ├── admin.routes.js
│   │   ├── auth.routes.js
│   │   └── user.routes.js
│   └── utils
│       └── schema.js
├── logs           # Logs folder
│   ├── full-report.log
│   └── short-report.log
├── prisma         # Prisma schema definition
│   └── schema.prisma
├── router         # app router (here where you definition all your routes)
│   └── index.js
├── src            # All the source code of the app goes here
│   ├── config     # Environment variables and configuration related stuff
│   │   └── index.js
│   ├── jobs       # Jobs definitions for agenda.js
│   ├── loaders    # Split the startup process into modules
│   │   ├── express.js
│   │   ├── index.js
│   │   └── utils.js
│   ├── services   # All the business logic is here
│   ├── shared     # Shared modules
│   │   └── constants
│   │       └── index.js
│   ├── subscribers # Event handlers for async task
│   ├── __tests__   # All the tests go here
│   │   └── app.test.js
│   └── utils       # Utils modules
│       ├── date.utils.js
│       ├── index.js
│       └── logger.js
├── swagger.json    # Swagger definition
```
