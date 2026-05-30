import { useState } from "react";
import { motion } from "motion/react";
import { Mail, Github, Linkedin, Send, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase, hasSupabase } from "../lib/supabase";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof formSchema>;

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema)
  });

  const onSubmit = async (data: FormData) => {
    setStatus("submitting");
    try {
      if (hasSupabase) {
        const { error } = await supabase.from("messages").insert([
          { name: data.name, email: data.email, message: data.message, date: new Date().toISOString() }
        ]);
        if (error) throw error;
        
        setStatus("success");
        reset();
        setTimeout(() => setStatus("idle"), 3000);
        return;
      }
      
      // Fallback to Express endpoint
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        setStatus("success");
        reset();
        setTimeout(() => setStatus("idle"), 3000);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-24 bg-card/50 border-t border-card-border relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-card-border mb-6">
            <span className="text-sm font-mono text-primary uppercase tracking-wider">Connect</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Initiate Connection</h2>
          <p className="text-muted max-w-lg mx-auto text-lg leading-relaxed">
            Available for remote opportunities, freelance projects, and technical support consulting.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="bg-background border border-card-border rounded-3xl p-8 lg:p-10 shadow-sm relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent/10 blur-[50px] rounded-full" />
              
              <h3 className="text-2xl font-bold border-b border-card-border pb-6 mb-8">Contact Information</h3>
              
              <div className="space-y-6">
                <a href="mailto:nchedo.nnaji24@gmail.com" className="flex items-center gap-5 text-muted hover:text-primary transition-colors group">
                  <div className="w-14 h-14 bg-card shadow-sm border border-card-border rounded-xl flex items-center justify-center group-hover:border-primary/50 transition-colors group-hover:scale-105">
                    <Mail size={24} />
                  </div>
                  <div>
                    <div className="text-sm font-mono text-foreground mb-1 uppercase tracking-wider">Email Protocol</div>
                    <div className="font-medium text-lg truncate">nchedo.nnaji24@gmail.com</div>
                  </div>
                </a>
                
                <a href="https://github.com/Nchennaji" target="_blank" rel="noreferrer" className="flex items-center gap-5 text-muted hover:text-foreground transition-colors group">
                  <div className="w-14 h-14 bg-card shadow-sm border border-card-border rounded-xl flex items-center justify-center group-hover:border-foreground/50 transition-colors group-hover:scale-105">
                    <Github size={24} />
                  </div>
                  <div>
                    <div className="text-sm font-mono text-foreground mb-1 uppercase tracking-wider">GitHub Repository</div>
                    <div className="font-medium text-lg">github.com/Nchennaji</div>
                  </div>
                </a>

                <a href="https://www.linkedin.com/in/nchedo-nnaji/" target="_blank" rel="noreferrer" className="flex items-center gap-5 text-muted hover:text-[#0A66C2] transition-colors group">
                  <div className="w-14 h-14 bg-card shadow-sm border border-card-border rounded-xl flex items-center justify-center group-hover:border-[#0A66C2]/50 transition-colors group-hover:scale-105">
                    <Linkedin size={24} />
                  </div>
                  <div>
                    <div className="text-sm font-mono text-foreground mb-1 uppercase tracking-wider">Professional Network</div>
                    <div className="font-medium text-lg">linkedin.com/in/nchedo-nnaji</div>
                  </div>
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="bg-background border border-card-border rounded-3xl p-8 lg:p-10 shadow-sm relative overflow-hidden">
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/10 blur-[50px] rounded-full" />
              <div className="space-y-6 relative z-10">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold uppercase tracking-wider text-muted mb-2">Name</label>
                    <input
                      {...register("name")}
                      className={`w-full bg-card border ${errors.name ? 'border-red-500' : 'border-card-border'} rounded-xl px-4 py-4 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all`}
                      placeholder="John Doe"
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-2 font-mono">{errors.name.message}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold uppercase tracking-wider text-muted mb-2">Email</label>
                    <input
                      {...register("email")}
                      className={`w-full bg-card border ${errors.email ? 'border-red-500' : 'border-card-border'} rounded-xl px-4 py-4 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all`}
                      placeholder="john@example.com"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-2 font-mono">{errors.email.message}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider text-muted mb-2">Message</label>
                  <textarea
                    {...register("message")}
                    rows={5}
                    className={`w-full bg-card border ${errors.message ? 'border-red-500' : 'border-card-border'} rounded-xl px-4 py-4 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none`}
                    placeholder="How can I help you regarding infrastructure, automation, or support?"
                  />
                  {errors.message && <p className="text-red-500 text-xs mt-2 font-mono">{errors.message.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-4 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-70 shadow-md text-lg"
                >
                  {status === "submitting" ? (
                    <Loader2 className="animate-spin" size={24} />
                  ) : status === "success" ? (
                    "Transmission Successful"
                  ) : (
                    <>
                      Transmit Message <Send size={20} />
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
