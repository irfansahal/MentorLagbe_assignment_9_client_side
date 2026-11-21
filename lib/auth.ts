import { betterAuth,  string } from "better-auth";
import { MongoClient } from "mongodb"
import { mongodbAdapter } from "@better-auth/mongo-adapter"
import { jwt } from "better-auth/plugins"

const client = new MongoClient(process.env.BETTER_AUTH_DB_URI as string)
const db = client.db("MentorLagbeDB")

export const auth = betterAuth({
  //...
   database: mongodbAdapter(db, {
    client,
  }),
     plugins: [
        jwt(), 
    ],
    user : {
      additionalFields: {
         role: {
        type: ["tutor", "student", "admin"],
        input: true, // don't allow user to set role
      },   
      subscription : {
         type : "string",
          required: false,
        defaultValue: "en", 
      }

      }
    },
   emailAndPassword: { 
    enabled: true, 
  }, 
});