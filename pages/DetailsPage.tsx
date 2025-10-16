import React from 'react';

const DetailsPage: React.FC = () => {
  return (
    <div style={{ maxWidth: '900px', margin: '40px auto', padding: '0 20px' }}>
      <h1>Details Page</h1>
      <p>
        Welcome to the Details page! You can add any content here, such as information about your blog,
        services, or any other details you want your visitors to see.
      </p>

      <p style={{ marginTop: '20px', lineHeight: 1.6, color: '#555' }}>
        This page is fully responsive and uses the same layout as other pages on your website. You can
        expand this section with images, lists, or other components as needed.
      </p>
    </div>
  );
};

export default DetailsPage;
