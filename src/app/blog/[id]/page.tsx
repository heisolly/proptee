export async function generateMetadata({ params }: { params: { id: string } }) {
  const { data: post } = await supabase
    .from('blog_posts')
    .select('title, excerpt, banner_image')
    .eq('id', params.id)
    .single();

  if (!post) return { title: 'Post Not Found - Proptee' };

  return {
    title: `${post.title} - Proptee Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.banner_image ? [post.banner_image] : [],
    },
  };
}

export default async function BlogPostPage({ params }: { params: { id: string } }) {
  const { data: post, error } = await supabase
    .from('blog_posts')
    .select('*, categories(name)')
    .eq('id', params.id)
    .single();

  if (error || !post) {
    return (
      <main className="min-h-screen font-sans bg-[#f7f7f7]">
        <Header />
        <div className="container mx-auto px-4 py-32 text-center">
          <h1 className="text-2xl font-bold mb-4">Post not found</h1>
          <Link href="/blog" className="text-[#0F3D2E] font-bold hover:underline">Back to Blog</Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen font-sans">
      <Header />
      <div className="pt-20">
        <BlogRenderer post={post} />
      </div>
      <div className="container mx-auto px-6 py-12 border-t border-[#F2F2F2]">
        <Link href="/blog" className="flex items-center gap-2 text-[#6B7280] hover:text-[#000000] font-bold transition-colors">
          <ArrowLeft size={18} /> BACK TO ALL POSTS
        </Link>
      </div>
      <Footer />
    </main>
  );
}
