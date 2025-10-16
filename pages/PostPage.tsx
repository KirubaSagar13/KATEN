import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../components/Sidebar';

interface Post {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  date: string;
  author: number;
  featured_media: number;
}

const PostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [author, setAuthor] = useState('Unknown');
  const [image, setImage] = useState('https://themeger.shop/wordpress/katen/wp-content/uploads/2022/08/default.jpg');

  useEffect(() => {
    if (!id) return;
    axios.get(`https://themeger.shop/wordpress/katen/wp-json/wp/v2/posts/${id}`)
      .then(async (res) => {
        setPost(res.data);
        const a = await axios.get(`https://themeger.shop/wordpress/katen/wp-json/wp/v2/users/${res.data.author}`).catch(() => ({ data: { name: 'Author' } }));
        setAuthor(a.data.name);
        if (res.data.featured_media) {
          const m = await axios.get(`https://themeger.shop/wordpress/katen/wp-json/wp/v2/media/${res.data.featured_media}`)
            .catch(() => ({ data: { source_url: image } }));
          setImage(m.data.source_url);
        }
      })
      .catch(err => console.error(err));
  }, [id]);

  if (!post) return <div style={{ textAlign: 'center', marginTop: 60 }}>Loading...</div>;

  return (
    <main style={{ maxWidth: 1200, margin: '40px auto 80px auto', padding: '0 20px' }}>
      <div style={{ display: 'flex', gap: 40 }}>
        <div style={{ flex: 3, maxWidth: 900 }}>
          <h1 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
          <img src={image} alt="" style={{ width: '100%', height: 420, objectFit: 'cover', borderRadius: 10, margin: '18px 0' }} />
          <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} style={{ lineHeight: 1.7, color: '#333' }} />
          <p style={{ color: '#888', marginTop: 20 }}>By {author} • {new Date(post.date).toDateString()}</p>
        </div>

        <div style={{ flex: 1 }}>
          <Sidebar />
        </div>
      </div>
    </main>
  );
};

export default PostPage;
