import {getSondages}  from "../../../lib/sondage";

export default async (req, res) => {
  const sondages = await getSondages();

  res.json(sondages);

  // try {
  //   const client = await clientPromise;
  //   const db = client.db("sondages");

  //   const sondages = await db.collection("sondages").find({}).limit(20).toArray();

  //   res.json(sondages);

  // } catch (e) {
  //   console.error(e);
  //   throw new Error(e).message;
  // }
};
