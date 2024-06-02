import { Request, Response } from "express";
import ProductServices from "../../services/product/ProductServices";

export default new (class ProductController {
  createProduct = async (req: Request, res: Response): Promise<Response> => {
    return ProductServices.createProduct(req, res);
  };

  getAllProducts = async (req: Request, res: Response): Promise<Response> => {
    return ProductServices.getAllProducts(req, res);
  };

  getAllProductById = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    return ProductServices.getProductById(req, res);
  };

  updateProduct = async (req: Request, res: Response): Promise<Response> => {
    return ProductServices.updateProduct(req, res);
  };

  deleteProduct = async (req: Request, res: Response): Promise<Response> => {
    return ProductServices.deleteProduct(req, res);
  };

  searchProducts = async (req: Request, res: Response): Promise<Response> => {
    return ProductServices.searchProducts(req, res);
  };
})();
