import { getClient } from "./index";

enum Action {
    "FLUSH",
    "GET_KEYS",
    "SET"
}

const checkDb = async (action: Action) => {
    const db = await getClient();

    switch (action) {
        case Action.FLUSH:
            console.log("Flushing db")
            const resFlush = await db.flushDb()
            console.log({ resFlush })
            break;

        case Action.GET_KEYS:
            console.log("Getting all keys")
            const keys = await db.keys("*")
            console.log({ keys })
            break;

        case Action.SET:
            console.log("Setting key: test1, value: test test")
            const res = await db.set("test1", "test test")
            console.log({ res })
            break;

        default:
            break;
    }

    db.disconnect();
}

checkDb(Action.FLUSH)

// checkDb(Action.GET_KEYS)

// checkDb(Action.SET)
