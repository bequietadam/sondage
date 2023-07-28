import clientPromise from "../../../lib/mongodb";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("sondages");
    const { title, description, answers } = JSON.parse(req.body);

    const sondage = await db.collection("sondages").insertOne({
      title,
      description,
      answers,
    });
    res.json(sondage);
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
};
