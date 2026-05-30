import React from "react";
import { motion } from "motion/react";
import { Terminal, Shield, Workflow, Cpu, CheckCircle } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-24 bg-card/50 relative border-y border-card-border/50">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] pointer-events-none mix-blend-overlay" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:flex gap-16 items-start"
        >
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
              About My <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Journey</span>
            </h2>
            <div className="space-y-4 text-muted text-lg leading-relaxed">
              <p>
                I am a proactive Junior DevOps Engineer with a solid foundation in technical support and a deep passion for building robust cloud infrastructure. My approach focuses on bridging the gap between development and operations to help businesses scale efficiently.
              </p>
              <p>
                Having started in tech support, I developed a strong problem-solving mindset and a clear understanding of how critical resilient systems are to business success. This evolution led me to DevOps, where I now focus on automating deployments, managing AWS/Azure environments, and ensuring high availability.
              </p>
              <p>
                Whether it is setting up CI/CD pipelines, containerizing applications, or troubleshooting complex technical issues, I am dedicated to delivering solutions that keep businesses operating smoothly and securely.
              </p>
            </div>
          </div>
          
          <div className="md:w-1/2">
            <div className="bg-background border border-card-border p-8 rounded-2xl shadow-xl space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[50px] rounded-full" />
              
              <h3 className="text-xl font-bold font-mono text-foreground mb-4 border-b border-card-border pb-4">Core Strengths</h3>
              
              <ul className="space-y-4">
                {[
                  "Hands-on Cloud Infrastructure Management (AWS, Azure)",
                  "Automation & CI/CD Pipeline Implementation",
                  "Containerization & Orchestration (Docker, K8s)",
                  "Proactive Problem-Solving & Technical Support",
                  "Client-Focused Operations & Communication"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-muted">
                    <CheckCircle className="text-primary mt-1 shrink-0" size={18} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: <Terminal size={28} className="text-primary" />,
              title: "Infrastructure as Code",
              desc: "Treating infrastructure as software with Terraform to ensure reproducible, version-controlled environments."
            },
            {
              icon: <Workflow size={28} className="text-accent" />,
              title: "Automation First",
              desc: "Designing pipelines that automatically build, test, and deploy code securely and efficiently."
            },
            {
              icon: <Shield size={28} className="text-green-500" />,
              title: "Reliable Support",
              desc: "Troubleshooting complex network, system, and cloud issues to minimize downtime for businesses."
            }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="bg-background border border-card-border p-8 rounded-xl hover:border-primary/50 hover:shadow-[0_0_30px_rgba(37,99,235,0.1)] transition-all group"
            >
              <div className="w-14 h-14 bg-card border border-card-border rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-muted leading-relaxed text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
