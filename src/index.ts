import express from "express"
import cors from "cors"

const app = express()


app.use(cors())
app.use(express.json())


app.listen(3003, () => console.log("server rodando na porta 3003" ))


app.use("/users", usersRouter)