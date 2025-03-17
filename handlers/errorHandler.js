const errorHandle = (error, req, res, next) => {
  if(error){
    res.status(400).json({
      status: "failed",
      message: error.message?error.message:error
    })
  }else{
    next()
  }
}

module.exports = errorHandle