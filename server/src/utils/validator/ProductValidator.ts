import Joi from "joi";

export const productCreateSchema = Joi.object({
  title: Joi.string().min(3).max(255).messages({
    "string.base": "Title harus berupa teks.",
    "string.empty": "Title tidak boleh kosong.",
    "string.min": "Title harus memiliki minimal 3 karakter.",
    "string.max": "Title tidak boleh lebih dari 255 karakter.",
  }),
  description: Joi.string().min(3).max(255).messages({
    "string.base": "Description harus berupa teks.",
    "string.empty": "Description tidak boleh kosong.",
    "string.min": "Description harus memiliki minimal 3 karakter.",
    "string.max": "Description tidak boleh lebih dari 255 karakter.",
  }),
  price: Joi.number().min(1).messages({
    "number.base": "Price harus berupa angka.",
    "number.empty": "Price tidak boleh kosong.",
    "number.min": "Price tidak boleh kurang dari 1.",
  }),
  image: Joi.string().uri().messages({
    "string.base": "Image harus berupa URL yang valid.",
    "string.empty": "Image tidak boleh kosong.",
  }),
});
