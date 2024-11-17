import jwt from 'jsonwebtoken'
import 'dotenv/config'

export const checkAuth = async (req,res,next)=>{
    try {
        if(req.headers.authorization){
            const token = req.headers.authorization.split(' ')[1];
        
            // console.log(token);
            if(!token){
                res.status(403).json({message: "Bạn chưa đăng nhập"});
            }
            
            jwt.verify(token, process.env.SECRET_KEY,(err,decoded)=>{
                if(err){
                    if(err.name == "JsonWebTokenError")
                        return res.status(403).json({message: "Sai token"});
                    else if(err.name =="TokenExpiredError")
                        return res.status(401).json({message: "Token hết hạn"});
                }
                console.log(decoded);
                
                next();
            })
            
        }

        
    } catch (error) {
        return res.status(500).json({message: error})
    }
}