const fs = require("fs");
const path = require('path');
const { MongoClient, ObjectId } = require("mongodb");

const DB_NAME = "cs_admin_new";
let collectionPath = "Documents"
const directoryPath = path.join(__dirname, collectionPath);
 fs.readdir(directoryPath, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
   
    files.forEach(function (file) {
        saveData(file)
    });
});



async function saveData(filename) {
    // const uri = "mongodb+srv://nikhilsachan747884:ppssqegurowszlmu@cluster0.zj4ldxm.mongodb.net/?retryWrites=true&w=majority";
    const uri = "mongodb+srv://csservermain:BzrLUuauJdZe0sjV@cluster1.4k9sfw6.mongodb.net/?retryWrites=true&w=majority";
  
    // const client = new MongoClient(uri);


    // tru
    // await client.connect();
    const client = new MongoClient(uri);
    await client.connect();
    var dbObject = client.db(DB_NAME);

     fs.readFile(`${collectionPath}/${filename}`,{encoding: 'utf-8'}, async (err, data) => { 
        console.log(filename)
        let a0 = JSON.parse(data);
        let nArra = [];
        a0.map(item=>{
            let a01 = item;
            a01 = {...a01, _id: new ObjectId(a01['_id']['$oid'])}
            nArra.push(a01);
        });

        var dbObject = client.db(DB_NAME);
        let schemaName = filename.slice(0, filename.length-5) ;
        
        if(nArra.length > 0){
            dbObject.collection(schemaName).insertMany(nArra, function(err, res){
                if(err){
                    console.log(err);
                }else{
                    console.log("1 document inserted");
                }
                db.close();
            })
        }
    });

}