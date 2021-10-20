# Thinkful Project - GrubDash
#### A project as part of Thinkful Engineering Immersion.  

The assignment for this project is to build a RESTful API using Node.js and Express.  The "database" the server is connected to is a local file, as we had not yet learned how to utilize a PostgreSQL database.  Nonetheless, this server is able to handle various CRUD requests.  Additionally, for this project, we were required to write numerous validation functions for most CRUD requests, so this assignment demonstrates our ability to create and implement those validation functions.

## Tasks


1. In the src/dishes/dishes.controller.js file, add handlers and middleware functions to create, read, update, and list dishes. Note that dishes cannot be deleted.
2. In the src/dishes/dishes.router.js file, add two routes: /dishes and /dishes/:dishId. Attach the handlers (create, read, update, and list) exported from src/dishes/dishes.controller.js.
3. In the src/orders/orders.controller.js file, add handlers and middleware functions to create, read, update, delete, and list orders.
4. In the src/orders/orders.router.js file, add two routes: /orders and /orders/:orderId. Attach the handlers (create, read, update, delete, and list) exported from src/orders/orders.controller.js.
5. Anytime you need to assign a new id to an order or dish, use the nextId function exported from src/utils/nextId.js

## Rubric

For your project to pass, all of the following statements must be true.

* All tests are passing in Qualified.
* All middleware and handler functions have a single responsibility and are named functions.
* All data passed between middleware and handler functions uses response.locals.
* All chained method calls on a route(...) end with all(methodNotAllowed).
* All update handlers guarantee that the id property of the stored data cannot be overwritten.

## Miscellaneous

We were given the option to connect our server to a provided front-end application:
[GrubDash frontend](https://github.com/Thinkful-Ed/starter-grub-dash-front-end)

## Technology
#### Built with:
  * Node.js, Express
