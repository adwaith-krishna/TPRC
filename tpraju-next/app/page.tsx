import { LandingPage } from "@/components/landing/LandingPage";
import { client } from "@/lib/sanity.client";

export default async function Home() {
  // 1. Fetch the clients from Sanity using GROQ
  // We fetch the _id, the name, and the logo image asset
  const clients = await client.fetch(`*[_type == "majorClient"]{
    _id,
    name,
    logo
  }`);

  // 2. Pass the data to the LandingPage component
  // We use "clients || []" to ensure it's always an array even if the CMS is empty
  return <LandingPage clients={clients || []} />;
}