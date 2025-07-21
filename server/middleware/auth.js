// import jwt from "jsonwebtoken";

// const auth=(req,res,next)=>{
//     const token=req.headers.authorization;
//     if (!token) {
//   return res.status(401).json({ success: false, message: "No token provided" });
// }
//     try {
//         jwt.verify(token,process.env.JWT_SECRET)
//         next();
//     } catch (error) {
//         res.json({ success: false, message:"invalid token"})

//     }
// }

// export default auth;
import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ success: false, message: "No token provided" });
    }
    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.json({ success: false, message: "invalid token" })

    }
}

export default auth;
