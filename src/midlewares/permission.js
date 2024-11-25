import Roles from '../models/Roles.js';
import Permissions from '../models/Permissions.js';
import Users from '../models/User.js'

// 
export const checkPermissionAdmin =async (req,res,next)=>{
    try {
        const user = await Users.findById(req.user.id);
        
        if(!user){
            return res.status(400).json({message: "Token lỗi"})
        }
        
        if(user.role != 1 ){
            res.status(403).json({message: "Bạn không có quyền làm việc này"});
        }

        next();

    } catch (error) {
        return res.status(400).json({message: error.message})
    }
    
}

export const checkPermission = async (req,res,next) =>{
    try {
        const user = await Users.findById(req.user.id);
        
        if(!user){
            return res.status(400).json({message: "Token lỗi"})
        }

        const role = await Roles.findOne({value : user.role}).populate('permissionsId');
        
        const listPermistion = role.permissionsId.map((item)=>{
            return {
                name: item.name,
                description: item.description
            }
        })

        const isPermission = listPermistion.some((per)=>{
            return per.name == req.url.replace("/","");
        })
        
        if(!isPermission){
            return res.status(403).json({message:"Bạn không có quyền"})
        }
        
        next();
        
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}