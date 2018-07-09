// const moment = require('moment');


let generateMessage = (from, text, createdAt) =>{
    return{
        from,
        text,
        createdAt: new Date()
    }
} 

module.exports = { generateMessage };