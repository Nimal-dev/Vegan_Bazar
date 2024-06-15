const mongoose =require('mongoose')


function connection(){
    mongoose.connect('mongodb://127.0.0.1:27017/Vegan_Bazar')
    .then(()=>console.log('Mongodb connected...'))
    .catch((error)=>{console.log(error)})
}

module.exports = connection
