const express = require("express")
const PORT = 4000
const cors = require("cors")
const app = express()
const dbConnection = require("../Api-Blog/dbCoonfig/dbConfig")
const User = require("./models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const cookie = require("cookie-parser")

app.use(cookie())
app.use(express.json())
app.use(cors())
const salt = bcrypt.genSaltSync(10)

// secrete token 
const secret = "ahfidahfery487heinafguivyh7atgqhfiefefg54wyvm6uy59m8hwi"

// route for register
app.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body
        const userRes = await User.create({ username, password: bcrypt.hashSync(password, salt) })
        res.json(userRes)
        console.log({ Data: userRes })
    } catch (error) {
        res.status(400).json({ error: true, message: "User already exists" })
        console.log({ error: true, message: "User already exists" })
    }

})
// route for login

app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const userDB = await User.findOne({ username });
        const comparePassword = await bcrypt.compare(password, userDB.password);

        if (comparePassword) {
            // logado
            //  se estiver logado com sucesso vou lhe entregar o token
            jwt.sign({ username, id: userDB._id }, secret, {}, (error, token) => {
                if (error) throw error
                res.cookie("token", token, { httpOnly: true, path: "/", domain: "localhost", secure: true });
                res.json("ok")

            })
        } else {
            // senha incorreta
            res.json("Login failed: Incorrect password");
        }

    } catch (error) {
        console.error(error);
        res.status(500).json("Internal Server Error");
    }
});



app.listen(PORT, () => {
    dbConnection()
    console.log("Servidor rodando na porta", PORT)
})