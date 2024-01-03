import client from './_db.js';

export default async (req, res) => {
    try {
        await client.connect();
        const database = client.db('angular');
        const collection = database.collection('sample');

        if (req.method === 'GET') {
			const data = await collection.find({}).toArray();
			res.json(data);
        }

        if (req.method === 'POST') {
			res.status(500).send({
				message: 'post not supported yet'
			});
        }
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
