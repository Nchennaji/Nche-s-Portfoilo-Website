import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../lib/AuthContext";
import { LogOut, Plus, Trash2, Edit, MessageSquare, LayoutDashboard, Database, Loader2, X } from "lucide-react";
import type { Project, Message } from "../types";
import { supabase, hasSupabase } from "../lib/supabase";

export default function AdminDashboard() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"projects" | "messages">("projects");
  
  const [projects, setProjects] = useState<Project[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  // Form State
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<Project>>({
    title: "", description: "", longDescription: "", tech: [], githubUrl: "", docUrl: "", demoUrl: "", imageUrl: ""
  });
  const [techInput, setTechInput] = useState("");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/admin/login");
      return;
    }
    fetchData();
  }, [isAuthenticated, navigate]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (hasSupabase) {
        const { data: projData } = await supabase.from("projects").select("*").order("created_at", { ascending: false });
        const { data: msgData } = await supabase.from("messages").select("*").order("date", { ascending: false });
        if (projData) setProjects(projData as Project[]);
        if (msgData) setMessages(msgData as Message[]);
      } else {
        const [projRes, msgRes] = await Promise.all([
          fetch("/api/projects"),
          fetch("/api/messages")
        ]);
        setProjects(await projRes.json());
        if (msgRes.ok) setMessages(await msgRes.json());
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    
    if (hasSupabase) {
      await supabase.from("projects").delete().eq("id", id);
    } else {
      await fetch(`/api/projects/${id}`, { method: "DELETE" });
    }
    fetchData();
  };

  const handleDeleteMessage = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    
    if (hasSupabase) {
      await supabase.from("messages").delete().eq("id", id);
    } else {
      await fetch(`/api/messages/${id}`, { method: "DELETE" });
    }
    fetchData();
  };

  const resetForm = () => {
    setIsEditing(false);
    setFormData({ title: "", description: "", longDescription: "", tech: [], githubUrl: "", docUrl: "", demoUrl: "", imageUrl: "" });
    setTechInput("");
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const payload = {
      ...formData,
      id: isEditing ? formData.id : Date.now().toString(),
    };

    if (hasSupabase) {
      if (isEditing) {
        await supabase.from("projects").update(formData).eq("id", formData.id);
      } else {
        await supabase.from("projects").insert([payload]);
      }
    } else {
      const method = isEditing && formData.id ? "PUT" : "POST";
      const url = isEditing && formData.id ? `/api/projects/${formData.id}` : "/api/projects";
      
      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
    }
    
    resetForm();
    fetchData();
  };

  const addTech = () => {
    if (techInput.trim() && !formData.tech?.includes(techInput.trim())) {
      setFormData(prev => ({ ...prev, tech: [...(prev.tech || []), techInput.trim()] }));
      setTechInput("");
    }
  };

  const removeTech = (t: string) => {
    setFormData(prev => ({ ...prev, tech: prev.tech?.filter(tech => tech !== t) }));
  };

  const handleEditClick = (p: Project) => {
    setIsEditing(true);
    setFormData(p);
  };

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-card border-r border-card-border p-6 flex flex-col z-20">
        <div className="flex items-center gap-2 mb-10 text-primary">
          <LayoutDashboard size={24} />
          <span className="font-bold text-xl tracking-tight">Admin<span className="text-foreground">Panel</span></span>
        </div>
        
        <nav className="flex-1 space-y-2">
          <button
            onClick={() => setActiveTab("projects")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === "projects" ? "bg-primary text-primary-foreground font-medium" : "text-muted hover:bg-background hover:text-foreground"}`}
          >
            <Database size={18} />
            Manage Projects
          </button>
          <button
            onClick={() => setActiveTab("messages")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === "messages" ? "bg-primary text-primary-foreground font-medium" : "text-muted hover:bg-background hover:text-foreground"}`}
          >
            <MessageSquare size={18} />
            Messages
          </button>
        </nav>
        
        <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors w-full mt-auto">
          <LogOut size={18} />
          End Session
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto relative bg-card/10">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <h1 className="text-3xl font-bold mb-8 capitalize">{activeTab}</h1>

          {loading ? (
            <div className="flex justify-center py-20"><Loader2 className="animate-spin text-primary" size={40} /></div>
          ) : (
            <>
              {activeTab === "projects" && (
                <div className="space-y-10">
                  {/* Form */}
                  <div className="bg-card border border-card-border p-8 rounded-2xl shadow-sm">
                    <h2 className="text-xl font-bold mb-6">{isEditing ? "Edit Project" : "Add New Project"}</h2>
                    <form onSubmit={handleSaveProject} className="grid md:grid-cols-2 gap-6">
                      
                      <div className="space-y-2">
                        <label className="text-sm text-muted font-bold tracking-wider uppercase">Project Title</label>
                        <input
                          placeholder="My Awesome Architecture" required
                          value={formData.title || ""} onChange={e => setFormData({...formData, title: e.target.value})}
                          className="w-full bg-background border border-card-border rounded-lg px-4 py-3 text-foreground focus:border-primary transition-colors outline-none"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm text-muted font-bold tracking-wider uppercase">Thumbnail Image URL</label>
                        <input
                          placeholder="https://..." required
                          value={formData.imageUrl || ""} onChange={e => setFormData({...formData, imageUrl: e.target.value})}
                          className="w-full bg-background border border-card-border rounded-lg px-4 py-3 text-foreground focus:border-primary transition-colors outline-none"
                        />
                      </div>
                      
                      <div className="space-y-2 md:col-span-2">
                        <label className="text-sm text-muted font-bold tracking-wider uppercase">Short summary (List view)</label>
                        <textarea
                          placeholder="A brief 1-2 sentence description..." required rows={2}
                          value={formData.description || ""} onChange={e => setFormData({...formData, description: e.target.value})}
                          className="w-full bg-background border border-card-border rounded-lg px-4 py-3 text-foreground focus:border-primary transition-colors outline-none resize-none"
                        />
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <label className="text-sm text-muted font-bold tracking-wider uppercase">Detailed technical explanation (Modal view)</label>
                        <textarea
                          placeholder="Detailed architecture explanation, challenges faced, business impact..." rows={4}
                          value={formData.longDescription || ""} onChange={e => setFormData({...formData, longDescription: e.target.value})}
                          className="w-full bg-background border border-card-border rounded-lg px-4 py-3 text-foreground focus:border-primary transition-colors outline-none resize-none"
                        />
                      </div>
                      
                      <div className="md:col-span-2 space-y-2">
                        <label className="text-sm text-muted font-bold tracking-wider uppercase">Technologies Used</label>
                        <div className="flex items-center gap-2 mb-3">
                          <input
                            placeholder="e.g. Terraform, Kubernetes, AWS"
                            value={techInput} onChange={e => setTechInput(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTech())}
                            className="bg-background border border-card-border rounded-lg px-4 py-3 text-foreground flex-1 focus:border-primary outline-none transition-colors"
                          />
                          <button type="button" onClick={addTech} className="px-6 py-3 bg-card-border hover:bg-card-border/80 transition-colors rounded-lg font-medium">Add</button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {formData.tech?.map(t => (
                            <span key={t} className="px-3 py-1.5 bg-background border border-card-border rounded-md flex items-center gap-2 text-sm font-mono text-primary font-medium">
                              {t} <X size={14} className="cursor-pointer text-muted hover:text-red-400 transition-colors" onClick={() => removeTech(t)} />
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm text-muted font-bold tracking-wider uppercase">GitHub Repository URL</label>
                        <input
                          placeholder="https://github.com/..."
                          value={formData.githubUrl || ""} onChange={e => setFormData({...formData, githubUrl: e.target.value})}
                          className="w-full bg-background border border-card-border rounded-lg px-4 py-3 text-foreground focus:border-primary transition-colors outline-none"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm text-muted font-bold tracking-wider uppercase">Documentation / Medium URL</label>
                        <input
                          placeholder="https://..."
                          value={formData.docUrl || ""} onChange={e => setFormData({...formData, docUrl: e.target.value})}
                          className="w-full bg-background border border-card-border rounded-lg px-4 py-3 text-foreground focus:border-primary transition-colors outline-none"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm text-muted font-bold tracking-wider uppercase">Live Demo URL</label>
                        <input
                          placeholder="https://..."
                          value={formData.demoUrl || ""} onChange={e => setFormData({...formData, demoUrl: e.target.value})}
                          className="w-full bg-background border border-card-border rounded-lg px-4 py-3 text-foreground focus:border-primary transition-colors outline-none"
                        />
                      </div>

                      <div className="md:col-span-2 pt-6 mt-2 border-t border-card-border flex gap-4">
                        <button type="submit" className="px-8 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-medium flex items-center gap-2 transition-colors">
                          {isEditing ? <Edit size={18} /> : <Plus size={18} />} {isEditing ? "Update Project" : "Publish Project"}
                        </button>
                        {isEditing && (
                          <button type="button" onClick={resetForm} className="px-8 py-3 border border-card-border hover:bg-card-border rounded-xl font-medium transition-colors">
                            Cancel Edit
                          </button>
                        )}
                      </div>
                    </form>
                  </div>

                  {/* List */}
                  <div>
                    <h2 className="text-xl font-bold mb-6">Existing Projects</h2>
                    {projects.length === 0 ? (
                      <p className="text-muted text-center py-10 bg-card border border-card-border rounded-2xl">No projects found. Add one above.</p>
                    ) : ( 
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects.map(p => (
                          <div key={p.id} className="bg-card border border-card-border rounded-2xl flex flex-col overflow-hidden">
                            <div className="aspect-video w-full relative">
                              <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover" />
                            </div>
                            <div className="p-6 flex flex-col flex-1">
                              <h3 className="font-bold flex-1 text-lg mb-2">{p.title}</h3>
                              <p className="text-sm text-muted line-clamp-2 mb-4">{p.description}</p>
                              
                              <div className="flex items-center gap-3 mt-auto pt-4 border-t border-card-border">
                                <button onClick={() => handleEditClick(p)} className="flex-1 py-2 border border-card-border hover:border-primary/50 text-foreground rounded-lg transition-colors flex justify-center items-center gap-2 text-sm font-medium">
                                  <Edit size={14} /> Edit
                                </button>
                                <button onClick={() => handleDeleteProject(p.id)} className="flex-1 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg transition-colors flex justify-center items-center gap-2 text-sm font-medium">
                                  <Trash2 size={14} /> Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === "messages" && (
                <div className="space-y-4">
                  {messages.length === 0 ? (
                    <div className="text-center py-20 bg-card border border-card-border rounded-2xl">
                      <MessageSquare size={40} className="mx-auto text-muted mb-4 opacity-50" />
                      <p className="text-muted text-lg">No messages received yet.</p>
                    </div>
                  ) : null}
                  {messages.map(m => (
                    <div key={m.id} className="bg-card border border-card-border p-6 lg:p-8 rounded-2xl flex flex-col sm:flex-row justify-between gap-6 hover:border-primary/30 transition-colors shadow-sm">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-4 mb-4">
                          <h3 className="font-bold text-xl">{m.name}</h3>
                          <a href={`mailto:${m.email}`} className="text-primary hover:underline">{m.email}</a>
                          <span className="text-sm text-muted font-mono bg-background px-3 py-1 rounded-md">{new Date(m.date).toLocaleString()}</span>
                        </div>
                        <p className="text-muted leading-relaxed whitespace-pre-wrap">{m.message}</p>
                      </div>
                      <div className="flex items-start">
                        <button onClick={() => handleDeleteMessage(m.id)} className="text-red-400 hover:text-red-500 hover:bg-red-500/10 p-3 rounded-xl transition-colors h-fit flex items-center justify-center border border-transparent hover:border-red-500/20">
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
