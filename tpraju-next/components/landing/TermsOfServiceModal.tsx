"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export function TermsOfServiceModal({ isOpen, onClose }: Props) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-6 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white dark:bg-background-dark w-full max-w-3xl max-h-[85vh] rounded-2xl shadow-2xl flex flex-col pointer-events-auto overflow-hidden border border-gray-200 dark:border-gray-800"
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800">
                <h2 className="text-2xl font-bold text-charcoal dark:text-white font-serif">Terms of Service</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors text-gray-500"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div 
                className="p-6 overflow-y-auto flex-1 text-gray-600 dark:text-gray-300 space-y-6 text-sm"
                data-lenis-prevent
                onWheel={(e) => e.stopPropagation()}
                onTouchMove={(e) => e.stopPropagation()}
              >
                <section>
                  <h3 className="text-lg font-bold text-charcoal dark:text-white mb-2">1. Agreement to Terms</h3>
                  <p>By accessing and using the TPR Constructions website, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, then you may not access our website or use our services.</p>
                </section>
                
                <section>
                  <h3 className="text-lg font-bold text-charcoal dark:text-white mb-2">2. Use License</h3>
                  <p>Permission is granted to temporarily download one copy of the materials (information or software) on TPR Constructions&apos; website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>modify or copy the materials;</li>
                    <li>use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
                    <li>attempt to decompile or reverse engineer any software contained on our website;</li>
                    <li>remove any copyright or other proprietary notations from the materials; or</li>
                    <li>transfer the materials to another person or &quot;mirror&quot; the materials on any other server.</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-lg font-bold text-charcoal dark:text-white mb-2">3. Disclaimer</h3>
                  <p>The materials on TPR Constructions&apos; website are provided on an &apos;as is&apos; basis. TPR Constructions makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
                </section>

                <section>
                  <h3 className="text-lg font-bold text-charcoal dark:text-white mb-2">4. Limitations</h3>
                  <p>In no event shall TPR Constructions or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website, even if TPR Constructions or an authorized representative has been notified orally or in writing of the possibility of such damage.</p>
                </section>

                <section>
                  <h3 className="text-lg font-bold text-charcoal dark:text-white mb-2">5. Revisions and Errata</h3>
                  <p>The materials appearing on our website could include technical, typographical, or photographic errors. We do not warrant that any of the materials on our website are accurate, complete, or current. We may make changes to the materials contained on our website at any time without notice.</p>
                </section>
                
                <section>
                  <h3 className="text-lg font-bold text-charcoal dark:text-white mb-2">6. Governing Law</h3>
                  <p>These terms and conditions are governed by and construed in accordance with the laws of India and you irrevocably submit to the exclusive jurisdiction of the courts in that location.</p>
                </section>
              </div>

              <div className="p-6 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-black/20 flex justify-end">
                <button
                  onClick={onClose}
                  className="bg-primary hover:opacity-90 text-charcoal px-6 py-2 rounded-full font-bold text-sm transition-all"
                >
                  Accept & Close
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
