import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HeroSlider from '../components/HeroSlider';
import PostCard from '../components/PostCard';
import Sidebar from '../components/Sidebar';

interface Post {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  author: number;
  date: string;
  featured_media: number;
}

const HomePage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [authors, setAuthors] = useState<Record<number, string>>({});
  const [images, setImages] = useState<Record<number, string>>({});

  useEffect(() => {
    axios
      .get('http://reactwpbackend.local/wp-json/wp/v2/posts?_embed')
      .then(async (res) => {
        const postsData = res.data as Post[];
        setPosts(postsData);

        // Fetch author names
        const authorPromises = postsData.map((p) =>
          axios
            .get(`http://reactwpbackend.local/wp-json/wp/v2/users/${p.author}`)
            .catch(() => ({ data: { id: p.author, name: 'Author' } }))
        );
        const authorResults = await Promise.all(authorPromises);
        const authorsMap: Record<number, string> = {};
        authorResults.forEach((r: any) => {
          if (r?.data) authorsMap[r.data.id] = r.data.name;
        });
        setAuthors(authorsMap);

        // Fetch featured images
        const mediaPromises = postsData.map((p) =>
          axios
            .get(`http://reactwpbackend.local/wp-json/wp/v2/media/${p.featured_media}`)
            .catch(() => ({
              data: {
                source_url:
                  'https://themeger.shop/wordpress/katen/wp-content/uploads/2022/08/default.jpg',
              },
            }))
        );
        const mediaResults = await Promise.all(mediaPromises);
        const imagesMap: Record<number, string> = {};
        mediaResults.forEach((r: any, i: number) => {
          imagesMap[postsData[i].id] = r.data.source_url;
        });
        setImages(imagesMap);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <main
      style={{
        maxWidth: '1180px',
        margin: '0 auto',
        padding: '0 20px',
      }}
    >
      {/* Hero Slider */}
      <section style={{ margin: '40px 0 60px 0' }}>
        <HeroSlider />
      </section>

      {/* Posts and Sidebar */}
      <section
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '30px',
        }}
      >
        {/* Posts section */}
        <div style={{ flex: '2.75' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '40px',
            }}
          >
            {posts.slice(0, 5).map((p) => (
              <PostCard
                key={p.id}
                id={p.id}
                image={
                  images[p.id] ||
                  'https://themeger.shop/wordpress/katen/wp-content/uploads/2022/08/default.jpg'
                }
                title={p.title.rendered}
                author={authors[p.author] || 'Unknown'}
                date={new Date(p.date).toDateString()}
                excerpt={p.excerpt.rendered.replace(/<\/?[^>]+(>|$)/g, '')}
              />
            ))}
          </div>
        </div>

        {/* Sidebar section */}
        <aside style={{ flex: '1.25', marginTop: 0 }}>
          <Sidebar />
        </aside>
      </section>
    </main>
  );
};

export default HomePage;
