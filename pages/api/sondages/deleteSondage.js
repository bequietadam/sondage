import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("sondages");
    const { id } = req.query;

    const sondage = await db.collection("sondages").deleteOne({
      _id: ObjectId(id),
    });

    res.json(sondage);
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
};
