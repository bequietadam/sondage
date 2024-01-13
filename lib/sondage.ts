import clientPromise from "./mongodb";


export async function getSondages() {

    // const client = await clientPromise;
    // const db = client.db("sondages");

    // const sondages = await db.collection("sondages").find({}).limit(20).toArray();



    try {
        const client = await clientPromise;
        const db = client.db("sondages");

        const sondages = await db.collection("sondages").find({}).limit(20).toArray();

        return sondages;

    } catch (e) {
        console.error(e);
        throw new Error(e as string);
    }
}