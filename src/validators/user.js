import Joi from "joi";

export const userValidator = Joi.object({
  username: Joi.string().required().min(6).max(256).messages({
    "string.empty": "Không để trống username",
    "string.min": "Username cần tối thiếu 6 ký tự",
    "string.max": "Username có tối đa 256 ký tự",
    "any.required": "Username là bắt buộc",
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "Không để trống username",
    "string.email": "Không đúng định dạng email",
    "any.required": "Email là bắt buộc",
  }),
  password: Joi.string().required().min(6).max(256).messages({
    "string.empty": "Không để trống password",
    "string.min": "Password cần tối thiếu 6 ký tự",
    "string.max": "Password có tối đa 256 ký tự",
    "any.required": "Password là bắt buộc",
  }),
  confirmPassword: Joi.string().required().valid(Joi.ref("password")).messages({
    "string.empty": "Không để trống confirm Password",
    "any.required": "Confirm Password là bắt buộc",
    "any.only": "Confirm Password không trùng",
  }),
  role: Joi.number(),
});

export const signinValidator = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Không để trống username",
    "string.email": "Không đúng định dạng email",
    "any.required": "Email là bắt buộc",
  }),
  password: Joi.string().required().min(6).max(256).messages({
    "string.empty": "Không để trống password",
    "string.min": "Password cần tối thiếu 6 ký tự",
    "string.max": "Password có tối đa 256 ký tự",
    "any.required": "Password là bắt buộc",
  }),
});
