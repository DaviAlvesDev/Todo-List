import app from "./app.js"
import "dotenv/config"

const PORT = Number(process.env.PORT)

app.listen(PORT, () => console.log("Server is listening on port", PORT))