import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Github, ExternalLink, Loader2, FileText, ChevronRight, X } from "lucide-react";
import { supabase, hasSupabase } from "../lib/supabase";

// Extended Project type based on requirements
export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  githubUrl: string;
  docUrl?: string; // Medium, Drive, LinkedIn etc
  demoUrl?: string;
  imageUrl: string;
  screenshots?: string[];
  architectureDiagram?: string;
  longDescription?: string;
}

const mockProjects: Project[] = [
  {
    id: "1",
    title: "3-Tier Banking Application Deployment on AWS",
    description: "Architected and deployed a highly available 3-tier banking application using AWS native services.",
    longDescription: "A comprehensive deployment demonstrating production-grade AWS architecture. Includes multi-AZ VPC, private subnets for application and database tiers, ALB for traffic distribution, and Auto Scaling. This setup ensures fault tolerance and high availability for financial workloads.",
    tech: ["AWS", "Terraform", "Docker", "Kubernetes", "Helm", "GitHub Actions"],
    githubUrl: "https://github.com/Nchennaji",
    docUrl: "https://github.com/Nchennaji",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop",
  },
  {
    id: "2",
    title: "Kubernetes GitOps Deployment with Argo CD",
    description: "Implemented a complete GitOps workflow for a microservices application on Kubernetes using Argo CD.",
    longDescription: "Set up continuous deployment using Argo CD to monitor a Git repository and automatically reconcile the cluster state. This approach ensures configuration as code and prevents drift.",
    tech: ["Kubernetes", "Argo CD"],
    githubUrl: "https://github.com/Nchennaji",
    imageUrl: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?q=80&w=2670&auto=format&fit=crop",
  },
  {
    id: "3",
    title: "Terraform Infrastructure Automation",
    description: "Automated provisioning of cross-cloud infrastructure using modular Terraform configurations.",
    tech: ["Terraform", "AWS", "Azure"],
    githubUrl: "https://github.com/Nchennaji",
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2668&auto=format&fit=crop",
  }
];

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        if (hasSupabase) {
          const { data, error } = await supabase.from("projects").select("*");
          if (!error && data) {
            setProjects(data as Project[]);
            setLoading(false);
            return;
          }
        }
        
        // Fallback to Express backend or mock
        try {
          const res = await fetch("/api/projects");
          if (res.ok) {
            const data = await res.json();
            setProjects(data.length ? data : mockProjects);
          } else {
            setProjects(mockProjects);
          }
        } catch {
          setProjects(mockProjects);
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchProjects();
  }, []);

  return (
    <section id="projects" className="py-24 bg-card/50 border-t border-card-border/50 relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-card-border mb-6">
            <span className="text-sm font-mono text-primary uppercase tracking-wider">Portfolio</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Featured Projects</h2>
          <p className="text-muted max-w-2xl mx-auto text-lg leading-relaxed">
            Real-world applications of infrastructure automation, scalable cloud deployments, and CI/CD pipelines.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-primary" size={40} />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group bg-background border border-card-border rounded-2xl overflow-hidden flex flex-col hover:border-primary/50 transition-all shadow-sm hover:shadow-[0_8px_30px_rgba(37,99,235,0.12)] cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <div className="relative aspect-video overflow-hidden border-b border-card-border">
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity z-10 mix-blend-overlay" />
                  <img 
                    src={project.imageUrl || 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2668&auto=format&fit=crop'} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                
                <div className="p-8 flex flex-col flex-1">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{project.title}</h3>
                  <p className="text-muted text-sm mb-6 flex-1 line-clamp-3 leading-relaxed">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech?.slice(0, 4).map(t => (
                      <span key={t} className="px-3 py-1 bg-card border border-card-border rounded-md text-xs font-mono text-primary font-medium">
                        {t}
                      </span>
                    ))}
                    {project.tech?.length > 4 && (
                      <span className="px-3 py-1 bg-card border border-card-border rounded-md text-xs font-mono text-muted">
                        +{project.tech.length - 4} more
                      </span>
                    )}
                  </div>
                  
                  <div className="pt-6 border-t border-card-border flex items-center justify-between text-sm font-medium text-muted group-hover:text-primary transition-colors">
                    View Project Details
                    <ChevronRight size={18} className="translate-x-0 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              onClick={() => setSelectedProject(null)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-card border border-card-border shadow-2xl rounded-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-background/50 hover:bg-background backdrop-blur-md border border-card-border rounded-full flex items-center justify-center transition-colors text-foreground"
              >
                <X size={20} />
              </button>

              <div className="overflow-y-auto flex-1">
                <div className="aspect-[21/9] w-full relative border-b border-card-border">
                  <img src={selectedProject.imageUrl || 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2668&auto=format&fit=crop'} alt={selectedProject.title} className="w-full h-full object-cover" />
                </div>
                
                <div className="p-8 md:p-12">
                  <h2 className="text-2xl md:text-4xl font-bold mb-4">{selectedProject.title}</h2>
                  
                  <div className="flex flex-wrap gap-2 mb-8">
                    {selectedProject.tech?.map(t => (
                      <span key={t} className="px-3 py-1 bg-background border border-card-border rounded-md text-sm font-mono text-primary font-medium">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="prose prose-invert max-w-none text-muted mb-8 leading-relaxed">
                    <p className="text-lg text-foreground mb-4 font-medium">{selectedProject.description}</p>
                    {selectedProject.longDescription && <p>{selectedProject.longDescription}</p>}
                    
                    {!selectedProject.longDescription && (
                      <p>This project demonstrates key DevOps principles including infrastructure as code, CI/CD pipelines, and secure cloud deployments. It showcases hands-on engineering using industry-standard tools to solve real technical challenges.</p>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-4 pt-6 border-t border-card-border">
                    {selectedProject.githubUrl && (
                      <a href={selectedProject.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 bg-background hover:bg-card-border border border-card-border rounded-lg text-foreground font-medium transition-colors">
                        <Github size={20} /> View Source
                      </a>
                    )}
                    {selectedProject.docUrl && (
                      <a href={selectedProject.docUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-medium transition-colors shadow">
                        <FileText size={20} /> Documentation
                      </a>
                    )}
                    {selectedProject.demoUrl && (
                      <a href={selectedProject.demoUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent/90 text-white rounded-lg font-medium transition-colors shadow">
                        <ExternalLink size={20} /> Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
