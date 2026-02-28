'use client';

import React from 'react';
import { Calendar, Tag, ChevronRight } from 'lucide-react';

interface Block {
  id: string;
  type: 'heading' | 'paragraph' | 'image' | 'video' | 'list';
  content: any;
  level?: number;
}

interface Post {
  title: string;
  content: Block[];
  banner_image?: string;
  created_at: string;
  categories?: { name: string };
  template_id: number;
}

const RenderBlock = ({ block }: { block: Block }) => {
  switch (block.type) {
    case 'heading':
      const Tag = `h${block.level || 2}` as keyof JSX.IntrinsicElements;
      return <Tag className="font-bold text-[#000000] my-6">{block.content}</Tag>;
    case 'paragraph':
      return <p className="text-[#4d4d4d] leading-relaxed my-4 whitespace-pre-wrap">{block.content}</p>;
    case 'image':
      return (
        <figure className="my-8">
          <img src={block.content} alt="" className="w-full rounded-xl shadow-lg" />
        </figure>
      );
    case 'video':
      return (
        <div className="my-8 aspect-video rounded-xl overflow-hidden shadow-lg bg-black">
          {/* Simple embed logic or placeholder */}
          <iframe 
            src={block.content.replace('watch?v=', 'embed/')} 
            className="w-full h-full"
            allowFullScreen
          ></iframe>
        </div>
      );
    case 'list':
      return (
        <ul className="my-6 space-y-2">
          {block.content.map((item: string, i: number) => (
            <li key={i} className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0F3D2E] mt-2.5 flex-shrink-0"></span>
              <span className="text-[#4d4d4d]">{item}</span>
            </li>
          ))}
        </ul>
      );
    default:
      return null;
  }
};

export default function BlogRenderer({ post }: { post: Post }) {
  const { template_id } = post;

  // Template Wrappers
  const templates: Record<number, React.FC<{ children: React.ReactNode }>> = {
    1: ({ children }) => (
      <article className="max-w-4xl mx-auto py-12 px-6">
        {post.banner_image && <img src={post.banner_image} className="w-full h-[450px] object-cover rounded-3xl mb-12 shadow-2xl" />}
        <div className="flex items-center gap-4 text-sm text-[#6B7280] mb-6">
          <span className="flex items-center gap-1"><Calendar size={14} /> {new Date(post.created_at).toLocaleDateString()}</span>
          <span className="flex items-center gap-1 font-bold text-[#0F3D2E] uppercase"><Tag size={14} /> {post.categories?.name || 'News'}</span>
        </div>
        <h1 className="text-5xl font-extrabold text-[#000000] mb-10 leading-tight">{post.title}</h1>
        <div className="prose prose-lg max-w-none">{children}</div>
      </article>
    ),
    2: ({ children }) => (
      <article className="py-20 bg-[#F2F2F2]">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="sticky top-24">
            <h1 className="text-6xl font-black text-[#000000] mb-8 leading-none uppercase tracking-tighter">{post.title}</h1>
            {post.banner_image && <img src={post.banner_image} className="w-full aspect-square object-cover rounded-[40px] shadow-2xl" />}
          </div>
          <div className="bg-white p-12 rounded-[40px] shadow-xl">
             <div className="prose prose-lg max-w-none">{children}</div>
          </div>
        </div>
      </article>
    ),
    3: ({ children }) => (
      <article className="max-w-3xl mx-auto py-24 px-6 text-center">
        <span className="text-[#1F7A5C] font-bold tracking-[0.3em] uppercase block mb-6">{post.categories?.name || 'Journal'}</span>
        <h1 className="text-4xl font-light text-[#000000] mb-16 italic font-serif">"{post.title}"</h1>
        <div className="text-left prose prose-lg mx-auto">{children}</div>
      </article>
    ),
    4: ({ children }) => (
      <article className="bg-[#000000] text-white py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="border-l-4 border-[#0F3D2E] pl-8 mb-16">
            <h1 className="text-6xl font-black mb-4">{post.title}</h1>
            <p className="text-[#1F7A5C] font-bold uppercase tracking-widest">{post.categories?.name}</p>
          </div>
          {post.banner_image && <img src={post.banner_image} className="w-full h-[600px] object-cover rounded-sm mb-16 grayscale hover:grayscale-0 transition-all duration-1000" />}
          <div className="prose prose-invert prose-emerald max-w-none opacity-90">{children}</div>
        </div>
      </article>
    ),
    5: ({ children }) => (
      <article className="py-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-12 mb-20">
            <h1 className="text-8xl font-black text-[#000000] flex-1 min-w-[300px] break-words">{post.title}</h1>
            <div className="w-full lg:w-96 flex flex-col justify-end">
              <p className="text-xl text-[#6B7280] font-medium border-t-2 border-[#0F3D2E] pt-6">{post.categories?.name}</p>
              <p className="text-sm mt-2">{new Date(post.created_at).toDateString()}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 space-y-12">
              {children}
            </div>
            <div className="lg:col-span-4 self-start sticky top-24">
              {post.banner_image && <img src={post.banner_image} className="w-full h-[500px] object-cover rounded-3xl rotate-3 hover:rotate-0 transition-transform duration-500" />}
            </div>
          </div>
        </div>
      </article>
    ),
    6: ({ children }) => (
       <article className="max-w-4xl mx-auto py-12 px-6">
        <div className="border-2 border-[#E0E0E0] p-12 rounded-3xl bg-white shadow-sm">
          <div className="text-center border-b border-[#F2F2F2] pb-12 mb-12">
            <h1 className="text-4xl font-bold text-[#000000] mb-4">{post.title}</h1>
            <p className="text-[#6B7280]">{new Date(post.created_at).toLocaleDateString()}</p>
          </div>
          <div className="prose max-w-none px-6">
            {children}
          </div>
        </div>
      </article>
    ),
    7: ({ children }) => (
      <article className="max-w-7xl mx-auto py-20 px-6">
        <div className="columns-1 md:columns-2 gap-12 space-y-8">
          <div className="break-inside-avoid">
            <h1 className="text-5xl font-bold text-[#000000] mb-8 leading-tight">{post.title}</h1>
            {post.banner_image && <img src={post.banner_image} className="w-full rounded-2xl mb-8" />}
          </div>
          <div className="prose prose-lg max-w-none text-[#4d4d4d]">
            {children}
          </div>
        </div>
      </article>
    )
  };

  const Wrapper = templates[template_id] || templates[1];

  return (
    <Wrapper>
      {post.content.map((block) => (
        <RenderBlock key={block.id} block={block} />
      ))}
    </Wrapper>
  );
}
