import { Repository } from "typeorm";
import { Product } from "../../entity/Product";
import { AppDataSource } from "../../data-source";
import { Request, Response } from "express";
import { productCreateSchema } from "../../utils/validator/ProductValidator";
import { uploadToCloudinary } from "../../utils/cloudinary/CloudinaryUploader";

export default new (class ProductServices {
  private readonly productRepository: Repository<Product> =
    AppDataSource.getRepository(Product);

  async createProduct(req: Request, res: Response): Promise<Response> {
    try {
      const { title, description, price } = req.body;

      const { error, value } = productCreateSchema.validate({
        title,
        description,
        price,
      });

      if (error) {
        return res.status(400).json({
          code: 400,
          message: "CREATE PRODUCT FAILED, CHECK YOUR INPUT",
          error: error.details,
        });
      }

      const titleFind = await this.productRepository.findOne({
        where: { title: value.title },
      });

      const descriptionFind = await this.productRepository.findOne({
        where: { description: value.description },
      });

      if (titleFind || descriptionFind) {
        return res.status(400).json({
          code: 400,
          message: "PRODUCT ALREADY EXISTS",
        });
      }

      // Upload image to cloudinary
      let cloudinary_image = "";
      if (req.file?.filename) {
        cloudinary_image = await uploadToCloudinary(req.file);
      }

      // Create new product
      const newProduct = this.productRepository.create({
        title: value.title,
        description: value.description,
        price: value.price,
        image: cloudinary_image,
      });

      const productCreated = await this.productRepository.save(newProduct);

      return res.status(201).json({
        code: 201,
        message: "CREATE PRODUCT SUCCESS",
        data: productCreated,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        code: 500,
        message: "INTERNAL SERVER ERROR",
        error: error.message,
      });
    }
  }

  async getAllProducts(req: Request, res: Response): Promise<Response> {
    try {
      const products = await this.productRepository.find();
      return res.status(200).json({
        code: 200,
        message: "GET ALL PRODUCTS SUCCESS",
        data: products,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        code: 500,
        message: "INTERNAL SERVER ERROR",
        error: error.message,
      });
    }
  }

  async getProductById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const product = await this.productRepository.findOne({
        where: { id: Number(id) },
      });
      return res.status(200).json({
        code: 200,
        message: "GET PRODUCT SUCCESS",
        data: product,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        code: 500,
        message: "INTERNAL SERVER ERROR",
        error: error.message,
      });
    }
  }

  async updateProduct(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { title, description, price } = req.body;
      const { error, value } = productCreateSchema.validate({
        title,
        description,
        price,
      });

      if (error) {
        return res.status(400).json({
          code: 400,
          message: "UPDATE PRODUCT FAILED, CHECK YOUR INPUT",
          error: error.details,
        });
      }

      const productToUpdate = await this.productRepository.findOneBy({
        id: parseInt(id),
      });

      if (!productToUpdate) {
        return res.status(404).json({
          code: 404,
          message: "PRODUCT NOT FOUND",
        });
      }

      // Update product fields
      productToUpdate.title = value.title;
      productToUpdate.description = value.description;
      productToUpdate.price = value.price;

      // If a new image is provided, upload it to Cloudinary and update the image field
      if (req.file) {
        const cloudinary_image = await uploadToCloudinary(req.file);
        productToUpdate.image = cloudinary_image;
      }

      const updatedProduct = await this.productRepository.save(productToUpdate);

      return res.status(200).json({
        code: 200,
        message: "UPDATE PRODUCT SUCCESS",
        data: updatedProduct,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        code: 500,
        message: "INTERNAL SERVER ERROR",
        error: error.message,
      });
    }
  }

  async deleteProduct(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const productToDelete = await this.productRepository.findOneBy({
        id: parseInt(id),
      });
      if (!productToDelete) {
        return res.status(404).json({
          code: 404,
          message: "PRODUCT NOT FOUND",
        });
      }

      await this.productRepository.remove(productToDelete);
      return res.status(200).json({
        code: 200,
        message: "DELETE PRODUCT SUCCESS",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        code: 500,
        message: "INTERNAL SERVER ERROR",
        error: error.message,
      });
    }
  }
})();
