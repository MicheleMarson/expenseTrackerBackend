const jwt = require("jsonwebtoken")

const auth = (req, res, next) => { 
  try{
    const accessToken = req.headers.authorization.replace("Bearer ", "")
    const JWTpayload = jwt.verify(accessToken, process.env.JWT_SALT)
  
    req.user = JWTpayload
  }catch(error){
    res.status(401).json({
      status: "failed",
      message: "Unauthorized"
    })
  }

  //next() in this context is the dashboard code route
  next()
  
}

module.exports = auth