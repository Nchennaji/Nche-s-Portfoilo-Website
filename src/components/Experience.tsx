import { motion } from "motion/react";
import { Briefcase, GraduationCap, Award, Server } from "lucide-react";

const timeline = [
  {
    type: "work",
    title: "DevOps Micro Internship",
    organization: "Mentored by Pravin Mishra",
    date: "Recent",
    icon: <Server size={18} className="text-primary" />,
    desc: "Hands-on experience deploying real-world projects, setting up CI/CD pipelines, and managing infrastructure.",
    projects: ["Dockerizing applications", "Setting up Jenkins pipelines", "AWS deployment strategies"]
  },
  {
    type: "work",
    title: "Digital Witch Community",
    organization: "Community Member",
    date: "Ongoing",
    icon: <Briefcase size={18} className="text-accent" />,
    desc: "Active participation in tech support, community learning, and collaborative project execution. Specialized in cloud administration topics.",
    projects: ["Community tech support", "Collaborative problem solving"]
  },
  {
    type: "edu",
    title: "ALX IT Support Training",
    organization: "ALX Africa",
    date: "Completed",
    icon: <GraduationCap size={18} className="text-green-500" />,
    desc: "Comprehensive training in technical support, advanced troubleshooting methodologies, and Linux system administration.",
    projects: ["System troubleshooting labs", "OS configuration & security"]
  }
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 bg-card/30 relative">
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-card-border mb-6">
            <span className="text-sm font-mono text-primary uppercase tracking-wider">Career Path</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Experience & Training</h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            A timeline of my professional growth, technical training, and hands-on experience in the field.
          </p>
        </motion.div>

        <div className="relative border-l-2 border-card-border/50 md:ml-[50%] md:-translate-x-[1px]">
          {timeline.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className={`mb-16 relative pl-8 md:pl-0 group w-full ${idx % 2 === 0 ? "md:pr-12 md:text-right md:-left-[50%]" : "md:pl-12 md:left-[50%]"}`}
            >
              {/* Timeline dot */}
              <div className={`absolute top-0 w-8 h-8 rounded-full bg-card border-2 border-primary flex items-center justify-center z-10 group-hover:scale-110 group-hover:bg-primary transition-all duration-300 shadow-[0_0_10px_rgba(37,99,235,0)] group-hover:shadow-[0_0_15px_rgba(37,99,235,0.5)] ${idx % 2 === 0 ? "left-[-17px] md:right-[-16px] md:left-auto" : "left-[-17px] md:left-[-16px]"}`}>
                <div className="group-hover:text-primary-foreground group-hover:brightness-200 transition-all">
                  {item.icon}
                </div>
              </div>
              
              <div className="bg-background border border-card-border p-8 rounded-2xl group-hover:border-primary/50 transition-colors shadow-sm hover:shadow-[0_8px_30px_rgba(0,0,0,0.05)]">
                <div className={`flex flex-col-reverse md:flex-row md:items-center gap-2 mb-4 ${idx % 2 === 0 ? "md:justify-end md:flex-row-reverse" : "md:justify-between"}`}>
                  <h3 className="text-2xl font-bold text-foreground">{item.title}</h3>
                  <span className="inline-block px-3 py-1 bg-card border border-card-border rounded-full text-xs font-mono text-muted w-fit">
                    {item.date}
                  </span>
                </div>
                
                <div className={`text-primary font-semibold mb-4 text-lg flex items-center gap-2 ${idx % 2 === 0 ? "md:justify-end" : ""}`}>
                  {item.organization}
                </div>
                
                <p className="text-muted text-base leading-relaxed mb-6">{item.desc}</p>
                
                {item.projects.length > 0 && (
                  <div className={`flex flex-wrap gap-2 ${idx % 2 === 0 ? "md:justify-end" : ""}`}>
                    {item.projects.map(p => (
                      <span key={p} className="text-sm px-3 py-1.5 bg-card border border-card-border rounded-md text-foreground font-medium">
                        {p}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
