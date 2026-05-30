import React from "react";
import { motion } from "motion/react";
import { Download, ArrowRight, Server, Cloud, Code, ChevronDown } from "lucide-react";
import { TypeAnimation } from "react-type-animation";

export default function Hero() {
  const scrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.querySelector("#contact");
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const scrollToAbout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.querySelector("#about");
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative mb-24 min-h-screen flex items-center pt-20 overflow-hidden bg-background">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-primary/20 blur-[150px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-accent/20 blur-[150px] rounded-full mix-blend-screen" />
        
        {/* Technical Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_10%,transparent_100%)]" />
        
        {/* Animated Particles */}
        <motion.div 
          animate={{ y: [0, -20, 0], opacity: [0.3, 0.8, 0.3] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="absolute top-1/3 left-1/3 w-2 h-2 rounded-full bg-primary" 
        />
        <motion.div 
          animate={{ y: [0, 20, 0], opacity: [0.3, 0.8, 0.3] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/3 right-1/4 w-3 h-3 rounded-full bg-accent" 
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full grid md:grid-cols-2 gap-12 items-center z-10 relative">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-card border border-card-border text-sm font-mono text-muted group">
            <span className="text-primary tracking-widest text-xs uppercase font-bold">Hello World</span>
          </div>
          
          <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-muted mb-2">
              HELLO, I'M
            </h1>
            <h2 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight text-foreground">
              NCHEDO THERESA NNAJI
            </h2>
          </div>

          <div className="h-16 md:h-20 flex items-center">
            <TypeAnimation
              sequence={[
                "Junior DevOps Engineer",
                2000,
                "Cloud Specialist",
                2000,
                "Tech Support Specialist",
                2000,
                "Infrastructure Automation",
                2000,
              ]}
              wrapper="h3"
              className="text-2xl md:text-3xl font-mono text-primary font-medium"
              repeat={Infinity}
            />
          </div>

          <p className="text-lg text-muted max-w-lg leading-relaxed">
            I help businesses deploy, automate, and manage reliable cloud infrastructure while providing technical and operational support.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <a
              href="#projects"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-all hover:scale-105 shadow-[0_0_20px_rgba(37,99,235,0.4)]"
            >
              View Projects <ArrowRight size={18} />
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-card border border-card-border text-foreground font-medium rounded-lg hover:bg-card-border transition-all group"
            >
              Resume <Download size={18} className="group-hover:translate-y-1 transition-transform" />
            </a>
            <a
              href="#contact"
              onClick={scrollToContact}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-muted hover:text-foreground font-medium transition-colors"
            >
              Contact Me
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative hidden md:flex justify-center items-center"
        >
          <div className="relative w-full max-w-[500px] aspect-square">
            {/* Dark abstract technical background blob/glow */}
            <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full mix-blend-normal" />
            
            {/* Technical rings */}
            <div className="absolute inset-0 border border-card-border/60 rounded-full animate-[spin_60s_linear_infinite]" />
            <div className="absolute inset-4 border border-accent/20 border-dashed rounded-full animate-[spin_40s_linear_infinite_reverse]" />
            
            {/* Floating tech icons */}
            <motion.div 
              animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }} 
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="absolute top-4 right-10 bg-card/80 backdrop-blur-sm p-4 rounded-2xl border border-card-border shadow-xl z-20"
            >
              <Cloud className="text-primary" size={36} />
            </motion.div>
            <motion.div 
              animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }} 
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-10 left-4 bg-card/80 backdrop-blur-sm p-4 rounded-2xl border border-card-border shadow-xl z-20"
            >
              <Server className="text-accent" size={36} />
            </motion.div>
            <motion.div 
              animate={{ y: [0, -10, 0], x: [0, 5, 0] }} 
              transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 2 }}
              className="absolute top-1/3 -right-6 bg-card/80 backdrop-blur-sm p-4 rounded-2xl border border-card-border shadow-xl z-20"
            >
              <Code className="text-green-500" size={36} />
            </motion.div>

            {/* Profile image placeholder */}
            <div className="absolute inset-6 rounded-full overflow-hidden border-8 border-card shadow-2xl z-10 bg-card flex items-center justify-center">
              <img 
                src="https://i.ibb.co/6Jb7x8Tf/edited.jpg" 
                alt="Nchedo Theresa Nnaji" 
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20">
        <a href="#about" onClick={scrollToAbout} aria-label="Scroll to About" className="flex flex-col items-center gap-2 text-muted hover:text-foreground transition-colors group">
          <span className="text-xs uppercase font-mono tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Scroll</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <ChevronDown size={24} />
          </motion.div>
        </a>
      </div>
    </section>
  );
}
