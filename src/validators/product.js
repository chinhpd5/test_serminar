import Joi from 'joi';


export const productValidator = Joi.object({
    title: Joi.string().required().min(5).max(256).messages({
        "string.empty": "Không để trống tên sản phẩm",
        "string.min": "Tên sản phẩm cần tối thiếu 5 ký tự",
        "string.max": "Tên sản phẩm có tối đa 256 ký tự",
        "any.required": "Tên sản phẩm là bắt buộc"
    }),
    description: Joi.string().required().messages({
        "string.empty": "Không để trống Mô tả",
        "any.required": "Mô tả là bắt buộc",
    }),
    price: Joi.number().min(0).required().messages({
        "string.empty": "Không để trống Giá bán",
        "any.required": "Giá bán là bắt buộc",
        "number.min": "Giá tối thiểu bằng 0"
    }),
    stock: Joi.number().min(0).required().messages({
        "string.empty": "Không để trống Số lượng sản phẩm",
        "any.required": "Số lượng sản phẩm là bắt buộc",
        "number.min": "Số lượng tối thiểu bằng 0"
    }),
    categoryId: Joi.string(),
    discountPercentage: Joi.number(),
    rating: Joi.number(),

    // thumbnail: Joi.string().required().messages({
    //     "string.empty": "Không để trống Hình ảnh",
    //     "any.required": "Hình ảnh là bắt buộc"
    // })
})
