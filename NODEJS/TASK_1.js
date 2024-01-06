// EXPORTING REQUIRED MODULE USING REQUIRE METHOD //
const express = require ("express");
const fs = require ("fs");
const path = require ("path");


const app = express()


// creating a constant variable and assigining a file path to it //
const outputcontainer = "./OUTPUT";

// asignining a listening [[port]] //
const PORT = 8787;



app.post("/createFile", (req , res) => {
  
 const currentTime  = new Date();
 const year = currentTime.getFullYear().toString();
 const month = (currentTime.getMonth()+ 1).toString();
 const date = currentTime.getDate().toString();
 const hrs = currentTime.getHours().toString();
 const mins = currentTime.getMinutes().toString();
 const secs = currentTime.getSeconds().toString();


const dateTimeForFileName = `${year}-${month}-${date}-${hrs}-${mins}-${secs}.txt`;

const filepath = path.join(outputcontainer, dateTimeForFileName);

fs.writeFile(filepath,currentTime.toISOString(), (err) => {
 
 if(err)
 {
 res.status(500).send(`Error Creating File:$(err)`);
 return; 
}   

 res.send(`File created Sucessfully @ : ${filepath}`);

});

});


// GET METHOD 

app.get("/getFiles" , (res,req)=> {
 
// TO READ THE FILES // 

fs.readdir(outputcontainer , (err ,files) => {
if(err)
{
  res.status(500).send("Error reading files:${err}");
  return;
}
console.log("List Of files:",files);
const textfiles = files.filter((file)=> path.extname(file) === ".txt" );    

 res.json(textfiles)

});


});


// LISTENING PORT // 

app.listen( PORT , () => {
 
console.log("server is running on PORT", PORT);

});