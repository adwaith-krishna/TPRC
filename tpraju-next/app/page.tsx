import { LandingPage } from "@/components/landing/LandingPage";
import { client } from "@/lib/sanity.client";
import { Project, Product, GalleryItem, Client, Award } from "@/types/sanity";

export default async function Home() {
  const [clients, projects, gallery, products, awards] = await Promise.all([
    client.fetch(`*[_type == "majorClient"]{_id, name, logo}`),
    client.fetch(`*[_type == "project"] | order(_createdAt desc) {_id, title, category, description, image}`), 
    client.fetch(`*[_type == "galleryItem"] | order(_createdAt desc)`),
    client.fetch(`*[_type == "product"] {
  _id,
  title,
  "categoryName": category->name,     
  "categoryNumber": category->number, 
  subtitle,
  tag,
  image
} | order(categoryNumber asc)`),
    client.fetch(`*[_type == "award"] | order(year desc, _createdAt desc) {_id, title, issuer, year, badgeText, badgeType, image, isCertificate}`)
    ]) as [Client[], Project[], GalleryItem[], Product[], Award[]];

  return (
    <LandingPage 
      clients={clients || []} 
      projects={projects || []} 
      gallery={gallery || []}
      products={products || []}
      awards={awards || []}
    />
  );
}