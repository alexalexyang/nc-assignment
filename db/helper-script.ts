import { getClient } from "./index";

const checkDb = async () => {
    const db = await getClient();

    // const flushRes = await db.flushDb()

    // const res = await db.set("test1", "test test")
    // console.log({ res })

    const entries = await db.keys("*")

    db.disconnect();

    console.log({ entries })
}

checkDb()