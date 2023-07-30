import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("sondages");
    const { id } = req.query;
    const { newCount, answerIndex } = req.body;
    

    const sondage = await db.collection("sondages").findOne({
      _id: ObjectId(id),
    });

    
    const updatedAnswers = sondage.answers.map((answer, index) => {
      if (index === answerIndex) {
        return {
          answer: answer.answer,
          count: newCount,
        }
      } else {
        return answer
      }
    })

    const updatedSondage = await db.collection("sondages").updateOne(
      {
        _id: ObjectId(id),
      },
      {
        $set: {
          answers: updatedAnswers,
        },
      }
    );

    res.json(updatedSondage);
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
};
