import { LandingPage } from "@/components/landing/LandingPage";
import { client } from "@/lib/sanity.client";
import { Project, Product, GalleryItem, Client, Award, ClientFeedback } from "@/types/sanity";

export const revalidate = 3600;

export default async function Home() {
  const [clients, projects, gallery, products, awards, testimonials] = await Promise.all([
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
    client.fetch(`*[_type == "award"] | order(year desc, _createdAt desc) {_id, title, issuer, year, badgeText, badgeType, image, isCertificate}`),
    client.fetch(`*[_type == "clientFeedback"] | order(_createdAt desc) {_id, feedback, name, designation, company}`)
    ]) as [Client[], Project[], GalleryItem[], Product[], Award[], ClientFeedback[]];

  return (
    <LandingPage 
      clients={clients || []} 
      projects={projects || []} 
      gallery={gallery || []}
      products={products || []}
      awards={awards || []}
      testimonials={testimonials || []}
    />
  );
}