import { MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/1234567890" // User will configure their number
      target="_blank"
      rel="noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-all cursor-pointer flex items-center justify-center group"
      aria-label="Contact on WhatsApp"
    >
      <MessageCircle size={28} />
      
      {/* Tooltip */}
      <div className="absolute right-full mr-4 bg-card text-foreground px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity border border-card-border shadow-lg hidden md:block">
        Message me on WhatsApp
      </div>
      
      {/* Pulse effect */}
      <div className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-ping" />
    </motion.a>
  );
}
