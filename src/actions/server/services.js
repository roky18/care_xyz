"use server";

import { collections, dbConnect } from "@/lib/dbConnect";

export async function getAllServices() {
  try {
    const serviceCollection = dbConnect(collections.SERVICES);
    const data = await serviceCollection.find({}).toArray();

    
    return data.map(service => ({
      ...service,
      _id: service._id.toString()
    }));
  } catch (error) {
    console.error("Error fetching all services:", error);
    return [];
  }
}