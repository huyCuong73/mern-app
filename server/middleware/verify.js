import jwt from "jsonwebtoken"

export default function verify (req,res,next) {
    const authHeader = req.headers.token;
    if(authHeader) {
        const token = authHeader.split(" ")[1]
        jwt.verify(token, process.env.KEY, (err, user) =>{
            if(err)
                res.status(403).json("Not valid")
            req.user = user;
            next()
        })
    } else{
        return res.status(401).json("Not authenticated")
    }
}