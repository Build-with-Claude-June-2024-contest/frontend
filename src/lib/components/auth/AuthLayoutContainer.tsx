import { Row } from 'antd';
import './LoginRegisterComponent.css';

const AuthLayoutContainer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <Row justify="center" align="middle" style={{ backgroundColor: '#f0f2f5' }}>
      {children}
    </Row>
  );
};

export default AuthLayoutContainer;
