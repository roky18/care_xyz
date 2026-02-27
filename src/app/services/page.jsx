import { getAllServices } from "@/actions/server/services";
import Services from "@/components/Services";


export default async function ServicesPage() {
  const services = await getAllServices(); 

  return <Services services={services ?? []} />;
}