import { motion } from "motion/react";
import { Cloud, Cog, Server, Activity, Shield, Terminal as TerminalIcon, Users, Check } from "lucide-react";

const skillCategories = [
  {
    title: "Cloud Platforms",
    icon: <Cloud className="text-primary group-hover:scale-110 transition-transform" size={24} />,
    skills: ["AWS", "Microsoft Azure", "Google Cloud Platform (GCP)"]
  },
  {
    title: "DevOps & Automation",
    icon: <Cog className="text-accent group-hover:scale-110 transition-transform" size={24} />,
    skills: ["Terraform", "Ansible", "Azure DevOps", "GitHub Actions", "CI/CD", "Argo CD"]
  },
  {
    title: "Containerization",
    icon: <Server className="text-green-500 group-hover:scale-110 transition-transform" size={24} />,
    skills: ["Docker", "Kubernetes", "Helm"]
  },
  {
    title: "Observability",
    icon: <Activity className="text-purple-500 group-hover:scale-110 transition-transform" size={24} />,
    skills: ["Prometheus", "Grafana", "Datadog", "AWS CloudWatch"]
  },
  {
    title: "Networking & Security",
    icon: <Shield className="text-orange-500 group-hover:scale-110 transition-transform" size={24} />,
    skills: ["IAM", "VPC", "VPN", "Load Balancers", "Security Groups"]
  },
  {
    title: "Scripting & OS",
    icon: <TerminalIcon className="text-yellow-500 group-hover:scale-110 transition-transform" size={24} />,
    skills: ["Bash", "Python", "Linux", "YAML"]
  },
  {
    title: "Project & Collab",
    icon: <Users className="text-pink-500 group-hover:scale-110 transition-transform" size={24} />,
    skills: ["Jira", "Slack", "Notion", "Agile/Scrum"]
  }
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-background to-background pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-card-border mb-6">
            <span className="text-sm font-mono text-muted uppercase tracking-wider">Technical Arsenal</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Skills & Tech Stack</h2>
          <p className="text-muted max-w-2xl mx-auto text-lg leading-relaxed">
            The tools, platforms, and methodologies I leverage to design, deploy, and support scalable cloud infrastructure.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {skillCategories.map((category, idx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ y: -5 }}
              className="bg-card/50 backdrop-blur-sm border border-card-border rounded-2xl p-6 hover:border-primary/50 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all group"
            >
              <div className="flex items-center gap-4 mb-6 pb-4 border-b border-card-border/50">
                <div className="p-2 bg-background rounded-lg shadow-sm border border-card-border">
                  {category.icon}
                </div>
                <h3 className="font-semibold text-foreground">{category.title}</h3>
              </div>
              
              <ul className="space-y-3">
                {category.skills.map(skill => (
                  <li key={skill} className="flex items-center gap-2">
                    <Check size={14} className="text-primary shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="text-sm text-muted group-hover:text-foreground transition-colors">{skill}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
