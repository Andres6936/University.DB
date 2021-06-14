import {default as mongodb} from 'mongodb';

const MongoClient = mongodb.MongoClient;

const client = new MongoClient('mongodb://localhost:27017', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

async function run() {
    try {
        // Connect the client to the server
        await client.connect();
        // Establish and verify connection
        const db = await client.db("University");
        const professor = await db.collection('Professor');
        const result = await professor.find({}).project({_id: 0, Name: 1});

        while (await result.hasNext()) {
            console.log(await result.next());
        }

    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

run().catch(console.dir);

class DatabaseManagerService {

}
