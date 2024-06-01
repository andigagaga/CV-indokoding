import { Router } from "express";
import ProductController from "../../controllers/product/ProductController";
import upload from "../../middlewares/UploadImages";
import { authMiddleware } from "../../middlewares/AuthMiddleware";

const productRouter = Router();

productRouter.post(
  "/product",
  authMiddleware,
  upload.single("image"),
  ProductController.createProduct
);

productRouter.get("/getAllProduct", ProductController.getAllProducts);
productRouter.get("/getAllProduct/:id", ProductController.getAllProductById);

productRouter.put(
  "/updateProduct/:id",
  upload.single("image"),
  ProductController.updateProduct
);

productRouter.delete("/deleteProduct/:id", ProductController.deleteProduct);

export default productRouter;
