import clientPromise from "../../../lib/mongodb";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("sondages");
    console.log(db)

    const sondages = await db.collection("sondages").find({}).limit(20).toArray();

    res.json(sondages);
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
};
