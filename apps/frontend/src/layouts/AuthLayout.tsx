// apps/frontend/src/layouts/AuthLayout.tsx
import { Outlet } from 'react-router-dom';
import { Typography } from 'antd';
import heroImage from '@/assets/Wanjiru.png';
import './AuthLayout.css'; // Import our new CSS

const { Title } = Typography;

const AuthLayout = () => {
  return (
    <div className="auth-layout">
      <div className="auth-container">
        {/* Left Panel: Form */}
        <div className="form-panel">
          <Outlet />
        </div>

        {/* Right Panel: Image */}
        <div className="image-panel" style={{ backgroundImage: `url(${heroImage})` }}>
          <div className="image-overlay"></div>
          <div className="overlay-text">
            <Title level={2} style={{ color: 'white', fontWeight: 600 }}>
              Empowering Kenya's Future,
            </Title>
            <Title level={3} style={{ color: 'white', marginTop: 0, opacity: 0.9 }}>
              One Student at a Time.
            </Title>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;