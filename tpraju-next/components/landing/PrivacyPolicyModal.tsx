"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export function PrivacyPolicyModal({ isOpen, onClose }: Props) {
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
                <h2 className="text-2xl font-bold text-charcoal dark:text-white font-serif">Privacy Policy</h2>
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
                  <h3 className="text-lg font-bold text-charcoal dark:text-white mb-2">1. Introduction</h3>
                  <p>Welcome to TPR Constructions. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.</p>
                </section>
                
                <section>
                  <h3 className="text-lg font-bold text-charcoal dark:text-white mb-2">2. No Data Collection or Storage</h3>
                  <p>We believe in your right to privacy. Our website is informational and does not collect, store, or process any personal data or information from our visitors. You can browse our website completely anonymously. The contact form directly emails our team and does not save your information to any database on this website.</p>
                </section>

                <section>
                  <h3 className="text-lg font-bold text-charcoal dark:text-white mb-2">3. Cookies and Analytics</h3>
                  <p>We do not use tracking cookies or third-party analytics tools that monitor your behavior or collect your personal information. Any cookies or local storage used are strictly for the basic, temporary functionality of the website.</p>
                </section>

                <section>
                  <h3 className="text-lg font-bold text-charcoal dark:text-white mb-2">5. Contact Details</h3>
                  <p>If you have any questions about this privacy policy or our privacy practices, please contact us at:</p>
                  <p className="mt-2">
                    <strong>Email:</strong> tprconstructions2020@gmail.com<br/>
                    <strong>Phone:</strong> +91 9447590954
                  </p>
                </section>
              </div>

              <div className="p-6 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-black/20 flex justify-end">
                <button
                  onClick={onClose}
                  className="bg-primary hover:opacity-90 text-charcoal px-6 py-2 rounded-full font-bold text-sm transition-all"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
