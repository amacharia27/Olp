import { ThemeConfig } from 'antd';

export const antdTheme: ThemeConfig = {
  token: {
    // Brand Colors
    colorPrimary: '#00529B', // A professional blue
    colorInfo: '#00529B',
    
    // Success, Warning, Error
    colorSuccess: '#28a745',
    colorWarning: '#ffc107',
    colorError: '#dc3545',

    // Font
    fontFamily: "'Poppins', sans-serif",
    
    // Border Radius
    borderRadius: 6,
  },
  components: {
    Layout: {
      headerBg: '#ffffff',
      siderBg: '#001529',
    },
    Menu: {
      itemBg: '#001529',
      itemColor: 'rgba(255, 255, 255, 0.65)',
      itemSelectedBg: '#00529B',
      itemSelectedColor: '#ffffff',
      itemHoverColor: '#ffffff',
    },
    Button: {
      primaryShadow: '0 2px 0 rgba(0, 82, 155, 0.1)',
    }
  }
};