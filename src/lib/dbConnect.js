const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.MONGODB_URI;
const dbName = process.env.DBNAME;

if (!uri) {
  throw new Error("Please add your MONGODB_URI to .env.local");
}

export const collections = {
  SERVICES: "services",
  USERS: "users",
  BOOKINGS: "bookings",
};
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const dbConnect = (cname) => {
  return client.db(dbName).collection(cname);
};
