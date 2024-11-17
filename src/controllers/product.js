import Products from "../models/Products.js";
import Categories from "../models/Categories.js";
import {productValidator} from '../validators/product.js'

// [GET] /product
export async function index(req,res){
    try{
        const data = await Products.find().populate('categoryId');
        return res.status(200).json(data);
        
    }catch(err){
        return res.status(500).json({
            message: err
        })
    }
}
// [GET] /product/:id
export async function getById(req,res){
    try{
        const id = req.params.id;
        if(!id){
            return res.status(404).json({ message: "Không tìm thấy id"})
        }

        const data = await Products.findById(id).populate('categoryId');
        return res.status(200).json(data);
        
    }catch(err){
        return res.status(500).json({
            message: err
        })
    }
}

// [POST] /product
export async function add(req,res){
    try{
        const {error} = productValidator.validate(req.body,{abortEarly: false});

        if(error){
            const messages = error.details.map(item => item.message)
            return res.status(400).json({error: messages})
        }

        const data = await Products.create(req.body);
        return res.status(201).json(data);

    }catch(err){
        return res.status(500).json({
            message: err
        })
    }
}

// [DELETE] /product/:id
export async function remove (req,res){
    try{
        const id = req.params.id;
        if(!id){
            return res.status(404).json({ message: "Không tìm thấy id sản phẩm"})
        }

        const data = await Products.findByIdAndDelete(id);

        return res.status(200).json({
            message: "Xóa thành công"
        });

    }catch(err){
        return res.status(500).json({
            message: err
        })
    }
}

// [PUT] /product/:id
export async function update (req,res){
    try{
        const id = req.params.id;
        if(!id){
            return res.status(401).json({message: "Không nhận được id"})
        }

        const {error} = productValidator.validate(req.body,{abortEarly: false});
        if(error){
            const messages = error.details.map(item => item.message)
            return res.status(400).json({error: messages})
        }

        const data = await Products.findByIdAndUpdate(id, req.body, {new:true})
        return res.status(200).json(data);
        

    }catch(err){
        return res.status(500).json({
            message: err
        })
    }
}