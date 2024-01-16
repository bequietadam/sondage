import clientPromise from "./mongodb";
import { ObjectId } from "mongodb";


export async function getSondages() {
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




export async function getSondage(id?: string) {
    try {
        const client = await clientPromise;
        const db = client.db("sondages");
        const sondage = await db.collection("sondages").findOne({
            // _id: ObjectId(id),
            _id: new ObjectId(id),
        });


        return sondage;
    } catch (e) {
        console.error(e);
        throw new Error(e as string);
    }
};

