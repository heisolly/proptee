'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
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
  Settings
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Block {
  id: string;
  type: 'heading' | 'paragraph' | 'image' | 'video' | 'list';
  content: any;
  level?: number;
}

export default function BlogEditor({ postId }: { postId?: string }) {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [bannerImage, setBannerImage] = useState('');
  const [templateId, setTemplateId] = useState(1);
  const [categoryId, setCategoryId] = useState('');
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
    const { data } = await supabase.from('categories').select('*').eq('type', 'blog');
    setCategories(data || []);
  };

  const fetchPost = async () => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('id', postId)
      .single();
    
    if (data) {
      setTitle(data.title);
      setSlug(data.slug);
      setExcerpt(data.excerpt || '');
      setBannerImage(data.banner_image || '');
      setTemplateId(data.template_id);
      setCategoryId(data.category_id || '');
      setIsPublished(data.is_published);
      setBlocks(data.content || []);
    }
    setLoading(false);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, blockId?: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `blog/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('images')
      .upload(filePath, file);

    if (uploadError) {
      alert('Error uploading image: ' + uploadError.message);
      return;
    }

    const { data } = supabase.storage.from('images').getPublicUrl(filePath);
    const publicUrl = data.publicUrl;

    if (blockId) {
      updateBlock(blockId, publicUrl);
    } else {
      setBannerImage(publicUrl);
    }
  };

  const addBlock = (type: Block['type']) => {
    const newBlock: Block = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      content: type === 'list' ? [''] : '',
      level: type === 'heading' ? 2 : undefined
    };
    setBlocks([...blocks, newBlock]);
  };

  const updateBlock = (id: string, content: any) => {
    setBlocks(blocks.map(b => b.id === id ? { ...b, content } : b));
  };

  const removeBlock = (id: string) => {
    setBlocks(blocks.filter(b => b.id !== id));
  };

  const moveBlock = (index: number, direction: 'up' | 'down') => {
    const newBlocks = [...blocks];
    if (direction === 'up' && index > 0) {
      [newBlocks[index], newBlocks[index - 1]] = [newBlocks[index - 1], newBlocks[index]];
    } else if (direction === 'down' && index < blocks.length - 1) {
      [newBlocks[index], newBlocks[index + 1]] = [newBlocks[index + 1], newBlocks[index]];
    }
    setBlocks(newBlocks);
  };

  const handleSave = async () => {
    setSaving(true);
    const postData = {
      title,
      slug: slug || title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
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
      const res = await supabase.from('blog_posts').update(postData).eq('id', postId);
      error = res.error;
    } else {
      const res = await supabase.from('blog_posts').insert([postData]);
      error = res.error;
    }

    if (!error) {
      router.push('/admin/blog');
    } else {
      alert('Error saving post: ' + error.message);
    }
    setSaving(false);
  };

  if (loading) return <div className="p-8 text-center text-[#6B7280]">Loading Editor...</div>;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Top Actions */}
      <div className="flex justify-between items-center sticky top-20 bg-[#F2F2F2] py-4 z-30">
        <Link href="/admin/blog" className="flex items-center gap-2 text-[#6B7280] hover:text-[#000000] font-medium transition-colors">
          <ArrowLeft size={20} /> Back to Posts
        </Link>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-[#E0E0E0]">
            <Globe size={18} className={isPublished ? 'text-[#1F7A5C]' : 'text-[#6B7280]'} />
            <span className="text-sm font-bold text-[#000000]">Public</span>
            <input 
              type="checkbox" 
              checked={isPublished} 
              onChange={(e) => setIsPublished(e.target.checked)}
              className="w-4 h-4 accent-[#0F3D2E]"
            />
          </div>
          <button 
            onClick={handleSave}
            disabled={saving}
            className="bg-[#0F3D2E] text-white px-8 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-[#1F7A5C] transition-colors shadow-lg disabled:opacity-50"
          >
            <Save size={18} /> {saving ? 'Saving...' : 'Save Post'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Editor */}
        <div className="lg:col-span-3 space-y-8">
          <div className="bg-white p-10 rounded-2xl shadow-sm border border-[#E0E0E0]">
            <input 
              type="text" 
              placeholder="Post Title..." 
              className="w-full text-4xl font-bold bg-transparent border-none outline-none placeholder-[#F2F2F2] text-[#000000] mb-4"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input 
              type="text" 
              placeholder="custom-slug-here" 
              className="w-full text-sm text-[#6B7280] bg-transparent border-none outline-none mb-10 italic"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
            />

            <div className="space-y-6 min-h-[400px]">
              {blocks.map((block, index) => (
                <div key={block.id} className="group relative border-l-2 border-transparent hover:border-[#1F7A5C] pl-6 transition-all">
                  <div className="absolute -left-12 top-0 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => moveBlock(index, 'up')} className="p-1 hover:bg-[#F2F2F2] rounded"><MoveUp size={14} /></button>
                    <button onClick={() => moveBlock(index, 'down')} className="p-1 hover:bg-[#F2F2F2] rounded"><MoveDown size={14} /></button>
                    <button onClick={() => removeBlock(block.id)} className="p-1 hover:bg-red-50 text-red-500 rounded"><Trash2 size={14} /></button>
                  </div>

                  {block.type === 'heading' && (
                    <input 
                      className={`w-full font-bold text-[#000000] bg-transparent border-none outline-none ${block.level === 3 ? 'text-xl' : 'text-2xl'}`}
                      placeholder="Enter heading..."
                      value={block.content}
                      onChange={(e) => updateBlock(block.id, e.target.value)}
                    />
                  )}

                  {block.type === 'paragraph' && (
                    <textarea 
                      className="w-full text-[#000000] bg-transparent border-none outline-none leading-relaxed resize-none"
                      placeholder="Start writing..."
                      rows={1}
                      value={block.content}
                      onChange={(e) => {
                        updateBlock(block.id, e.target.value);
                        e.target.style.height = 'auto';
                        e.target.style.height = e.target.scrollHeight + 'px';
                      }}
                      onFocus={(e) => {
                        e.target.style.height = 'auto';
                        e.target.style.height = e.target.scrollHeight + 'px';
                      }}
                    />
                  )}

                  {block.type === 'image' && (
                    <div className="space-y-2">
                       <input 
                        className="w-full px-4 py-2 text-sm border border-[#E0E0E0] rounded-lg"
                        placeholder="Paste image URL..."
                        value={block.content}
                        onChange={(e) => updateBlock(block.id, e.target.value)}
                      />
                      {block.content && (
                        <img src={block.content} alt="Preview" className="max-h-[300px] rounded-lg border border-[#E0E0E0] object-cover" />
                      )}
                    </div>
                  )}

                  {block.type === 'video' && (
                    <div className="space-y-2">
                       <input 
                        className="w-full px-4 py-2 text-sm border border-[#E0E0E0] rounded-lg"
                        placeholder="Paste video URL (YouTube, Vimeo)..."
                        value={block.content}
                        onChange={(e) => updateBlock(block.id, e.target.value)}
                      />
                    </div>
                  )}

                  {block.type === 'list' && (
                    <div className="space-y-2">
                      {block.content.map((item: string, i: number) => (
                        <div key={i} className="flex gap-2 items-center">
                          <span className="w-2 h-2 rounded-full bg-[#0F3D2E]"></span>
                          <input 
                            className="bg-transparent border-none outline-none flex-1"
                            value={item}
                            onChange={(e) => {
                              const newList = [...block.content];
                              newList[i] = e.target.value;
                              updateBlock(block.id, newList);
                            }}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                const newList = [...block.content, ''];
                                updateBlock(block.id, newList);
                                e.preventDefault();
                              }
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <div className="pt-10 flex gap-4 justify-center border-t border-[#F2F2F2]">
                <button onClick={() => addBlock('paragraph')} className="flex flex-col items-center gap-1 text-[#6B7280] hover:text-[#0F3D2E] transition-colors">
                  <div className="p-3 bg-white border border-[#E0E0E0] rounded-xl"><Type size={20} /></div>
                  <span className="text-xs font-bold uppercase">Text</span>
                </button>
                <button onClick={() => addBlock('heading')} className="flex flex-col items-center gap-1 text-[#6B7280] hover:text-[#0F3D2E] transition-colors">
                  <div className="p-3 bg-white border border-[#E0E0E0] rounded-xl"><Heading2 size={20} /></div>
                  <span className="text-xs font-bold uppercase">Heading</span>
                </button>
                <button onClick={() => addBlock('image')} className="flex flex-col items-center gap-1 text-[#6B7280] hover:text-[#0F3D2E] transition-colors">
                  <div className="p-3 bg-white border border-[#E0E0E0] rounded-xl"><ImageIcon size={20} /></div>
                  <span className="text-xs font-bold uppercase">Image</span>
                </button>
                <button onClick={() => addBlock('video')} className="flex flex-col items-center gap-1 text-[#6B7280] hover:text-[#0F3D2E] transition-colors">
                  <div className="p-3 bg-white border border-[#E0E0E0] rounded-xl"><Video size={20} /></div>
                  <span className="text-xs font-bold uppercase">Video</span>
                </button>
                <button onClick={() => addBlock('list')} className="flex flex-col items-center gap-1 text-[#6B7280] hover:text-[#0F3D2E] transition-colors">
                  <div className="p-3 bg-white border border-[#E0E0E0] rounded-xl"><List size={20} /></div>
                  <span className="text-xs font-bold uppercase">List</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Controls */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-[#E0E0E0] shadow-sm">
            <h3 className="font-bold flex items-center gap-2 mb-6"><Settings size={18} /> Settings</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#000000] uppercase mb-1">Category</label>
                <select 
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-[#E0E0E0] rounded-lg focus:ring-1 focus:ring-[#0F3D2E] outline-none"
                >
                  <option value="">Uncategorized</option>
                  {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#000000] uppercase mb-1">Banner Image</label>
                <div className="flex gap-2 mb-2">
                  <input 
                    value={bannerImage}
                    onChange={(e) => setBannerImage(e.target.value)}
                    className="flex-1 px-3 py-2 text-sm border border-[#E0E0E0] rounded-lg outline-none"
                    placeholder="URL..."
                  />
                  <label className="bg-[#F2F2F2] p-2 rounded-lg cursor-pointer hover:bg-[#E0E0E0]">
                    <ImageIcon size={16} />
                    <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e)} />
                  </label>
                </div>
                {bannerImage && (
                  <img src={bannerImage} alt="Banner" className="w-full aspect-video rounded-lg object-cover border border-[#E0E0E0]" />
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-[#000000] uppercase mb-1">Excerpt</label>
                <textarea 
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-[#E0E0E0] rounded-lg outline-none"
                  rows={4}
                  placeholder="Brief summary..."
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-[#E0E0E0] shadow-sm">
            <h3 className="font-bold flex items-center gap-2 mb-6"><Layout size={18} /> Styling Template</h3>
            <div className="grid grid-cols-2 gap-3">
              {[1, 2, 3, 4, 5, 6, 7].map((id) => (
                <button
                  key={id}
                  onClick={() => setTemplateId(id)}
                  className={`p-4 rounded-lg border-2 transition-all flex flex-col items-center gap-2 ${
                    templateId === id ? 'border-[#0F3D2E] bg-[#0F3D2E]/5' : 'border-[#F2F2F2] hover:border-[#E0E0E0]'
                  }`}
                >
                  <div className="w-full aspect-video bg-[#F2F2F2] rounded flex items-center justify-center text-xs font-bold">
                    T{id}
                  </div>
                  <span className="text-xs font-bold">Template {id}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
