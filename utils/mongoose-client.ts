import mongoose from "mongoose"

const MONGO_URI = process.env.MONGO_URI
const MONGO_DB = process.env.MONGO_DB!

type MongooseCache = {
  conn?: typeof mongoose
  promise?: Promise<typeof mongoose>
}

declare global {
  var mongooseCache: MongooseCache | undefined
}

const cache = global.mongooseCache ?? (global.mongooseCache = {})

export async function connectMongoose() {
  if (!MONGO_URI) throw new Error("Missing MONGO_URI")
  if (!MONGO_DB) throw new Error("Missing MONGO_DB")

  if (cache.conn) return cache.conn

  if (!cache.promise) {
    const connectionString = MONGO_URI.includes("?")
      ? MONGO_URI
      : `${MONGO_URI}/${MONGO_DB}`

    cache.promise = mongoose.connect(connectionString, {
      dbName: MONGO_DB,
    })
  }

  try {
    cache.conn = await cache.promise
    return cache.conn
  } catch (error) {
    cache.promise = undefined

    if (
      error instanceof Error &&
      "code" in error &&
      (error as NodeJS.ErrnoException).code === "ECONNREFUSED" &&
      MONGO_URI.startsWith("mongodb+srv://")
    ) {
      throw new Error(
        "MongoDB SRV lookup failed. Your Atlas host could not be resolved from this machine. Check internet/DNS access, Atlas IP access rules, or replace MONGO_URI with a standard mongodb:// connection string.",
      )
    }

    throw error
  }
}
