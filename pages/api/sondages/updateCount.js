import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("sondages");
    const { id } = req.query;
    const { answerIndex } = req.body;
    
    console.log(answerIndex);

    const sondage = await db.collection("sondages").findOne({
      _id: ObjectId(id),
    });

    
    const updatedAnswers = sondage.answers.map((answer, index) => {
      if (index === answerIndex) {
        return {
          answer: answer.answer,
          count: answer.count + 1,
        }
      } else {
        return answer
      }
    })

    console.log('updatedAnswers: ', updatedAnswers);

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