import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Post {
  id: number;
  title: { rendered: string };
  date: string;
}

const Sidebar: React.FC = () => {
  const [popularPosts, setPopularPosts] = useState<Post[]>([]);
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);

  useEffect(() => {
    // Popular Posts
    axios
      .get('http://reactwpbackend.local/wp-json/wp/v2/posts?per_page=5&_sort=date&_order=desc')
      .then((res) => setPopularPosts(res.data))
      .catch((err) => console.error(err));

    // Related Blog
    axios
      .get('http://reactwpbackend.local/wp-json/wp/v2/posts?per_page=3&_sort=date&_order=desc')
      .then((res) => setRelatedPosts(res.data))
      .catch((err) => console.error(err));
  }, []);

  const boxStyle: React.CSSProperties = {
    background: '#fff',
    borderRadius: 10,
    padding: 20,
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    marginBottom: 30,
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* About Us */}
      <div style={boxStyle}>
        <h3>About Us</h3>
        <p style={{ color: '#555', fontSize: 14 }}>
          We are a team of passionate writers sharing tips, trends and insights across architecture and lifestyle.
        </p>
      </div>

      {/* Popular Posts */}
      <div style={boxStyle}>
        <h3>Popular Posts</h3>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {popularPosts.map((p) => (
            <li key={p.id} style={{ marginBottom: 12 }}>
              <Link to={`/post/${p.id}`} style={{ textDecoration: 'none', color: '#222' }}>
                {p.title.rendered}
              </Link>
              <div style={{ fontSize: 12, color: '#888' }}>{new Date(p.date).toDateString()}</div>
            </li>
          ))}
        </ul>
      </div>

      {/* Related Blog */}
      <div style={boxStyle}>
        <h3>Related Blog</h3>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {relatedPosts.map((p) => (
            <li key={p.id} style={{ marginBottom: 12 }}>
              <Link to={`/post/${p.id}`} style={{ textDecoration: 'none', color: '#222' }}>
                {p.title.rendered}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Instagram */}
      <div style={boxStyle}>
        <h3>Instagram</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          <img src="https://via.placeholder.com/80" alt="ig" style={{ width: 80, height: 80, borderRadius: 6 }} />
          <img src="https://via.placeholder.com/80" alt="ig" style={{ width: 80, height: 80, borderRadius: 6 }} />
          <img src="https://via.placeholder.com/80" alt="ig" style={{ width: 80, height: 80, borderRadius: 6 }} />
        </div>
        <p style={{ marginTop: 10, fontSize: 13 }}>
          Follow us: <a href="https://instagram.com" target="_blank" rel="noreferrer">@yourid</a>
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
