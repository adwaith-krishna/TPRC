"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { CertificateModal } from "./CertificateModal";
import { ShareFloating } from "./ShareFloating";
import { AwardsSection } from "./AwardsSection";

import { urlFor } from "@/lib/sanity.image";
import { sendContactEmail } from "@/app/actions/contact";
import Lenis from "lenis";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

import { TPRCLoader } from "./LoadingScreen";
import { Project, Product, GalleryItem, Client } from "@/types/sanity";

const HERO_BG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCWASYnz6kODAfg1YQ7cNgUaCc6Qf64cMUfUHa-QNDn1FrMKLUdQdl3YTQHI8hCfUECTGZghv4-X3PzmTWa1V3QJOSi4ifkXFl9DBLxqsCjjWkGdPK2iQIFEFWmJ_Be1ygq8HgEgr-tk8-CPTuhtc4DjiKfL4OnIogfAvI4svCNTlMf5nNGIFUPaIUwtjhC0vjyHufhH0MTJwT3Z9r8iuUVLhjnrFHeJNJ3rsijo4Z820RAIbo4bSFdhdM--vU7TxWWDxHSErUfIfM7";

const ABOUT_IMG =
  "https://img.freepik.com/premium-photo/tall-building-with-crane-top-it_662214-417885.jpg";

const CERT1 =
  "https://img.freepik.com/free-vector/certificate-template-design_53876-59034.jpg";
const CERT2 =
  "https://img.freepik.com/free-vector/certificate-template-design_53876-59037.jpg";
const CERT3 =
  "https://img.freepik.com/free-vector/certificate-template-design_53876-59041.jpg";

