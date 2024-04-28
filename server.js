// import app from backend/app.js
const app = require("./backend/app")
// serveur is listening on Port 3000 (http://localhost:3000)
// damreg el makina 3al port 3000
app.listen (3000, ()=>{
    console.log("server is Listening on port 3000....")
})