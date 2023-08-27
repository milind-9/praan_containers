const mongoose = require('mongoose')

const connectDatabase = () => {
    // mongoose.set('strictQuery', false);
    mongoose.set('strictQuery', false)
    mongoose.connect("mongodb+srv://smilin453:zfl6bcr4puU6KBmd@cluster0.fvao7uc.mongodb.net/praan",{
        useNewUrlParser: true,
        // useFindAndModify: false,
        useUnifiedTopology: true
      }).then((data)=>{
        console.log(`Mongodb connected with server: ${data.connection.host} `)
    })
}
module.exports = connectDatabase
