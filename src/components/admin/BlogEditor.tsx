"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Type, 
  Image as ImageIcon, 
  Video, 
  List, 
  Trash2, 
  MoveUp, 
  MoveDown, 
  Heading1, 
  Heading2, 
  Plus,
  Save,
  ArrowLeft,
  Layout,
  Globe,
  Settings,
  X,
  ChevronDown,
  Monitor
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, Reorder, AnimatePresence } from "framer-motion";

interface Block {
  id: string;
  type: "heading" | "paragraph" | "image" | "video" | "list";
  content: any;
  level?: number;
}

export default function BlogEditor({ postId }: { postId?: string }) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [bannerImage, setBannerImage] = useState("");
  const [templateId, setTemplateId] = useState(1);
  const [categoryId, setCategoryId] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(!!postId);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchCategories();
    if (postId) fetchPost();
  }, [postId]);

  const fetchCategories = async () => {
    const { data } = await supabase.from("categories").select("*").eq("type", "blog");
    setCategories(data || []);
  };

  const fetchPost = async () => {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("id", postId)
      .single();
    
    if (data) {
      setTitle(data.title);
      setSlug(data.slug);
      setExcerpt(data.excerpt || "");
      setBannerImage(data.banner_image || "");
      setTemplateId(data.template_id);
      setCategoryId(data.category_id || "");
      setIsPublished(data.is_published);
      setBlocks(data.content || []);
    }
    setLoading(false);
  };

  const addBlock = (type: Block["type"]) => {
    const newBlock: Block = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      content: type === "list" ? [""] : "",
      level: type === "heading" ? 2 : undefined
    };
    setBlocks([...blocks, newBlock]);
  };

  const updateBlock = (id: string, content: any) => {
    setBlocks(blocks.map(b => b.id === id ? { ...b, content } : b));
  };

  const removeBlock = (id: string) => {
    setBlocks(blocks.filter(b => b.id !== id));
  };

  const moveBlock = (index: number, direction: "up" | "down") => {
    const newBlocks = [...blocks];
    if (direction === "up" && index > 0) {
      [newBlocks[index], newBlocks[index - 1]] = [newBlocks[index - 1], newBlocks[index]];
    } else if (direction === "down" && index < blocks.length - 1) {
      [newBlocks[index], newBlocks[index + 1]] = [newBlocks[index + 1], newBlocks[index]];
    }
    setBlocks(newBlocks);
  };

  const handleSave = async () => {
    if (!title) return alert("Title required for publication.");
    setSaving(true);
    const postData = {
      title,
      slug: slug || title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, ""),
      excerpt,
      banner_image: bannerImage,
      template_id: templateId,
      category_id: categoryId || null,
      is_published: isPublished,
      content: blocks,
      updated_at: new Date().toISOString()
    };

    let error;
    if (postId) {
      const res = await supabase.from("blog_posts").update(postData).eq("id", postId);
      error = res.error;
    } else {
      const res = await supabase.from("blog_posts").insert([postData]);
      error = res.error;
    }

    if (!error) {
      router.push("/admin/blog");
    } else {
      alert("Encryption error: " + error.message);
    }
    setSaving(false);
  };

  if (loading) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
      <div className="w-12 h-12 border-4 border-brand-emerald border-t-transparent rounded-full animate-spin" />
      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-dark/30 italic">Decrypting Archive...</p>
    </div>
  );

  return (
    <div className="max-w-[1400px] mx-auto space-y-12">
      {/* ── Studio Header ── */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm sticky top-28 z-40 backdrop-blur-xl bg-white/80">
        <div className="flex items-center gap-6">
          <Link href="/admin/blog" className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 hover:text-brand-dark hover:bg-white hover:shadow-md transition-all">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-serif text-brand-dark">Editorial Studio</h1>
            <p className="text-[10px] text-brand-dark/30 font-black uppercase tracking-widest mt-1">Curation Phase • {postId ? "Refining Mastery" : "New Narrative"}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="flex items-center gap-3 bg-gray-50 px-6 py-4 rounded-2xl border border-transparent">
            <Globe size={18} className={isPublished ? "text-brand-emerald" : "text-gray-300"} />
            <span className="text-[10px] font-black uppercase tracking-widest text-brand-dark/60">Visible</span>
            <input 
              type="checkbox" 
              checked={isPublished} 
              onChange={(e) => setIsPublished(e.target.checked)}
              className="w-5 h-5 accent-brand-emerald cursor-pointer"
            />
          </div>
          <button 
            onClick={handleSave}
            disabled={saving}
            className="flex-1 sm:flex-none flex items-center justify-center gap-3 bg-brand-dark text-white px-10 py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-brand-emerald transition-all shadow-xl shadow-brand-dark/10 disabled:opacity-50 group"
          >
            {saving ? (
              <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
              <Save size={18} className="group-hover:scale-110 transition-transform" />
            )}
            {saving ? "Syncing..." : "Commit Article"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* ── Immersive Canvas ── */}
        <div className="lg:col-span-8 space-y-10">
          <div className="bg-white p-12 sm:p-20 rounded-[4rem] shadow-sm border border-gray-100 relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gray-50/50 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 -z-0" />
            
            <div className="relative z-10 space-y-2">
              <textarea 
                placeholder="Evocative Title..." 
                className="w-full text-5xl sm:text-7xl font-serif bg-transparent border-none outline-none placeholder-gray-100 text-brand-dark resize-none leading-[1.1]"
                rows={2}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <div className="flex items-center gap-2 group">
                <span className="text-[10px] font-black uppercase tracking-widest text-brand-dark/20 group-focus-within:text-brand-emerald transition-colors">Permalink Context</span>
                <input 
                  type="text" 
                  placeholder="narrative-slug-structure" 
                  className="bg-transparent border-none outline-none text-xs text-brand-emerald font-medium italic w-full"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                />
              </div>

              <div className="pt-20 space-y-10 min-h-[600px]">
                <AnimatePresence>
                  {blocks.map((block, index) => (
                    <motion.div 
                      key={block.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="group relative pl-12 border-l border-transparent hover:border-brand-emerald/20 transition-all duration-500"
                    >
                      <div className="absolute -left-4 top-0 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform -translate-x-full pr-4">
                        <button onClick={() => moveBlock(index, "up")} className="p-2 bg-white border border-gray-100 text-gray-400 hover:text-brand-dark rounded-xl shadow-sm hover:shadow-md transition-all"><MoveUp size={14} /></button>
                        <button onClick={() => moveBlock(index, "down")} className="p-2 bg-white border border-gray-100 text-gray-400 hover:text-brand-dark rounded-xl shadow-sm hover:shadow-md transition-all"><MoveDown size={14} /></button>
                        <button onClick={() => removeBlock(block.id)} className="p-2 bg-red-50 text-red-300 hover:text-red-500 rounded-xl transition-all mt-4"><Trash2 size={14} /></button>
                      </div>

                      {block.type === "heading" && (
                        <input 
                          className={`w-full font-serif text-brand-dark bg-transparent border-none outline-none ${block.level === 3 ? "text-3xl" : "text-4xl"}`}
                          placeholder="Section Landmark..."
                          value={block.content}
                          onChange={(e) => updateBlock(block.id, e.target.value)}
                        />
                      )}

                      {block.type === "paragraph" && (
                        <textarea 
                          className="w-full text-lg sm:text-xl text-brand-dark/70 font-serif bg-transparent border-none outline-none leading-relaxed resize-none italic"
                          placeholder="Begin the journey..."
                          rows={1}
                          value={block.content}
                          onChange={(e) => {
                            updateBlock(block.id, e.target.value);
                            e.target.style.height = "auto";
                            e.target.style.height = e.target.scrollHeight + "px";
                          }}
                          onFocus={(e) => {
                            e.target.style.height = "auto";
                            e.target.style.height = e.target.scrollHeight + "px";
                          }}
                        />
                      )}

                      {block.type === "image" && (
                        <div className="space-y-4">
                           <div className="relative group/input">
                             <input 
                              className="w-full bg-gray-50 border border-transparent py-4 px-6 rounded-2xl outline-none focus:bg-white focus:border-brand-emerald/20 transition-all text-xs font-medium"
                              placeholder="Visual Asset URL (HD Image)..."
                              value={block.content}
                              onChange={(e) => updateBlock(block.id, e.target.value)}
                            />
                            <ImageIcon className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-200 group-focus-within/input:text-brand-emerald transition-colors" size={16} />
                           </div>
                          {block.content && (
                            <motion.img 
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              src={block.content} 
                              alt="Preview" 
                              className="w-full aspect-[21/9] rounded-[2rem] border border-gray-100 shadow-xl object-cover" 
                            />
                          )}
                        </div>
                      )}

                      {block.type === "video" && (
                        <div className="relative group/input">
                           <input 
                            className="w-full bg-gray-50 border border-transparent py-4 px-6 rounded-2xl outline-none focus:bg-white focus:border-brand-emerald/20 transition-all text-xs font-medium"
                            placeholder="Cinematic Sequence URL (YouTube/Vimeo)..."
                            value={block.content}
                            onChange={(e) => updateBlock(block.id, e.target.value)}
                          />
                          <Video className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-200 group-focus-within/input:text-brand-emerald transition-colors" size={16} />
                        </div>
                      )}

                      {block.type === "list" && (
                        <div className="space-y-3">
                          {block.content.map((item: string, i: number) => (
                            <div key={i} className="flex gap-4 items-center group/item">
                              <span className="w-1.5 h-1.5 rounded-full bg-brand-emerald"></span>
                              <input 
                                className="bg-transparent border-none outline-none flex-1 text-lg font-serif text-brand-dark/80"
                                placeholder="Key Narrative Insight..."
                                value={item}
                                onChange={(e) => {
                                  const newList = [...block.content];
                                  newList[i] = e.target.value;
                                  updateBlock(block.id, newList);
                                }}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    const newList = [...block.content, ""];
                                    updateBlock(block.id, newList);
                                    e.preventDefault();
                                  }
                                }}
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Instrument Bar */}
                <div className="pt-20 flex flex-wrap gap-4 justify-center">
                  <button onClick={() => addBlock("paragraph")} className="group flex flex-col items-center gap-3">
                    <div className="w-16 h-16 bg-white border border-gray-100 rounded-[1.5rem] flex items-center justify-center text-gray-300 group-hover:text-brand-emerald group-hover:border-brand-emerald/20 group-hover:shadow-xl group-hover:shadow-brand-emerald/5 transition-all duration-500"><Type size={20} /></div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-gray-400 group-hover:text-brand-dark transition-colors">Narration</span>
                  </button>
                  <button onClick={() => addBlock("heading")} className="group flex flex-col items-center gap-3">
                    <div className="w-16 h-16 bg-white border border-gray-100 rounded-[1.5rem] flex items-center justify-center text-gray-300 group-hover:text-brand-emerald group-hover:border-brand-emerald/20 group-hover:shadow-xl group-hover:shadow-brand-emerald/5 transition-all duration-500"><Heading1 size={20} /></div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-gray-400 group-hover:text-brand-dark transition-colors">Mark</span>
                  </button>
                  <button onClick={() => addBlock("image")} className="group flex flex-col items-center gap-3">
                    <div className="w-16 h-16 bg-white border border-gray-100 rounded-[1.5rem] flex items-center justify-center text-gray-300 group-hover:text-brand-emerald group-hover:border-brand-emerald/20 group-hover:shadow-xl group-hover:shadow-brand-emerald/5 transition-all duration-500"><ImageIcon size={20} /></div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-gray-400 group-hover:text-brand-dark transition-colors">Visual</span>
                  </button>
                  <button onClick={() => addBlock("video")} className="group flex flex-col items-center gap-3">
                    <div className="w-16 h-16 bg-white border border-gray-100 rounded-[1.5rem] flex items-center justify-center text-gray-300 group-hover:text-brand-emerald group-hover:border-brand-emerald/20 group-hover:shadow-xl group-hover:shadow-brand-emerald/5 transition-all duration-500"><Video size={20} /></div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-gray-400 group-hover:text-brand-dark transition-colors">Sequence</span>
                  </button>
                  <button onClick={() => addBlock("list")} className="group flex flex-col items-center gap-3">
                    <div className="w-16 h-16 bg-white border border-gray-100 rounded-[1.5rem] flex items-center justify-center text-gray-300 group-hover:text-brand-emerald group-hover:border-brand-emerald/20 group-hover:shadow-xl group-hover:shadow-brand-emerald/5 transition-all duration-500"><List size={20} /></div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-gray-400 group-hover:text-brand-dark transition-colors">Indices</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Metadata Protocols ── */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm space-y-10">
            <div>
              <h3 className="text-xl font-serif text-brand-dark flex items-center gap-3"><Settings size={20} className="text-brand-emerald" /> Core Protocols</h3>
              <p className="text-[9px] text-brand-dark/30 font-black uppercase tracking-widest mt-1">Classification & Metadata</p>
            </div>
            
            <div className="space-y-8">
              <div className="space-y-3">
                <label className="block text-[10px] font-black uppercase tracking-widest text-brand-dark/40 ml-1">Editorial Domain</label>
                <div className="relative">
                  <select 
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full bg-gray-50 border border-transparent py-4 px-6 rounded-2xl outline-none focus:bg-white focus:border-brand-emerald/20 transition-all text-sm font-medium appearance-none cursor-pointer"
                  >
                    <option value="">General Archive</option>
                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                  <ChevronDown size={14} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-[10px] font-black uppercase tracking-widest text-brand-dark/40 ml-1">Protagonist Imagery</label>
                <div className="flex gap-2">
                  <input 
                    value={bannerImage}
                    onChange={(e) => setBannerImage(e.target.value)}
                    className="flex-1 bg-gray-50 border border-transparent py-4 px-6 rounded-2xl outline-none focus:bg-white focus:border-brand-emerald/20 transition-all text-xs font-medium"
                    placeholder="Masterpiece URL..."
                  />
                </div>
                {bannerImage && (
                  <motion.img 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    src={bannerImage} 
                    alt="Hero" 
                    className="w-full aspect-[16/10] rounded-[2rem] object-cover border border-gray-100 shadow-lg mt-4" 
                  />
                )}
              </div>

              <div className="space-y-3">
                <label className="block text-[10px] font-black uppercase tracking-widest text-brand-dark/40 ml-1">Executive Summary</label>
                <textarea 
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  className="w-full bg-gray-50 border border-transparent py-4 px-6 rounded-2xl outline-none focus:bg-white focus:border-brand-emerald/20 transition-all text-sm font-medium resize-none"
                  rows={5}
                  placeholder="The narrative hook..."
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm">
            <h3 className="text-xl font-serif text-brand-dark flex items-center gap-3 mb-8"><Layout size={20} className="text-brand-emerald" /> Aesthetic Blueprint</h3>
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((id) => (
                <button
                  key={id}
                  onClick={() => setTemplateId(id)}
                  className={`relative p-6 rounded-[2rem] border-2 transition-all flex flex-col items-center gap-3 overflow-hidden group ${
                    templateId === id ? "border-brand-emerald bg-brand-emerald/5" : "border-gray-50 hover:border-gray-100"
                  }`}
                >
                  <div className={`w-full aspect-video rounded-xl flex items-center justify-center text-[10px] font-black uppercase tracking-widest transition-all ${
                    templateId === id ? "bg-brand-emerald text-white" : "bg-gray-50 text-gray-300 group-hover:bg-gray-100"
                  }`}>
                    {id === 1 ? "Classic" : id === 2 ? "Glass" : id === 3 ? "Split" : "Zen"}
                  </div>
                  <span className={`text-[9px] font-black uppercase tracking-widest ${templateId === id ? "text-brand-emerald" : "text-gray-400"}`}>Blueprint 0{id}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
