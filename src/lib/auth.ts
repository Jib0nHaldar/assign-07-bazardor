import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.MONGODB_URI as string);
const db = client.db("bazar-dor");

export const auth = betterAuth({
    trustedOrigins: ["http://localhost:3000", "http://localhost:3001", "https://assign-07-bazardor.vercel.app"],
    emailAndPassword: {
        enabled: true,
    },
    socialProviders: {
        google: {
            enabled: true,
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
        github: {
            enabled: true,
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        },
    },
    // secret: process.env.BETTER_AUTH_SECRET as string,
    // url: process.env.BETTER_AUTH_URL as string,

  database: mongodbAdapter(db, {
    client,
  }),
});