const globalErrorHandler = (error, req, res, next) => {


    if(error.name === 'ValidationError'){
        let err = [];
        const k = Object.keys(error.errors);
        
        k.forEach(key => {
            newError = {
            msg: error.errors[key].message
            }
            err.push(newError);
        });
        res.status(500).json({sucess: false, error: err})
        console.error(error);

    }else{
        
        const code = error.statusCode || 500
        const message = error.message || "Internal Server Error..";
        res.status(code).json({sucess: false, msg: message});
        console.error(error);
    }

}

module.exports = globalErrorHandler;

