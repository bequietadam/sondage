import clientPromise from "../../../lib/mongodb";

export default async (req, res) => {
  try {
    console.log('TRYYYYYYYY')
    const client = await clientPromise;
    const db = client.db("sondages");

    const sondages = await db.collection("sondages").find({}).limit(20).toArray();
    console.log(sondages);

    res.json(sondages);
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
};
