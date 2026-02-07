import express from "express"
import { globalError } from "./middlewares/global-error.js"

const app = express()

app.use(express.json())

app.use(globalError)

export default app