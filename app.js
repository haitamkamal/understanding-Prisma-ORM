const  express = require('express');
const app = express();




app.get("/",(req,res)=>{
  res.send("Hello , World");
})





PORT = 3000
app.listen(3000,  ()=>{
  console.log(`this server is listen port ${PORT}`);
})