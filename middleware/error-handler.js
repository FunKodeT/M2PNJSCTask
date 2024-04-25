const {CustomAPIError}=require('../errors/custom-error');
const errorHandlerMiddleware=(err,req,res,next)=>{
    if(err instanceof CustomeAPIError){
        return res.status(err.statusCode).json({msg:err.message});
    };
    return res.status(500).json({msg:'We encountered an issue, please return to previous page'});
};
module.exports=errorHandlerMiddleware;