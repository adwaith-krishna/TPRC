"use client";

import { useRef } from "react";

const CERT1 = "https://img.freepik.com/free-vector/certificate-template-design_53876-59034.jpg";
const CERT2 = "https://img.freepik.com/free-vector/certificate-template-design_53876-59037.jpg";
const TROPHY_CUP = "https://img.freepik.com/free-photo/champion-gold-cup-trophy-white-background-3d-rendering_460848-10332.jpg";
const TROPHY_STAR = "https://img.freepik.com/premium-photo/golden-star-award-with-black-base-it_940464-32536.jpg";

interface AwardsSectionProps {
  onOpenCertificate: (src: string) => void;
}

export function AwardsSection({ onOpenCertificate }: AwardsSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: -320, behavior: 'smooth' });
  };
  const scrollRight = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: 320, behavior: 'smooth' });
  };

  return (
    <section className="px-6 md:px-20 py-20 bg-[#fafafa]">
      {/* Title Section */}
      <div className="text-center mb-16 flex flex-col items-center">
        <div className="flex items-center gap-3 mb-4 text-[var(--color-award-gold)]">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
             {/* Simple laurel wreath icon placeholder */}
             <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
             <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
          </svg>
          <span className="font-bold uppercase tracking-widest text-xs">OUR ACHIEVEMENTS</span>
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
             <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
             <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
          </svg>
        </div>
        <h2 className="text-5xl md:text-[64px] font-serif text-[#1a1a1a] leading-[1.1] mb-6 tracking-tight">
          Recognition That <br /> Inspires <span className="text-[var(--color-award-gold)] italic">Excellence</span>
        </h2>
        <p className="text-gray-500 max-w-xl mx-auto text-[15px] leading-relaxed">
          A collection of our certifications, trophies and recognitions that reflect our commitment to quality and excellence.
        </p>
      </div>

      {/* Top Stats Row */}
      <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.03)] mb-20 py-8 px-4 grid grid-cols-2 lg:grid-cols-4 border border-gray-50 relative overflow-hidden">
        <div className="flex flex-col items-center text-center p-6 border-b lg:border-b-0 lg:border-r border-gray-100 last:border-0 relative">
          <span className="material-symbols-outlined text-4xl mb-4 text-[#1a1a1a]">workspace_premium</span>
          <h3 className="text-4xl font-bold text-[#1a1a1a] mb-2">12+</h3>
          <p className="font-bold text-sm text-[#1a1a1a]">Certifications</p>
          <p className="text-xs text-gray-500 mt-1">Industry Recognized</p>
        </div>
        <div className="flex flex-col items-center text-center p-6 border-b lg:border-b-0 lg:border-r border-gray-100 last:border-0 relative">
          <span className="material-symbols-outlined text-4xl mb-4 text-[#1a1a1a]">emoji_events</span>
          <h3 className="text-4xl font-bold text-[#1a1a1a] mb-2">8+</h3>
          <p className="font-bold text-sm text-[#1a1a1a]">Awards Won</p>
          <p className="text-xs text-gray-500 mt-1">For Excellence</p>
        </div>
        <div className="flex flex-col items-center text-center p-6 border-r-0 lg:border-r border-gray-100 last:border-0 relative">
          <span className="material-symbols-outlined text-4xl mb-4 text-[#1a1a1a]">stars</span>
          <h3 className="text-4xl font-bold text-[#1a1a1a] mb-2">5+</h3>
          <p className="font-bold text-sm text-[#1a1a1a]">Years of Excellence</p>
          <p className="text-xs text-gray-500 mt-1">Consistent Performance</p>
        </div>
        <div className="flex flex-col items-center text-center p-6 last:border-0 relative">
          <span className="material-symbols-outlined text-4xl mb-4 text-[#1a1a1a]">verified_user</span>
          <h3 className="text-4xl font-bold text-[#1a1a1a] mb-2">100%</h3>
          <p className="font-bold text-sm text-[#1a1a1a]">Verified Recognition</p>
          <p className="text-xs text-gray-500 mt-1">Trusted & Authentic</p>
        </div>
      </div>

      {/* Milestones Section */}
      <div className="mb-24 pt-4">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-8 items-start">
          <div className="lg:w-[30%] pt-2 flex flex-col items-start text-left">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[2px] w-8 bg-[var(--color-award-gold)]"></div>
              <span className="text-[var(--color-award-gold)] font-bold uppercase tracking-widest text-[11px]">CERTIFICATES & AWARDS</span>
            </div>
            <h3 className="font-serif text-[42px] text-[#1a1a1a] leading-[1.1] mb-6">Our Milestones of Success</h3>
            <p className="text-gray-500 text-[15px] leading-relaxed mb-8">
              Each certificate and award represents our hard work, dedication and the trust of our clients and partners.
            </p>
            <button className="border border-[#1a1a1a] text-[#1a1a1a] rounded-lg text-sm font-bold px-7 py-3.5 hover:bg-[#1a1a1a] hover:text-white transition-all flex items-center gap-3 group">
              View All Achievements <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">arrow_forward</span>
            </button>
          </div>
          
          <div className="lg:w-[70%] w-full relative">
            <div className="absolute -top-[70px] right-2 hidden lg:flex gap-3">
              <button onClick={scrollLeft} className="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:border-gray-400 hover:text-[#1a1a1a] bg-white transition-all shadow-sm">
                <span className="material-symbols-outlined text-[20px]">arrow_back</span>
              </button>
              <button onClick={scrollRight} className="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:border-gray-400 hover:text-[#1a1a1a] bg-white transition-all shadow-sm">
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </button>
            </div>
            
            <div ref={scrollRef} className="flex gap-6 overflow-x-auto no-scrollbar pb-8 pt-2 snap-x snap-mandatory px-1">
              {/* Card 1 */}
              <div className="min-w-[280px] w-[280px] md:min-w-[320px] md:w-[320px] bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-gray-100 p-5 flex flex-col shrink-0 snap-start">
                <div className="relative mb-6 bg-gray-50 rounded-lg p-2 h-[220px] flex items-center justify-center cursor-pointer overflow-hidden border border-gray-100" onClick={() => onOpenCertificate(CERT1)}>
                   <span className="absolute top-3 right-3 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider z-10">Certified</span>
                   <img src={CERT1} className="w-full h-full object-contain mix-blend-multiply hover:scale-105 transition-transform duration-500" alt="Certificate" />
                </div>
                <h4 className="font-bold text-[#1a1a1a] text-lg leading-snug mb-1">Google UX Design <br/> Professional Certificate</h4>
                <p className="text-gray-500 text-sm mb-4">Google</p>
                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center gap-2 text-gray-400 text-xs font-bold">
                  <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                  2024
                </div>
              </div>

              {/* Card 2 */}
              <div className="min-w-[280px] w-[280px] md:min-w-[320px] md:w-[320px] bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-gray-100 p-5 flex flex-col shrink-0 snap-start">
                <div className="relative mb-6 bg-gray-50 rounded-lg p-2 h-[220px] flex items-center justify-center overflow-hidden border border-gray-100">
                   <span className="absolute top-3 right-3 bg-[var(--color-award-gold)] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider z-10">Winner</span>
                   <img src={TROPHY_STAR} className="w-full h-full object-contain mix-blend-multiply hover:scale-105 transition-transform duration-500" alt="Trophy" />
                </div>
                <h4 className="font-bold text-[#1a1a1a] text-lg leading-snug mb-1">Best Startup Award <br/> 2024</h4>
                <p className="text-gray-500 text-sm mb-4">Kerala Startup Mission</p>
                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center gap-2 text-gray-400 text-xs font-bold">
                  <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                  2024
                </div>
              </div>

              {/* Card 3 */}
              <div className="min-w-[280px] w-[280px] md:min-w-[320px] md:w-[320px] bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-gray-100 p-5 flex flex-col shrink-0 snap-start">
                <div className="relative mb-6 bg-gray-50 rounded-lg p-2 h-[220px] flex items-center justify-center cursor-pointer overflow-hidden border border-gray-100" onClick={() => onOpenCertificate(CERT2)}>
                   <span className="absolute top-3 right-3 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider z-10">Certified</span>
                   <img src={CERT2} className="w-full h-full object-contain mix-blend-multiply hover:scale-105 transition-transform duration-500" alt="Certificate" />
                </div>
                <h4 className="font-bold text-[#1a1a1a] text-lg leading-snug mb-1">ISO 9001:2015 <br/> Quality Management</h4>
                <p className="text-gray-500 text-sm mb-4">International Organization for Standardization</p>
                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center gap-2 text-gray-400 text-xs font-bold">
                  <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                  2023
                </div>
              </div>

              {/* Card 4 */}
              <div className="min-w-[280px] w-[280px] md:min-w-[320px] md:w-[320px] bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-gray-100 p-5 flex flex-col shrink-0 snap-start">
                <div className="relative mb-6 bg-gray-50 rounded-lg p-2 h-[220px] flex items-center justify-center overflow-hidden border border-gray-100">
                   <span className="absolute top-3 right-3 bg-[var(--color-award-gold)] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider z-10">Top Performer</span>
                   <img src={TROPHY_CUP} className="w-full h-full object-contain mix-blend-multiply hover:scale-105 transition-transform duration-500" alt="Trophy" />
                </div>
                <h4 className="font-bold text-[#1a1a1a] text-lg leading-snug mb-1">Top Performer <br/> Award 2023</h4>
                <p className="text-gray-500 text-sm mb-4">National Business Excellence Awards</p>
                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center gap-2 text-gray-400 text-xs font-bold">
                  <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                  2023
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Achievement Card */}
      <div className="bg-white rounded-[32px] p-8 md:p-14 mb-16 flex flex-col md:flex-row gap-12 lg:gap-20 items-center shadow-[0_8px_40px_rgba(0,0,0,0.06)] border border-gray-50 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[var(--color-award-gold-light)] to-transparent opacity-10 blur-3xl rounded-full"></div>
        <div className="md:w-[40%] flex justify-center relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-gray-100 to-white rounded-3xl -z-10 transform -rotate-6 scale-105"></div>
          <img src={TROPHY_STAR} className="max-w-[280px] lg:max-w-[320px] w-full object-contain drop-shadow-2xl mix-blend-multiply" alt="Featured Trophy" />
        </div>
        <div className="md:w-[60%] relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <span className="material-symbols-outlined text-[var(--color-award-gold)] text-xl">workspace_premium</span>
            <span className="text-gray-500 font-bold uppercase tracking-widest text-[11px]">FEATURED ACHIEVEMENT</span>
          </div>
          <h3 className="font-serif text-[40px] md:text-[56px] text-[#1a1a1a] leading-[1.1] mb-6 tracking-tight">
            Excellence in Innovation <br/> <span className="text-[var(--color-award-gold)]">Award 2024</span>
          </h3>
          <div className="flex items-center gap-2 mb-6">
            <span className="material-symbols-outlined text-gray-400 text-sm">verified</span>
            <span className="font-bold text-[15px] text-[#1a1a1a]">National Innovation Awards</span>
          </div>
          <p className="text-gray-500 text-[15px] leading-relaxed mb-10 max-w-lg">
            Awarded for outstanding innovation, leadership and impact in delivering exceptional solutions that drive growth and positive change.
          </p>
          <div className="flex flex-wrap gap-4 mb-10">
            <div className="flex items-center gap-4 bg-gray-50 border border-gray-100 rounded-xl p-4 px-6">
              <span className="material-symbols-outlined text-gray-400 text-2xl">calendar_today</span>
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-0.5">Year</span>
                <span className="text-sm font-bold text-[#1a1a1a]">2024</span>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-gray-50 border border-gray-100 rounded-xl p-4 px-6">
              <span className="material-symbols-outlined text-gray-400 text-2xl">account_balance</span>
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-0.5">Awarded By</span>
                <span className="text-sm font-bold text-[#1a1a1a]">National Innovation Awards</span>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-gray-50 border border-gray-100 rounded-xl p-4 px-6">
              <span className="material-symbols-outlined text-gray-400 text-2xl">category</span>
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-0.5">Category</span>
                <span className="text-sm font-bold text-[#1a1a1a]">Innovation Excellence</span>
              </div>
            </div>
          </div>
          <button className="bg-[#1a1a1a] text-white px-8 py-4 rounded-xl text-sm font-bold flex items-center gap-3 hover:bg-black transition-all hover:shadow-lg">
            View Certificate <span className="material-symbols-outlined text-[18px]">open_in_new</span>
          </button>
        </div>
      </div>

      {/* Bottom Features Row */}
      <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.03)] p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x divide-gray-100 border border-gray-50">
        <div className="flex items-start gap-4 lg:px-6 first:pl-0 last:pr-0">
          <span className="material-symbols-outlined text-3xl text-gray-400">verified_user</span>
          <div className="flex flex-col">
             <h4 className="text-sm font-bold text-[#1a1a1a] mb-1">Authentic & Verified</h4>
             <p className="text-xs text-gray-500 leading-relaxed">All achievements are verified and authentic</p>
          </div>
        </div>
        <div className="flex items-start gap-4 lg:px-6 first:pl-0 last:pr-0">
          <span className="material-symbols-outlined text-3xl text-gray-400">workspace_premium</span>
          <div className="flex flex-col">
             <h4 className="text-sm font-bold text-[#1a1a1a] mb-1">Industry Recognized</h4>
             <p className="text-xs text-gray-500 leading-relaxed">Recognized by leading organizations</p>
          </div>
        </div>
        <div className="flex items-start gap-4 lg:px-6 first:pl-0 last:pr-0">
          <span className="material-symbols-outlined text-3xl text-gray-400">group</span>
          <div className="flex flex-col">
             <h4 className="text-sm font-bold text-[#1a1a1a] mb-1">Trusted by Clients</h4>
             <p className="text-xs text-gray-500 leading-relaxed">Building trust through proven excellence</p>
          </div>
        </div>
        <div className="flex items-start gap-4 lg:px-6 first:pl-0 last:pr-0">
          <span className="material-symbols-outlined text-3xl text-gray-400">trending_up</span>
          <div className="flex flex-col">
             <h4 className="text-sm font-bold text-[#1a1a1a] mb-1">Commitment to Quality</h4>
             <p className="text-xs text-gray-500 leading-relaxed">Continuously raising the bar for better tomorrow</p>
          </div>
        </div>
      </div>
    </section>
  );
}
