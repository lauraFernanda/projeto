const { Router } = require("express");

const UserController = require("./controllers/UserController");

const ProductController = require("./controllers/ProductController");

const ProvideController = require("./controllers/ProvideController");

const routes = Router();

routes.post("/login", UserController.login);
routes.post("/user", UserController.store);
routes.get("/users", UserController.indexUsers);


routes.post("/index", UserController.index);
routes.put("/updateUser", UserController.update);
routes.get("/listUsers", UserController.indexUsers)

routes.post("/product", ProductController.create);
routes.post("/indexProduct", ProductController.index);
routes.get("/listProducts", ProductController.indexProducts)

routes.post("/provider", ProvideController.create);
routes.post("/indexProvider", ProvideController.index)
routes.get("/listProvider", ProvideController.indexProviders)

module.exports = routes;
