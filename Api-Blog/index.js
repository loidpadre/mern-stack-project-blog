const express = require("express")
const PORT = 4000
const cors = require("cors")
const app = express()
const dbConnection = require("../Api-Blog/dbCoonfig/dbConfig")
const User = require("./models/User")

app.use(express.json())
app.use(cors())

app.post("/register", async (req, res) => {
    const { username, password } = req.body
    const userRes = await User.create({ username, password })
    res.json(userRes)
    console.log({ Data: userRes })

})


app.listen(PORT, () => {
    dbConnection()
    console.log("Servidor rodando na porta", PORT)
})