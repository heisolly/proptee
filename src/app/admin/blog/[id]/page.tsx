import BlogEditor from '@/components/admin/BlogEditor';

export default function EditPostPage({ params }: { params: { id: string } }) {
  return <BlogEditor postId={params.id} />;
}
