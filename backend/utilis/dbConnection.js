const mongoose = require('mongoose');


const conn =  () => {
    return mongoose.connect(process.env.MONGOOSE_URI)
    
}

module.exports = conn;