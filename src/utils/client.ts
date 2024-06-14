import { Client, Databases } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID)

export const databases = new Databases(client);
export const databaseId = import.meta.env.VITE_APPWRITE_DATABASE_ID;
export const collectionId = import.meta.env.VITE_APPWRITE_COLLECTION_ID;