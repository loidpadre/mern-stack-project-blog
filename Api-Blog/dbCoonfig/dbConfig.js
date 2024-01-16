const mongoose = require("mongoose")

function dbConnection() {
    mongoose.connect("mongodb+srv://scorpionstartt:sEqe3FuSZMS80mkZ@blog.qvoyefh.mongodb.net/?retryWrites=true&w=majority").then(() => {
        console.log("Conexão bem sucedida!")
    }).catch((error) => {
        console.log("erro ao conectar com a BD")
    })
}
// sEqe3FuSZMS80mkZ
// mongodb+srv://scorpionstartt:sEqe3FuSZMS80mkZ@blog.qvoyefh.mongodb.net/?retryWrites=true&w=majority


module.exports = dbConnection