// Fallback categories for when products are not available
const FALLBACK_CATEGORIES = [
  {
    id: "scaffolding",
    number: "01",
    name: "Scaffolding Materials",
    products: [
      {
        id: "p1",
        name: "Steel Pipes",
        subtitle: "40NB & 50NB Grade",
        tag: "Standard Size",
        image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "p2",
        name: "Walkway Boards",
        subtitle: "Galvanized Anti-Slip",
        tag: "Heavy Duty",
        image: "https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "p3",
        name: "Cuplock Standards",
        subtitle: "High Tensile Steel",
        tag: "Verticals",
        image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "p4",
        name: "Cuplock Ledgers",
        subtitle: "Horizontal Support",
        tag: "Horizontals",
        image: "https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "p5",
        name: "Joint Pins",
        subtitle: "Pipe Connection",
        tag: "Fittings",
        image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "p6",
        name: "Base Plates",
        subtitle: "Foundation Support",
        tag: "Base Setup",
        image: "https://images.unsplash.com/photo-1590650153855-d9e808231d41?auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  {
    id: "access",
    number: "02",
    name: "Access Equipment",
    products: [
      {
        id: "p7",
        name: "Step Ladders",
        subtitle: "Aluminum Alloy Grade",
        tag: "L-Type",
        image: "https://img.freepik.com/premium-photo/industrial-power-tool-worker-using-angle-grinder-with-sparks-flying_53876-130005.jpg?w=800"
      },
      {
        id: "p8",
        name: "Couplers & Fittings",
        subtitle: "Forged Right Angle",
        tag: "EN-74 Certified",
        image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "p9",
        name: "Base Jacks",
        subtitle: "Adjustable Support",
        tag: "Heavy Duty",
        image: "https://images.unsplash.com/photo-1590650153855-d9e808231d41?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "p10",
        name: "U-Head Jacks",
        subtitle: "Top Support",
        tag: "Adjustable",
        image: "https://img.freepik.com/free-photo/closeup-photo-worker-welding-metal-with-sparks-factory_181624-9122.jpg?w=800"
      },
      {
        id: "p11",
        name: "Mobile Towers",
        subtitle: "Aluminum Scaffolding",
        tag: "Rolling",
        image: "https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "p12",
        name: "Prop Jacks",
        subtitle: "Telescopic Steel",
        tag: "Supports",
        image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
      }
    ]
  }
];

// Helper function to transform Sanity products into categories
const transformProductsToCategories = (products: Product[]) => {
  if (!products || products.length === 0) {
    return FALLBACK_CATEGORIES;
  }

  // Group products by category
  const grouped = products.reduce((acc: Record<string, {
    id: string;
    number: string;
    name: string;
    products: {
      id: string;
      name: string;
      subtitle?: string;
      tag?: string;
      image: string;
    }[];
  }>, product: Product) => {
    const categoryKey = product.categoryName || "Uncategorized";
    if (!acc[categoryKey]) {
      acc[categoryKey] = {
        id: product.categoryName?.toLowerCase().replace(/\s+/g, '-') || "uncategorized",
        number: product.categoryNumber || "00",
        name: product.categoryName || "Uncategorized",
        products: []
      };
    }
    acc[categoryKey].products.push({
      id: product._id,
      name: product.title,
      subtitle: product.subtitle,
      tag: product.tag,
      image: product.image ? urlFor(product.image).url() : "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
    });
    return acc;
  }, {});

  return Object.values(grouped);
};

// Fallback gallery items for when no gallery data is available
const FALLBACK_GALLERY_ITEMS = [
  { id: 'g1', mediaType: 'image', src: "https://img.freepik.com/premium-photo/workers-ascending-metal-maze-realistic-depiction-scaffolding-climbing-candid-daily-wo_980716-109649.jpg?w=2000", gridClass: "col-span-2 md:col-span-2 row-span-2 md:row-span-2", title: "Scaffolding Installation" },
  { id: 'g2', mediaType: 'image', src: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80", gridClass: "col-span-2 md:col-span-2 row-span-1 md:row-span-1", title: "Project Overview" },
  { id: 'g3', mediaType: 'video', src: "https://www.w3schools.com/html/mov_bbb.mp4", gridClass: "col-span-1 md:col-span-1 row-span-1 md:row-span-1", title: "Work in Progress" },
  { id: 'g4', mediaType: 'image', src: "https://cdn.pixabay.com/photo/2023/09/14/09/07/scaffolding-8252585_960_720.jpg", gridClass: "col-span-1 md:col-span-1 row-span-1 md:row-span-1", title: "Safety Setup" },
  { id: 'g5', mediaType: 'image', src: "https://images.unsplash.com/photo-1590650153855-d9e808231d41?auto=format&fit=crop&w=900&q=80", gridClass: "col-span-1 md:col-span-1 row-span-2 md:row-span-2 hidden md:block", title: "Structural Work" },
  { id: 'g6', mediaType: 'video', src: "https://www.w3schools.com/html/movie.mp4", gridClass: "col-span-2 md:col-span-2 row-span-2 md:row-span-2", title: "On-Site Documentation" },
  { id: 'g7', mediaType: 'image', src: "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?auto=format&fit=crop&w=900&q=80", gridClass: "col-span-1 md:col-span-1 row-span-1 md:row-span-1", title: "Construction Details" },
  { id: 'g8', mediaType: 'image', src: "https://img.freepik.com/premium-photo/construction-workers-working-construction-site_891336-3566.jpg", gridClass: "col-span-1 md:col-span-1 row-span-1 md:row-span-1", title: "Team at Work" },
  { id: 'g9', mediaType: 'image', src: "https://images.unsplash.com/photo-1590650153855-d9e808231d41?auto=format&fit=crop&w=900&q=80", gridClass: "col-span-2 md:col-span-2 row-span-1 md:row-span-1 md:hidden", title: "Project Completion" },
];

// Helper function to transform Sanity gallery items
const transformGalleryItems = (galleryItems: GalleryItem[]): TransformedGalleryItem[] => {
  if (!galleryItems || galleryItems.length === 0) {
    return FALLBACK_GALLERY_ITEMS;
  }

  // Map through gallery items and optimize media
  return galleryItems.map((item: GalleryItem, index: number) => {
    let src = '';
    if (item.mediaType === 'image' && item.image) {
      src = urlFor(item.image)
        .width(800)
        .quality(80)
        .auto('format')
        .url();
    } else if (item.mediaType === 'video' && item.videoUrl) {
      src = item.videoUrl;
    }

    // Assign grid positions - make larger items for visual interest but keep it simple and scalable
    const gridClasses = [
      "col-span-1 md:col-span-1 row-span-1 md:row-span-2", // Tall item (on larger screens)
      "col-span-2 md:col-span-2 row-span-1 md:row-span-1", // Wide item
      "col-span-1 md:col-span-1 row-span-1 md:row-span-1", // Normal item
      "col-span-1 md:col-span-1 row-span-1 md:row-span-1", // Normal item
      "col-span-1 md:col-span-1 row-span-1 md:row-span-1", // Normal item
      "col-span-2 md:col-span-2 row-span-2 md:row-span-2", // Large item
      "col-span-1 md:col-span-1 row-span-1 md:row-span-1", // Normal item
      "col-span-1 md:col-span-1 row-span-1 md:row-span-1", // Normal item
      "col-span-1 md:col-span-1 row-span-1 md:row-span-1", // Normal item
      "col-span-1 md:col-span-1 row-span-1 md:row-span-1"  // Normal item
    ];

    return {
      id: item._id,
      mediaType: item.mediaType,
      src,
      gridClass: gridClasses[index % gridClasses.length],
      title: item.title || 'Gallery Item'
    };
  });
};

interface TransformedGalleryItem {
  id: string;
  mediaType: string;
  src: string;
  gridClass: string;
  title: string;
}

interface LandingPageProps {
  clients: Client[];
  projects: Project[];
  gallery: GalleryItem[];
  products: Product[];
}

export function LandingPage({ clients, projects, gallery, products }: LandingPageProps) {
  // Transform Sanity products into categories
  const categories = transformProductsToCategories(products);

  // Transform Sanity gallery items
  const galleryItems = transformGalleryItems(gallery);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const [activeTab, setActiveTab] = useState(categories[0]?.id || "");
  const [certSrc, setCertSrc] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const pausedSlidersRef = useRef(new Set<string>());
  const sliderStateRef = useRef<Record<string, number>>({ cat1: 0, cat2: 0 });



  const openCertificate = useCallback((src: string) => setCertSrc(src), []);
  const closeCertificate = useCallback(() => setCertSrc(null), []);

  useEffect(() => {
    // This matches the timing of your TPRCLoader (approx 3.2 seconds)
    const timer = setTimeout(() => setIsLoaded(true), 3200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const REVEAL_MS = reduceMotion ? 0 : 1050;
    const easeReveal = reduceMotion
      ? "linear"
      : "cubic-bezier(0.16, 1, 0.3, 1)";
    const easeBtn = reduceMotion
      ? "linear"
      : "cubic-bezier(0.32, 0.72, 0, 1)";

    const animatedElements = document.querySelectorAll(
      "section:not(.no-reveal), .group:not(.no-reveal), .glass:not(.no-reveal), .bg-white:not(.no-reveal), div.bg-background-light:not(.no-reveal), div.bg-background-dark:not(.no-reveal)"
    );

    const reveal = (h: HTMLElement) => {
      h.style.opacity = "1";
      h.style.transform = "translateY(0)";
      window.setTimeout(() => {
        h.style.removeProperty("will-change");
        h.style.removeProperty("transform");
        h.style.removeProperty("transition");
      }, REVEAL_MS + 100);
    };

    animatedElements.forEach((el) => {
      const h = el as HTMLElement;
      if (reduceMotion) {
        h.style.opacity = "1";
        h.style.transform = "none";
        return;
      }
      h.style.opacity = "0";
      h.style.transform = "translateY(28px)";
      h.style.transition = `opacity ${REVEAL_MS}ms ${easeReveal}, transform ${REVEAL_MS}ms ${easeReveal}`;
      h.style.willChange = "opacity, transform";
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal(entry.target as HTMLElement);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -6% 0px" }
    );

    animatedElements.forEach((el) => {
      if (!reduceMotion) observer.observe(el);
    });

    const onLoad = () => {
      animatedElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.92) {
          reveal(el as HTMLElement);
        }
      });
    };
    window.addEventListener("load", onLoad);

    const buttons = document.querySelectorAll("button");
    const btnHandlers: { el: HTMLElement; enter: () => void; leave: () => void }[] =
      [];
    if (!reduceMotion) {
      buttons.forEach((btn) => {
        const b = btn as HTMLElement;
        b.style.transition = `transform 0.48s ${easeBtn}`;
        const enter = () => {
          b.style.transform = "scale(1.03)";
        };
        const leave = () => {
          b.style.transform = "scale(1)";
        };
        b.addEventListener("mouseenter", enter);
        b.addEventListener("mouseleave", leave);
        btnHandlers.push({ el: b, enter, leave });
      });
    }

    return () => {
      window.removeEventListener("load", onLoad);
      observer.disconnect();
      btnHandlers.forEach(({ el, enter, leave }) => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
      });
    };
  }, []);



  useEffect(() => {
    const sliderIds = ["cat1", "cat2"];
    const scrollDelay = 3000;

    const autoScrollAll = () => {
      sliderIds.forEach((id) => {
        if (pausedSlidersRef.current.has(id)) return;
        const slider = document.getElementById(id);
        if (!slider) return;
        const items = slider.querySelectorAll(".product-item");
        if (!items.length) return;
        const totalItems = items.length;
        sliderStateRef.current[id] = (sliderStateRef.current[id] ?? 0) + 1;
        if (sliderStateRef.current[id] >= totalItems) {
          sliderStateRef.current[id] = 0;
        }
        const itemWidth = (items[0] as HTMLElement).offsetWidth;
        slider.scrollTo({
          left: sliderStateRef.current[id] * itemWidth,
          behavior: "smooth",
        });
      });
    };

    const syncInterval = setInterval(autoScrollAll, scrollDelay);
    return () => clearInterval(syncInterval);
  }, []);

  const onMessageInput = () => {
    const ta = messageRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = `${ta.scrollHeight}px`;
  };

  useEffect(() => {
    const handleScroll = () => {
      const wrappers = document.querySelectorAll(".project-card-wrapper");

      const progresses = Array.from(wrappers).map((wrapper, i) => {
        const stickPoint = 100 + i * 40;
        const distance = wrapper.getBoundingClientRect().top - stickPoint;
        const trackingDist = window.innerHeight * 0.8;
        if (distance <= 0) return 1;
        if (distance >= trackingDist) return 0;
        return 1 - (distance / trackingDist);
      });

      wrappers.forEach((wrapper, i) => {
        const inner = wrapper.querySelector(".project-card-inner") as HTMLElement;
        if (!inner) return;

        let totalProgress = 0;
        for (let j = i + 1; j < wrappers.length; j++) {
          totalProgress += progresses[j];
        }

        const wrapperEl = wrapper as HTMLElement;
        wrapperEl.style.visibility = "visible";
        wrapperEl.style.pointerEvents = "auto";
        wrapperEl.style.opacity = "1";

        const scale = Math.max(0.7, 1 - totalProgress * 0.05);
        inner.style.transform = `scale(${scale})`;

        const tintOverlay = inner.querySelector(".tint-overlay") as HTMLElement;
        if (tintOverlay) {
          const tint = Math.min(0.8, totalProgress * 0.25);
          tintOverlay.style.opacity = tint.toString();
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [projects]);

  return (
    <>
      <TPRCLoader />
      {/* Only render the share button once isLoaded is true */}
      {isLoaded && <ShareFloating />}

      <header className="sticky top-0 z-50 w-full border-b border-gray-200/50 dark:border-gray-800/50 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md transition-[background-color,backdrop-filter,border-color] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-20 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-8 bg-primary rounded flex items-center justify-center text-charcoal">
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 4H17.3334V17.3334H30.6666V30.6666H44V44H4V4Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <div className="text-lg md:text-xl font-extrabold tracking-tight text-charcoal dark:text-white leading-none">
              TP RAJU{" "}
              <span className="hidden sm:inline font-normal text-gray-500">Engineering</span>
            </div>
          </div>
          <nav className="hidden lg:flex items-center gap-10">
            <a
              className="text-sm font-semibold hover:text-primary transition-colors"
              href="#"
            >
              Home
            </a>
            <a
              className="text-sm font-semibold hover:text-primary transition-colors"
              href="#"
            >
              About
            </a>
            <a
              className="text-sm font-semibold hover:text-primary transition-colors"
              href="#"
            >
              Major Clients
            </a>
            <a
              className="text-sm font-semibold hover:text-primary transition-colors"
              href="#"
            >
              Projects
            </a>
            <a
              className="text-sm font-semibold hover:text-primary transition-colors"
              href="#"
            >
              Products
            </a>
            {/* <a
              className="text-sm font-semibold hover:text-primary transition-colors"
              href="#"
            >
              Gallery
            </a> */}
          </nav>
          <button
            type="button"
            className="bg-primary hover:opacity-90 text-charcoal px-4 md:px-5 py-2 rounded-full font-bold text-xs md:text-sm whitespace-nowrap shadow-sm transition-all"
          >
            Contact Us
          </button>
        </div>
      </header>

      <main className="max-w-[1440px] mx-auto">
        <section className="px-6 md:px-16 lg:px-24 pt-10 lg:pt-16 pb-16 lg:pb-24 grid lg:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col gap-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full text-primary premium-label">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              ISO 9001:2015 Certified
            </div>
            <h1 className="text-4xl md:text-7xl premium-heading text-charcoal dark:text-white">
              Leaders in Scaffolding &amp; Industrial{" "}
              <span className="text-primary italic">Engineering</span> Services
            </h1>
            <p className="text-lg md:text-xl premium-body max-w-xl">
              Premium enterprise-level scaffolding solutions for refineries,
              chemical plants, and power sectors. Built on precision, safety,
              and 8+ years of excellence.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                type="button"
                className="bg-primary hover:opacity-90 text-charcoal px-8 py-4 rounded-full font-bold text-base shadow-lg shadow-primary/20 transition-all flex items-center gap-2"
              >
                Contact Us{" "}
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
              <button
                type="button"
                className="border-2 border-charcoal/10 dark:border-white/10 hover:bg-charcoal hover:text-white dark:hover:bg-white dark:hover:text-charcoal px-8 py-4 rounded-full font-bold text-base transition-all"
              >
                View Products
              </button>
            </div>
          </div>
          <div className="relative">
            <div
              className="w-full aspect-[4/5] md:aspect-square bg-center bg-cover rounded-xl shadow-2xl"
              style={{ backgroundImage: `url("${HERO_BG}")` }}
            />
            <div className="absolute inset-0 hidden xl:block pointer-events-none">
              <div className="absolute top-[20%] -left-8">
                <div className="glass p-6 h-[100px] rounded-2xl shadow-2xl border border-white/20 flex items-center gap-4 min-w-[220px] backdrop-blur-xl">
                  <div className="size-12 rounded-lg bg-primary text-charcoal flex items-center justify-center shadow-md">
                    <span className="material-symbols-outlined">engineering</span>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-charcoal dark:text-white">
                      8+
                    </p>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                      Years Exp
                    </p>
                  </div>
                </div>
              </div>
              <div className="absolute top-[50%] -translate-y-1/2 -right-8">
                <div className="glass p-6 h-[100px] rounded-2xl shadow-2xl border border-white/20 flex items-center gap-4 min-w-[220px] backdrop-blur-xl">
                  <div className="size-12 rounded-lg bg-primary text-charcoal flex items-center justify-center shadow-md">
                    <span className="material-symbols-outlined">checklist</span>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-charcoal dark:text-white">
                      500+
                    </p>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                      Projects
                    </p>
                  </div>
                </div>
              </div>
              <div className="absolute top-[56%] -left-8">
                <div className="glass p-6 h-[100px] rounded-2xl shadow-2xl border border-white/20 flex items-center gap-4 min-w-[220px] backdrop-blur-xl">
                  <div className="size-12 rounded-lg bg-primary text-charcoal flex items-center justify-center shadow-md">
                    <span className="material-symbols-outlined">groups</span>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-charcoal dark:text-white">
                      200+
                    </p>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                      Clients
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="px-6 md:px-16 lg:px-24 py-16 md:py-24 lg:py-32 bg-white dark:bg-zinc-900/50 rounded-2xl relative overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div
              className="hidden lg:block w-full aspect-[4/5] bg-center bg-cover rounded-2xl shadow-2xl"
              style={{ backgroundImage: `url("${ABOUT_IMG}")` }}
            />
            <div className="flex flex-col gap-6">
              <span className="text-primary premium-label">
                About TP Raju Engineering Contractor
              </span>
              <h2 className="text-3xl md:text-5xl premium-heading">
                Building Industrial Safety &amp; Engineering Excellence
              </h2>
              <p className="text-lg premium-body">
                TP Raju Engineering Contractor is a trusted name in scaffolding
                rental and industrial engineering services, delivering safe and
                reliable solutions for refineries, chemical plants, power plants
                and heavy industries across India.
              </p>
              <p className="premium-body">
                Since our establishment, we have focused on quality
                workmanship, modern equipment, and strict safety compliance. Our
                experienced workforce and engineering team ensure every project
                is executed efficiently and on schedule.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mt-6">
                <div className="bg-background-light dark:bg-background-dark p-6 rounded-xl">
                  <h4 className="text-4xl font-bold text-primary mb-2">8+</h4>
                  <p className="text-sm uppercase text-gray-500 font-bold">
                    Years of Experience
                  </p>
                </div>
                <div className="bg-background-light dark:bg-background-dark p-6 rounded-xl">
                  <h4 className="text-4xl font-bold text-primary mb-2">500+</h4>
                  <p className="text-sm uppercase text-gray-500 font-bold">
                    Projects Completed
                  </p>
                </div>
                <div className="bg-background-light dark:bg-background-dark p-6 rounded-xl">
                  <h4 className="text-4xl font-bold text-primary mb-2">200+</h4>
                  <p className="text-sm uppercase text-gray-500 font-bold">
                    Satisfied Clients
                  </p>
                </div>
                <div className="bg-background-light dark:bg-background-dark p-6 rounded-xl">
                  <h4 className="text-4xl font-bold text-primary mb-2">ISO</h4>
                  <p className="text-sm uppercase text-gray-500 font-bold">
                    9001:2015 Certified
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats section removed to prevent duplication as it's already in the About grid above */}

        <section className="px-6 md:px-16 lg:px-24 py-24 lg:py-32 bg-white dark:bg-zinc-900/50 rounded-2xl">
          <div className="text-center mb-16">
            <span className="text-primary premium-label">
              Trusted By Industry Leaders
            </span>
            <h2 className="text-4xl md:text-5xl premium-heading mt-2 mb-4">Our Major Clients</h2>
            <p className="premium-body max-w-xl mx-auto">
              We are proud to collaborate with some of India&apos;s most
              respected infrastructure, energy, and industrial organizations.
            </p>
          </div>
          <div className="relative overflow-hidden premium-scroll-mask">
            <div
              className="flex animate-scroll hover:pause gap-8 w-max py-4"
              style={{ animationDuration: `${(clients?.length || 5) * 4}s` }}
            >
              {[1, 2].map((loop) => (
                <div key={loop} className="flex gap-8">
                  {clients?.map((client: Client) => (
                    <div
                      key={`${loop}-${client._id}`}
                      className="group p-4 md:p-8 rounded-xl flex flex-col items-center justify-center gap-2 transition-all flex-shrink-0 w-32 md:w-40"
                    >
                      <img
                        src={urlFor(client.logo)
                          .height(48)
                          .fit('max')
                          .auto('format')
                          .quality(80)
                          .url()}
                        alt={client.name}
                        className="h-12 w-auto object-contain grayscale group-hover:grayscale-0 transition-all"
                      />
                      <p className="font-bold text-sm text-center">{client.name}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        <div id="projects-stack-container" className="relative pt-24 pb-0 bg-white dark:bg-zinc-900/50 no-reveal">
          <div className="px-6 md:px-16 lg:px-24 mb-16 shrink-0 text-center">
            <h2 className="text-3xl md:text-5xl font-serif font-bold tracking-tight mb-2">
              Featured Projects
            </h2>
            <p className="text-gray-500 font-sans uppercase tracking-widest text-sm font-bold">
              Industry standard excellence
            </p>
          </div>
          <div
            className="flex flex-col gap-12 px-6 md:px-16 lg:px-24"
            style={{ paddingBottom: projects ? `${(projects.length - 1) * 40}px` : '0px' }}
          >
            {projects?.map((project: Project, index: number) => {
              return (
                <div
                  key={project._id}
                  className="project-card-wrapper sticky origin-top w-full max-w-4xl mx-auto px-2 md:px-0"
                  style={{ top: '80px', zIndex: index + 1 }}
                >
                  <div className="project-card-inner group relative overflow-hidden rounded-[2rem] shadow-[0_-8px_30px_rgba(0,0,0,0.12)] border border-gray-100/50 dark:border-gray-700/50 aspect-[16/9] md:aspect-[16/9] bg-white dark:bg-zinc-800 origin-top">
                    <div className="absolute inset-0 bg-black pointer-events-none z-30 tint-overlay" style={{ opacity: 0 }} />
                    <div className="absolute inset-0 bg-charcoal/40 group-hover:bg-charcoal/20 transition-[background-color,opacity] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] z-10" />
                    <div
                      className="w-full h-full bg-center bg-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.06]"
                      style={{ backgroundImage: `url("${urlFor(project.image).url()}")` }}
                    />

                    <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-charcoal/60 to-transparent z-10 pointer-events-none" />

                    <div className="absolute bottom-0 left-0 p-8 md:p-12 z-20 w-full bg-gradient-to-t from-charcoal/90 to-transparent">
                      <span className="bg-primary text-charcoal px-5 py-1.5 rounded-full text-xs font-bold tracking-wide mb-4 inline-block shadow-lg">
                        {project.category}
                      </span>
                      <h3 className="text-white text-3xl md:text-5xl font-serif tracking-tight mb-3">
                        {project.title}
                      </h3>
                      <p className="text-white/80 md:text-lg max-w-2xl leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>





        <section className="relative z-10 px-6 md:px-16 lg:px-24 py-24 lg:py-32 bg-[#fafafa]">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">Industrial Hardware Store</h2>
            <p className="premium-body max-w-xl mx-auto">We supply premium grade Cuplock systems, pipes, and scaffolding components certified for heavy-duty industrial use.</p>
          </div>

          <div className="flex flex-col items-center gap-16">
            {/* <!-- Centered Pill Tabs (Top) --> */}
            <div className="w-full flex justify-center px-4">
              <div className="flex flex-wrap justify-center gap-2 w-full md:w-auto bg-charcoal dark:bg-black p-1 rounded-3xl md:rounded-full shadow-lg border border-white/5">
                {categories.map((category) => {
                  const isActive = activeTab === category.id;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setActiveTab(category.id)}
                      className={`group relative w-[calc(50%-0.25rem)] md:w-auto flex items-center justify-center gap-1.5 px-2 sm:px-5 md:px-7 py-2.5 md:py-2.5 rounded-full transition-all duration-500 font-sans font-medium text-sm md:text-base whitespace-nowrap ${isActive
                        ? 'bg-white text-charcoal shadow-sm border-2 border-black'
                        : 'text-white/50 hover:text-white/80'
                        }`}
                    >
                      <span>{category.name}</span>
                      <span className={`text-[9px] md:text-[10px] font-bold self-start mt-0.5 ${isActive ? 'text-charcoal/40' : 'text-white/20'}`}>
                        {category.number}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* <!-- Product Cards Carousel (Below) - Conditional Auto Scroll --> */}
            <div className="w-full relative overflow-hidden premium-scroll-mask flex items-center min-h-[400px]">
              {(() => {
                const activeCategory = categories.find(c => c.id === activeTab);
                const products = activeCategory?.products || [];
                const shouldScroll = products.length > 4;

                if (!shouldScroll) {
                  return (
                    <div className="flex flex-wrap justify-center gap-8 w-full py-4">
                      {products.map((product: any) => (
                        <div
                          key={product.id}
                          className="w-[220px] md:w-[260px] bg-white dark:bg-zinc-800 p-5 rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.03)] border border-gray-100 dark:border-zinc-700 flex flex-col transition-all duration-300 hover:scale-[1.03] hover:shadow-xl relative"
                        >
                          <div className="bg-gray-50 dark:bg-zinc-900 rounded-xl h-[180px] flex items-center justify-center mb-6 overflow-hidden border border-gray-100 dark:border-zinc-800">
                            <img
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              alt={product.name}
                              src={product.image}
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-charcoal dark:text-white text-base leading-snug mb-1">{product.name}</h4>
                            <p className="text-gray-500 text-sm mb-4 leading-relaxed">{product.subtitle}</p>
                          </div>
                          <div className="mt-auto pt-4 border-t border-gray-50 dark:border-zinc-700 flex items-center justify-between">
                            <span className="text-primary font-bold text-[10px] tracking-wider uppercase">{product.tag}</span>
                            <span className="material-symbols-outlined text-gray-300 text-sm">inventory_2</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                }

                return (
                  <div
                    className="flex animate-scroll-reverse hover:pause gap-8 w-max"
                    style={{ animationDuration: `${Math.max(products.length * 6, 12)}s` }}
                  >
                    {[1, 2].map((loop) => (
                      <div key={loop} className="flex gap-8">
                        {products.map((product: any) => (
                          <div
                            key={`${loop}-${product.id}`}
                            className="w-[220px] md:w-[260px] bg-white dark:bg-zinc-800 p-5 rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.03)] border border-gray-100 dark:border-zinc-700 flex flex-col shrink-0 transition-all duration-300 hover:scale-[1.03] hover:shadow-xl hover:z-20 relative"
                          >
                            <div className="bg-gray-50 dark:bg-zinc-900 rounded-xl h-[180px] flex items-center justify-center mb-6 overflow-hidden border border-gray-100 dark:border-zinc-800">
                              <img
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                alt={product.name}
                                src={product.image}
                              />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-bold text-charcoal dark:text-white text-base leading-snug mb-1">{product.name}</h4>
                              <p className="text-gray-500 text-sm mb-4 leading-relaxed">{product.subtitle}</p>
                            </div>
                            <div className="mt-auto pt-4 border-t border-gray-50 dark:border-zinc-700 flex items-center justify-between">
                              <span className="text-primary font-bold text-[10px] tracking-wider uppercase">{product.tag}</span>
                              <span className="material-symbols-outlined text-gray-300 text-sm">inventory_2</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                );
              })()}
            </div>
          </div>
        </section>
        {/* ----------------------------------------------------------product end-------------------------------- */}

        <section className="px-6 md:px-16 lg:px-24 py-16 md:py-24 lg:py-32 bg-white dark:bg-zinc-900/50 rounded-2xl">
          <div className="text-center mb-12 md:mb-16">
            <span className="text-primary font-sans uppercase tracking-[0.2em] text-[10px] md:text-sm font-bold">
              Project Gallery
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold mt-2 mb-4">Inside Our Worksites</h2>
            <p className="premium-body max-w-xl mx-auto pb-4 text-sm md:text-base">
              A glimpse of our scaffolding systems, industrial maintenance, and
              large-scale engineering operations across India.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 auto-rows-[120px] md:auto-rows-[200px] gap-2 md:gap-4 grid-flow-dense">
            {galleryItems.slice(0, 10).map((item: TransformedGalleryItem) =>
              item.mediaType === 'video' ? (
                <div key={item.id} className={`group relative overflow-hidden rounded-lg transition-all duration-500 hover:scale-105 ${item.gridClass}`}>
                  <video
                    src={item.src}
                    className="w-full h-full object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.06] block"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                  <div className="absolute inset-0 bg-charcoal/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] pointer-events-none" />
                </div>
              ) : (
                <GalleryImage key={item.id} src={item.src} className={item.gridClass} />
              )
            )}
          </div>
        </section>

        {/* 
        <section className="px-6 md:px-20 py-10 lg:py-28 bg-background-light dark:bg-background-dark">
          <div className="text-center mb-16">
            <span className="text-primary font-bold uppercase tracking-widest text-xs">
              Our Achievements
            </span>
            <h2 className="text-4xl font-serif mt-2 mb-4">
              Certifications &amp; Industry Recognition
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto lg:py-2">
              Over the years, TP Raju Engineering Contractor has received
              multiple recognitions for safety, quality workmanship, and
              engineering excellence.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            <AchievementCard
              certSrc={CERT1}
              icon="workspace_premium"
              title="ISO 9001:2015 Certification"
              body="Certified for maintaining international quality management standards in industrial engineering and scaffolding services."
              tag="Quality Certification"
              onOpen={openCertificate}
            />
            <AchievementCard
              certSrc={CERT2}
              icon="verified"
              title="Safety Excellence Award"
              body="Recognized for maintaining exceptional safety standards across multiple refinery and industrial maintenance projects."
              tag="Industrial Safety"
              onOpen={openCertificate}
            />
            <AchievementCard
              certSrc={CERT3}
              icon="engineering"
              title="Engineering Excellence"
              body="Honored for delivering large-scale industrial scaffolding and mechanical engineering projects across India."
              tag="Engineering Recognition"
              onOpen={openCertificate}
            />
          </div>
        </section>
        */}

        <AwardsSection onOpenCertificate={openCertificate} />

        {/* <!-- Testimonials --> */}
        <section className="px-6 md:px-16 lg:px-24 py-24 lg:py-32 bg-white dark:bg-zinc-900/50 rounded-2xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-3">Client Feedback</h2>
            {/* <!--  <div className="flex justify-center gap-1 text-primary">
              <span className="material-symbols-outlined">star</span>
              <span className="material-symbols-outlined">star</span>
              <span className="material-symbols-outlined">star</span>
              <span className="material-symbols-outlined">star</span>
              <span className="material-symbols-outlined">star</span>
            </div>   --> */}
          </div>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="bg-background-light dark:bg-background-dark p-8 rounded-2xl relative">
              <p className="italic premium-body mb-6">
                <span className="text-primary font-serif text-lg">&quot; </span>
                Their commitment to safety is unparalleled. In our refinery expansion, TP Raju Engineering completed 20,000 man-hours without a single incident.
                <span className="text-primary font-serif text-lg">&quot;</span>
              </p>
              <div>
                <p className="font-serif">Ramesh Kumar</p>
                <p className="premium-label text-gray-400">Safety Head, HPCL</p>
              </div>
            </div>

            <div className="bg-background-light dark:bg-background-dark p-8 rounded-2xl relative">
              <p className="italic text-gray-600 dark:text-gray-300 mb-6">
                <span className="text-primary font-serif text-lg">&quot; </span>
                Excellent material quality and prompt delivery. Their fabrication work for our chemical reactor housing was precise and handled with great care.
                <span className="text-primary font-serif text-lg">&quot;</span>
              </p>
              <div>
                <p className="font-serif">S. Venkatesh</p>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Project Manager, L&amp;T</p>
              </div>
            </div>

            <div className="bg-background-light dark:bg-background-dark p-8 rounded-2xl relative">
              <p className="italic text-gray-600 dark:text-gray-300 mb-6">
                <span className="text-primary font-serif text-lg">&quot; </span>
                The rental service is highly efficient. They provided us with specialized cantilever scaffolding that solved a major accessibility challenge.
                <span className="text-primary font-serif text-lg">&quot;</span>
              </p>
              <div>
                <p className="font-serif">David Miller</p>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Site Engineer, Petrofac</p>
              </div>
            </div>

          </div>
        </section>


        <section className="mx-6 md:mx-16 lg:mx-24 my-24 lg:my-32 px-6 md:px-16 lg:px-24 py-24 lg:py-32 bg-black text-white overflow-hidden relative rounded-2xl">
          <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-20 items-start">
            <div className="relative">
              <h2 className="contact-title text-[52px] md:text-[110px] leading-[0.9] font-serif font-bold tracking-tight">
                LET&apos;S <br />
                GET IN <br />
                TOUCH
              </h2>
              <div className="contact-circle" />
            </div>
            <div className="flex flex-col gap-12">
              <form
                id="contactForm"
                className="space-y-12"
                action={async (formData) => {
                  const result = await sendContactEmail(formData);
                  if (result.success) {
                    alert("Thank you — we will get back to you shortly.");
                    (document.getElementById("contactForm") as HTMLFormElement).reset();
                  } else {
                    alert("Something went wrong. Please try again.");
                  }
                }}
              >
                <div className="form-group">
                  <label htmlFor="fullName">FULL NAME</label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-12">
                  <div className="form-group">
                    <label htmlFor="email">EMAIL</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@email.com"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">PHONE</label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+91 0000000000"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={12}
                      onInput={(e) => {
                        const t = e.currentTarget;
                        t.value = t.value.replace(/[^0-9]/g, "");
                      }}
                    />
                  </div>
                </div>
                <div className="form-group message-group">
                  <label htmlFor="messageBox">MESSAGE</label>
                  <textarea
                    ref={messageRef}
                    id="messageBox"
                    name="messageBox"
                    placeholder="Tell us about your project..."
                    rows={1}
                    onInput={onMessageInput}
                  />
                </div>
                <div className="submit-container">
                  <button type="submit" className="submit-btn">
                    <span className="material-symbols-outlined">
                      arrow_forward
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer id="footer" className="bg-charcoal dark:bg-black text-gray-400 py-20 border-t border-white/5">
        <div className="max-w-[1440px] mx-auto px-6 md:px-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <div className="size-8 bg-primary rounded flex items-center justify-center text-charcoal">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 48 48"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 4H17.3334V17.3334H30.6666V30.6666H44V44H4V4Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <h2 className="text-xl font-extrabold tracking-tight text-white">
                  TP RAJU
                </h2>
              </div>
              <p className="text-sm premium-body">
                Providing high-end scaffolding and engineering services across
                India since 2008. Precision, reliability, and safety are the
                core of our operations.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-xs">
                Quick Links
              </h4>
              <ul className="flex flex-col gap-4 text-sm">
                <li>
                  <a className="hover:text-primary transition-colors" href="#">
                    About Company
                  </a>
                </li>
                <li>
                  <a className="hover:text-primary transition-colors" href="#">
                    Our Services
                  </a>
                </li>
                <li>
                  <a className="hover:text-primary transition-colors" href="#">
                    Product Catalogue
                  </a>
                </li>
                <li>
                  <a className="hover:text-primary transition-colors" href="#">
                    Safety Standards
                  </a>
                </li>
                <li>
                  <a className="hover:text-primary transition-colors" href="#">
                    Latest Projects
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-xs">
                Services
              </h4>
              <ul className="flex flex-col gap-4 text-sm">
                <li>
                  <a className="hover:text-primary transition-colors" href="#">
                    Scaffolding Rental
                  </a>
                </li>
                <li>
                  <a className="hover:text-primary transition-colors" href="#">
                    Erection Services
                  </a>
                </li>
                <li>
                  <a className="hover:text-primary transition-colors" href="#">
                    Mechanical Work
                  </a>
                </li>
                <li>
                  <a className="hover:text-primary transition-colors" href="#">
                    Thermal Insulation
                  </a>
                </li>
                <li>
                  <a className="hover:text-primary transition-colors" href="#">
                    Steel Fabrication
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-xs">
                Contact Us
              </h4>
              <ul className="flex flex-col gap-6 text-sm">
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary shrink-0 mt-0.5">
                    location_on
                  </span>
                  <div className="flex flex-col gap-1">
                    <span>16/313A, TPR Business Plaza building</span>
                    <span>Near BPCL-KR, Ambalamugal P.O.,</span>
                    <span>Ernakulam 682302</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary shrink-0 mt-0.5">
                    mail
                  </span>
                  <a href="mailto:tprconstructions2020@gmail.com" className="hover:text-white transition-colors break-all">
                    tprconstructions2020@gmail.com
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary shrink-0 mt-0.5">
                    phone
                  </span>
                  <div className="flex flex-col gap-1">
                    <a href="tel:+919447590954" className="hover:text-white transition-colors">+91 9447590954</a>
                    <a href="tel:+919744170465" className="hover:text-white transition-colors">+91 9744170465</a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary shrink-0 mt-0.5 w-6 h-6"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                  <a href="https://www.instagram.com/tprconstructions/?hl=en" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                    tprconstructions
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-xs">
              © 2023 TP Raju Engineering Contractor. All rights reserved.
            </p>
            <div className="flex gap-8">
              <a className="text-xs hover:text-white transition-colors" href="#">
                Privacy Policy
              </a>
              <a className="text-xs hover:text-white transition-colors" href="#">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>

      <CertificateModal src={certSrc} onClose={closeCertificate} />
    </>
  );
}

function GalleryImage({ src, className = "" }: { src: string; className?: string }) {
  return (
    <div className={`group relative overflow-hidden rounded-lg transition-all duration-500 hover:scale-105 ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.06] block"
      />
      <div className="absolute inset-0 bg-charcoal/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] pointer-events-none" />
    </div>
  );
}

function AchievementCard({
  certSrc,
  icon,
  title,
  body,
  tag,
  onOpen,
}: {
  certSrc: string;
  icon: string;
  title: string;
  body: string;
  tag: string;
  onOpen: (src: string) => void;
}) {
  return (
    <div className="achievement-card group glass rounded-2xl shadow-xl overflow-hidden">
      <div className="relative overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={certSrc}
          alt=""
          className="certificate-img w-full h-[260px] object-cover cursor-pointer"
          onClick={() => onOpen(certSrc)}
        />
        <div className="certificate-overlay">
          <div
            className="overlay-content cursor-pointer"
            onClick={() => onOpen(certSrc)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onOpen(certSrc);
              }
            }}
            role="button"
            tabIndex={0}
          >
            <span className="material-symbols-outlined text-primary text-4xl">
              {icon}
            </span>
            <p className="text-white font-bold text-sm uppercase tracking-widest mt-2">
              View Certificate
            </p>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center gap-3 mb-3">
          <span className="material-symbols-outlined text-primary text-3xl">
            {icon}
          </span>
          <h3 className="text-xl font-bold">{title}</h3>
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-sm">{body}</p>
        <div className="mt-4 text-xs uppercase text-gray-500 font-bold tracking-widest">
          {tag}
        </div>
      </div>
    </div>
  );
}
