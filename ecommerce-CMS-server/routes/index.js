const router = require("express").Router();
const Controller = require("../controllers/controller");
const { authenticate } = require("../middlewares/authenticate");
const { authorize } = require("../middlewares/authorize");

router.post("/login", Controller.login);
router.post("/register", Controller.register);

router.get("/products", Controller.readAllProduct);

router.use(authenticate);

router.get('/carts', Controller.readCart)
router.get('/carts/history', Controller.readCartHistory)
router.post('/carts', Controller.addCart)
router.put('/carts', Controller.updateCart)
router.patch('/carts/:id', Controller.changeQuantity)
router.delete('/carts/:id', Controller.deleteCart)


router.get("/products/:id", Controller.readProductById);

router.use(authorize);

router.post("/products", Controller.createProduct);
router.put("/products/:id", Controller.updateProduct);
router.delete("/products/:id", Controller.deleteProduct);

module.exports = router;
