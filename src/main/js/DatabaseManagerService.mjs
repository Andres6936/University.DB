import {default as mongodb} from 'mongodb';

const MongoClient = mongodb.MongoClient;

export class DatabaseManagerService {
    #client = undefined
    #connection = undefined
    #collection = undefined

    constructor() {
        // Connect the client to the server
        this.#client = new MongoClient('mongodb://localhost:27017', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    }

    async startUp() {
        await this.#client.connect();
        // Establish and verify connection
        this.#connection = await this.#client.db('University');
        return this;
    }

    /**
     * @return {Promise<void>} Ensures that the client will close when you finish/error
     */
    async close() {
        await this.#client.close();
    }

    async getAllProfessors() {
        this.#collection = this.#connection.collection('Professor');
        const result = [];
        const cursor = await this.#collection.find({});
        while (await cursor.hasNext()) {
            result.push(await cursor.next());
        }
        return result;
    }
}
