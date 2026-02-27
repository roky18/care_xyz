"use server";

import { collections, dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

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

export async function getServiceById(serviceId) {
  try {
    if (!ObjectId.isValid(serviceId)) return null;

    const serviceCollection = dbConnect(collections.SERVICES);
    const service = await serviceCollection.findOne({
      _id: new ObjectId(serviceId),
    });

    if (!service) return null;

    return {
      ...service,
      _id: service._id.toString(),
    };
  } catch (error) {
    console.error("Error fetching service by id:", error);
    return null;
  }
}
