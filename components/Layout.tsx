import React, { ReactNode } from 'react';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ flex: 3, maxWidth: '900px' }}>{children}</div>
        <div style={{ flex: 1, marginLeft: '40px' }}>
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default Layout;
