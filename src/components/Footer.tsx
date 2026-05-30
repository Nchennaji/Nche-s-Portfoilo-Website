import { Terminal } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-card-border bg-background py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 group cursor-pointer">
            <Terminal className="text-primary group-hover:text-accent transition-colors" size={20} />
            <span className="font-mono font-bold text-sm">nchedo<span className="text-primary">.dev</span></span>
          </div>
          
          <p className="text-muted text-sm text-center md:text-left">
            Junior DevOps Engineer | Cloud & Tech Support Specialist
          </p>
          
          <div className="text-muted text-sm font-mono">
            &copy; {year} Nchedo Nnaji. System Online.
          </div>
        </div>
      </div>
    </footer>
  );
}
