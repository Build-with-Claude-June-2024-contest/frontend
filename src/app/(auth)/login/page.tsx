'use client';

import { Col } from 'antd';
import Image from 'next/image';

import AuthLayoutContainer from '~/lib/components/auth/AuthLayoutContainer';
import { LoginForm } from '~/lib/components/auth/Login';
import '~/lib/components/auth/LoginRegisterComponent.css';
import SocialLogin from '~/lib/components/auth/SocialLogin';
import { useRedirectIfAuthenticated } from '~/lib/components/hooks/useRedirectIfAuthenticated';

const Login = () => {
  useRedirectIfAuthenticated();

  return (
    <AuthLayoutContainer>
      <Col
        xs={0}
        md={12}
        className="image-col"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#f0f2f5',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            width: '100%',
            // aspectRatio: '1',
            height: 'auto',
          }}
        >
          <Image
            src="https://via.placeholder.com/300"
            alt="Illustration"
            fill
            sizes="400px"
            style={{
              objectFit: 'cover',
            }}
          />
        </div>
      </Col>
      <Col
        xs={24}
        md={12}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '40px 20px',
          backgroundColor: '#fff',
        }}
      >
        <div style={{ width: '100%', maxWidth: '400px' }}>
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: 'auto',
              maxWidth: '300px',
              aspectRatio: '1/1',
              margin: '0 auto',
            }}
          >
            <Image
              src="/fiona_ai_logo.png"
              alt="logo"
              fill
              sizes="300px"
              style={{ objectFit: 'contain' }}
            />
          </div>
          <LoginForm />
          <SocialLogin />
        </div>
      </Col>
    </AuthLayoutContainer>
  );
};

export default Login;
