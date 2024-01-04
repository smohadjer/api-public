import client from './_db.js';
import { ObjectId } from 'mongodb';

export default async (req, res) => {
    try {
        await client.connect();
        const database = client.db('angular');
        const collection = database.collection('sample');

        if (req.method === 'GET') {
			const data = await collection.find({}).limit(1000).toArray();
			res.json(data);
        }

        if (req.method === 'POST') {
			const doc = req.body.doc;
			console.log(doc);
			const clone = structuredClone(doc);
			delete clone._id;

			if (doc._id) {
				const query = {_id: new ObjectId(doc._id)};
				const result = await collection.replaceOne(query, clone);
				console.log(result.matchedCount, result.modifiedCount);
				res.status(200).send({
					message: 'document replaced'
				});
			} else {
				const insertResponse = await collection.insertOne(doc);
				res.status(200).send({
					message: `new document with id ${insertResponse.insertedId} got inserted`
				});
			}
        }
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
