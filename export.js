const { MongoClient, ObjectId } = require("mongodb");
const fs = require("fs");

console.log(123)
// const uri = "mongodb+srv://nikhilsachan747884:ppssqegurowszlmu@cluster0.zj4ldxm.mongodb.net/?retryWrites=true&w=majority";
const uri = "mongodb://0.0.0.0:27017/";
const client = new MongoClient(uri);
var collections = [] ;
const DB_NAME = "cs_admin_new";

async function run() {
    console.log("hello");
    
    await client.connect();
    var dbObject = client.db(DB_NAME);
    
    var x = await dbObject.listCollections().toArray( )
    .then(
        cols => cols.forEach(element => {
            collections.push(element);
        })
        )
    .finally(() => client.close());

    // console.log(collections);
    saveCollections();
}

async function saveCollections(){

    await client.connect();
    var dbObject = client.db(DB_NAME);

    for (const collection of collections) {
        const contents = await dbObject.collection(collection.name).find({}).toArray();
        var x= JSON.stringify(contents);
        fs.writeFile(`./Documents/${collection.name}.json`, x, function(err){
            if(err)  throw err;
            console.log('Saved!');
        });
        // console.log( contents);
      }


}
run();