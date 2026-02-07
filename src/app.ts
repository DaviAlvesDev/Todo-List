import express from "express"
import { globalError } from "./middlewares/global-error.js"
import mainRouter from "./routes/index.js"

const app = express()

app.use(express.json())

app.use(mainRouter)

app.use(globalError)

export default app