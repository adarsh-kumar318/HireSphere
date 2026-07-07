const jwt = require("jsonwebtoken");
const authmiddleware=(req,res,next)=>{
    console.log("auth middleware hit");
    const authHeader = req.headers.authorization;
    console.log(req.headers);
console.log("Authorization Header:", authHeader);
    const token = authHeader ? authHeader.split(" ")[1] : null;
    
console.log(token);
if (!token) {
  return res.status(401).json({
    success: false,
    message: "Access Denied. No Token Provided.",
  });
}
const decoded = jwt.verify(token, process.env.JWT_SECRET);

console.log(decoded);
req.user = decoded;
    next();
};
module.exports=authmiddleware;