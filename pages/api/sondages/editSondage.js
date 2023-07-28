import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("sondages");
    const { id } = req.query;
    const { title, description, answers } = req.body;

    const sondage = await db.collection("sondages").updateOne(
      {
        _id: ObjectId(id),
      },
      {
        $set: {
          title: title,
          description: description,
          answers: answers,
        },
      }
    );

    res.json(sondage);
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
};
