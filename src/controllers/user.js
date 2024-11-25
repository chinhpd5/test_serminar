import User from "../models/User.js";
import { signinValidator, userValidator } from "../validators/user.js";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken'
import 'dotenv/config'
// [Post] /register
export async function register(req,res){
    try {
        
        const {error} = userValidator.validate(req.body,{abortEarly:false})
        if(error){
            const messageErrors = error.details?.map((item)=> item.message);
            return res.status(400).json({message: messageErrors})
        }

        const exitsEmail = await User.findOne({email: req.body.email});
        if(exitsEmail){
            return res.status(400).json({message: "email này đã tồn tại"})
        }

        const hashedPassword = await bcryptjs.hash(req.body.password,10);
        const user = await User.create({
            ...req.body,
            password: hashedPassword
        })
        user.password =null;

        return res.status(201).json({
            message: "Đăng ký thành công",
            user 
        });        

    } catch (error) {
        return res.status(500).json({message: error})
    }
}

export async function login(req, res){
    try {

        const {error} = signinValidator.validate(req.body,{abortEarly : false});
        if(error){
            const messageError = error.details?.map((item)=> item.message);
            return res.status(400).json({message: messageError})
        }

        const userExist = await User.findOne({email: req.body.email});
        
        if(!userExist){
            return res.status(404).json({message: "Không tìm thấy user"})
        }

        const isMatch = await bcryptjs.compare(req.body.password,userExist.password);

        if(!isMatch){
            return res.status(400).json({message: "Sai mật khẩu"});
        }

        const token = jwt.sign({id:userExist._id,username: userExist.username,role:userExist.role  },process.env.SECRET_KEY,{expiresIn: '2h'})

        return res.status(200).json({
            message: "Đăng nhập thành công",
            user: {id:userExist._id, username: userExist.username },
            token
        })
        

    } catch (error) {
        return res.status(500).json({message: error})
    }
}