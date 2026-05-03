"use client";

const CERT1 = "https://img.freepik.com/free-vector/certificate-template-design_53876-59034.jpg";
const CERT2 = "https://img.freepik.com/free-vector/certificate-template-design_53876-59037.jpg";
const TROPHY_CUP = "https://img.freepik.com/free-photo/champion-gold-cup-trophy-white-background-3d-rendering_460848-10332.jpg";
const TROPHY_STAR = "https://img.freepik.com/premium-photo/golden-star-award-with-black-base-it_940464-32536.jpg";

interface AwardsSectionProps {
  onOpenCertificate: (src: string) => void;
}

export function AwardsSection({ onOpenCertificate }: AwardsSectionProps) {
  return (
    <section id="awards" className="px-6 md:px-16 lg:px-24 py-24 lg:py-32 bg-[#fafafa]">
      {/* Title Section */}
      <div className="text-center mb-16 flex flex-col items-center">
        <div className="flex items-center gap-6 mb-4">
          <img src="/left.png" alt="" className="w-12 h-auto opacity-80" />
          <span className="premium-label tracking-[0.2em] font-bold text-gray-800">OUR ACHIEVEMENTS</span>
          <img src="/right.png" alt="" className="w-12 h-auto opacity-80" />
        </div>
        <h2 className="text-4xl md:text-5xl premium-heading text-[#1a1a1a] mb-6">
          Recognition That <br /> Inspires <span className="text-[var(--color-award-gold)] italic">Excellence</span>
        </h2>
        <p className="premium-body max-w-xl mx-auto text-[15px]">
          A collection of our certifications, trophies and recognitions that reflect our commitment to quality and excellence.
        </p>
      </div>

      {/* Features Row (Moved to top) */}
      <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.03)] mb-20 p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x divide-gray-100 border border-gray-50">
        <div className="flex items-start gap-4 lg:px-6 first:pl-0 last:pr-0">
          <span className="material-symbols-outlined text-4xl text-gray-400">verified_user</span>
          <div className="flex flex-col">
            <h4 className="text-sm font-bold text-[#1a1a1a] mb-1">Authentic & Verified</h4>
            <p className="text-xs text-gray-500 leading-relaxed">All achievements are verified and authentic</p>
          </div>
        </div>
        <div className="flex items-start gap-4 lg:px-6 first:pl-0 last:pr-0">
          <span className="material-symbols-outlined text-4xl text-gray-400">workspace_premium</span>
          <div className="flex flex-col">
            <h4 className="text-sm font-bold text-[#1a1a1a] mb-1">Industry Recognized</h4>
            <p className="text-xs text-gray-500 leading-relaxed">Recognized by leading organizations</p>
          </div>
        </div>
        <div className="flex items-start gap-4 lg:px-6 first:pl-0 last:pr-0">
          <span className="material-symbols-outlined text-4xl text-gray-400">group</span>
          <div className="flex flex-col">
            <h4 className="text-sm font-bold text-[#1a1a1a] mb-1">Trusted by Clients</h4>
            <p className="text-xs text-gray-500 leading-relaxed">Building trust through proven excellence</p>
          </div>
        </div>
        <div className="flex items-start gap-4 lg:px-6 first:pl-0 last:pr-0">
          <span className="material-symbols-outlined text-4xl text-gray-400">trending_up</span>
          <div className="flex flex-col">
            <h4 className="text-sm font-bold text-[#1a1a1a] mb-1">Commitment to Quality</h4>
            <p className="text-xs text-gray-500 leading-relaxed">Continuously raising the bar for better tomorrow</p>
          </div>
        </div>
      </div>

      {/* Milestones Section */}
      <div className="mb-24 pt-4">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-8 items-start">
          <div className="lg:w-[30%] pt-2 flex flex-col items-start text-left">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[2px] w-8 bg-[var(--color-award-gold)]"></div>
              <span className="text-[var(--color-award-gold)] premium-label">CERTIFICATES & AWARDS</span>
            </div>
            <h3 className="font-serif text-[42px] text-[#1a1a1a] leading-[1.1] mb-6">Our Milestones of Success</h3>
            <p className="text-gray-500 text-[15px] leading-relaxed mb-8">
              Each certificate and award represents our hard work, dedication and the trust of our clients and partners.
            </p>
            <button className="border border-[#1a1a1a] text-[#1a1a1a] rounded-lg text-sm font-bold px-7 py-3.5 hover:bg-[#1a1a1a] hover:text-white transition-all flex items-center gap-3 group">
              View All Achievements <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">arrow_forward</span>
            </button>
          </div>

          <div className="lg:w-[70%] w-full relative overflow-hidden premium-scroll-mask">
            <div 
              className="flex animate-scroll hover:pause gap-6 w-max py-2"
              style={{ animationDuration: '12s' }}
            >
              {[1, 2].map((loop) => (
                <div key={loop} className="flex gap-6">
                  {/* Card 1 */}
                  <div className="w-[280px] md:w-[320px] bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-gray-100 p-5 flex flex-col shrink-0">
                    <div className="relative mb-6 bg-gray-50 rounded-lg p-2 h-[220px] flex items-center justify-center cursor-pointer overflow-hidden border border-gray-100" onClick={() => onOpenCertificate(CERT1)}>
                      <span className="absolute top-3 right-3 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider z-10">Certified</span>
                      <img src={CERT1} className="w-full h-full object-contain mix-blend-multiply hover:scale-105 transition-transform duration-500" alt="Certificate" />
                    </div>
                    <h4 className="font-bold text-[#1a1a1a] text-lg leading-snug mb-1 whitespace-normal">Google UX Design <br /> Professional Certificate</h4>
                    <p className="text-gray-500 text-sm mb-4">Google</p>
                    <div className="mt-auto pt-4 border-t border-gray-100 flex items-center gap-2 text-gray-400 text-xs font-bold">
                      <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                      2024
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div className="w-[280px] md:w-[320px] bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-gray-100 p-5 flex flex-col shrink-0">
                    <div className="relative mb-6 bg-gray-50 rounded-lg p-2 h-[220px] flex items-center justify-center overflow-hidden border border-gray-100">
                      <span className="absolute top-3 right-3 bg-[var(--color-award-gold)] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider z-10">Winner</span>
                      <img src={TROPHY_STAR} className="w-full h-full object-contain mix-blend-multiply hover:scale-105 transition-transform duration-500" alt="Trophy" />
                    </div>
                    <h4 className="font-bold text-[#1a1a1a] text-lg leading-snug mb-1 whitespace-normal">Best Startup Award <br /> 2024</h4>
                    <p className="text-gray-500 text-sm mb-4">Kerala Startup Mission</p>
                    <div className="mt-auto pt-4 border-t border-gray-100 flex items-center gap-2 text-gray-400 text-xs font-bold">
                      <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                      2024
                    </div>
                  </div>

                  {/* Card 3 */}
                  <div className="w-[280px] md:w-[320px] bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-gray-100 p-5 flex flex-col shrink-0">
                    <div className="relative mb-6 bg-gray-50 rounded-lg p-2 h-[220px] flex items-center justify-center cursor-pointer overflow-hidden border border-gray-100" onClick={() => onOpenCertificate(CERT2)}>
                      <span className="absolute top-3 right-3 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider z-10">Certified</span>
                      <img src={CERT2} className="w-full h-full object-contain mix-blend-multiply hover:scale-105 transition-transform duration-500" alt="Certificate" />
                    </div>
                    <h4 className="font-bold text-[#1a1a1a] text-lg leading-snug mb-1 whitespace-normal">ISO 9001:2015 <br /> Quality Management</h4>
                    <p className="text-gray-500 text-sm mb-4">International Organization for Standardization</p>
                    <div className="mt-auto pt-4 border-t border-gray-100 flex items-center gap-2 text-gray-400 text-xs font-bold">
                      <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                      2023
                    </div>
                  </div>

                  {/* Card 4 */}
                  <div className="w-[280px] md:w-[320px] bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-gray-100 p-5 flex flex-col shrink-0">
                    <div className="relative mb-6 bg-gray-50 rounded-lg p-2 h-[220px] flex items-center justify-center overflow-hidden border border-gray-100">
                      <span className="absolute top-3 right-3 bg-[var(--color-award-gold)] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider z-10">Top Performer</span>
                      <img src={TROPHY_CUP} className="w-full h-full object-contain mix-blend-multiply hover:scale-105 transition-transform duration-500" alt="Trophy" />
                    </div>
                    <h4 className="font-bold text-[#1a1a1a] text-lg leading-snug mb-1 whitespace-normal">Top Performer <br /> Award 2023</h4>
                    <p className="text-gray-500 text-sm mb-4">National Business Excellence Awards</p>
                    <div className="mt-auto pt-4 border-t border-gray-100 flex items-center gap-2 text-gray-400 text-xs font-bold">
                      <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                      2023
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>




    </section>
  );
}
