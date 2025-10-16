import React from 'react';
import { Link } from 'react-router-dom';

interface PostCardProps {
  id: number;
  image: string;
  title: string;
  author: string;
  date: string;
  excerpt: string;
}

const PostCard: React.FC<PostCardProps> = ({ id, image, title, author, date, excerpt }) => {
  return (
    <div
      className="post-card"
      style={{
        width: '750px',
        height: '600px',
        borderRadius: 10,
        overflow: 'hidden',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        transition: 'transform .25s, box-shadow .25s',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#fff',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-6px)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 16px 36px rgba(0,0,0,0.14)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
      }}
    >
      {/* Image */}
      <Link to={`/post/${id}`}>
        <img
          src={image}
          alt={title}
          style={{
            width: '100%',
            height: '360px',
            objectFit: 'cover',
            display: 'block',
          }}
        />
      </Link>

      {/* Post Info */}
      <div style={{ padding: '22px 26px', flex: 1 }}>
        <h3 style={{ margin: '0 0 10px', fontSize: 22, lineHeight: 1.25 }}>
          <Link to={`/post/${id}`} style={{ color: '#222', textDecoration: 'none' }}>
            {title}
          </Link>
        </h3>

        <p style={{ fontSize: 14, color: '#777', marginBottom: 12 }}>
          By {author} • {date}
        </p>

        <p style={{ fontSize: 15, color: '#555', lineHeight: 1.6 }}>
          {excerpt.length > 160 ? excerpt.slice(0, 160) + '...' : excerpt}
        </p>
      </div>
    </div>
  );
};

export default PostCard;
