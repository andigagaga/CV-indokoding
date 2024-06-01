import joi from "joi";

export const userRegisterSchema = joi.object({
  username: joi.string().min(3).max(30).required().messages({
    "string.base": "Username harus berupa teks.",
    "string.empty": "Username tidak boleh kosong.",
    "string.min": "Username harus memiliki minimal 3 karakter.",
    "string.max": "Username tidak boleh lebih dari 30 karakter.",
    "any.required": "Username wajib diisi.",
  }),
  email: joi.string().email().required().messages({
    "string.email": "Email harus berupa email yang valid.",
    "string.empty": "Email tidak boleh kosong.",
    "any.required": "Email wajib diisi.",
  }),
  password: joi.string().min(6).max(30).required().messages({
    "string.base": "Password harus berupa teks.",
    "string.empty": "Password tidak boleh kosong.",
    "string.min": "Password harus memiliki minimal 6 karakter.",
    "string.max": "Password tidak boleh lebih dari 30 karakter.",
    "any.required": "Password wajib diisi.",
  }),
  profile_picture: joi.string().uri().allow(null, "").messages({
    "string.uri": "Profile picture harus berupa URL yang valid.",
  }),
});

export const userLoginSchema = joi.object({
  email: joi.string().email().required().messages({
    "string.email": "Email harus berupa email yang valid.",
    "string.empty": "Email tidak boleh kosong.",
    "any.required": "Email wajib diisi.",
  }),
  password: joi.string().min(6).max(30).required().messages({
    "string.base": "Password harus berupa teks.",
    "string.empty": "Password tidak boleh kosong.",
    "string.min": "Password harus memiliki minimal 6 karakter.",
    "string.max": "Password tidak boleh lebih dari 30 karakter.",
    "any.required": "Password wajib diisi.",
  }),
});
