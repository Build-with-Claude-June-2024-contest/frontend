'use client';

import { GoogleOutlined } from '@ant-design/icons';
import { useToast } from '@chakra-ui/react';
import { Button, Divider } from 'antd';
import { signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/navigation';

import { auth, googleProvider } from '~/lib/firebase';

const SocialLogin: React.FC = () => {
  const toast = useToast();
  const router = useRouter();
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const token = await result.user.getIdToken();
      localStorage.setItem('token', token);

      toast({
        title: 'Login Successful',
        description: "You've logged in successfully.",
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      router.push('/search');
    } catch (error) {
      toast({
        title: 'Login Failed',
        description: (error as Error).message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };
  return (
    <div style={{ marginTop: '16px', textAlign: 'center' }}>
      <Divider>Or login with</Divider>
      <Button
        size="large"
        icon={<GoogleOutlined />}
        onClick={handleGoogleSignIn}
        block
        style={{ marginTop: 8 }}
      >
        Google
      </Button>
    </div>
  );
};

export default SocialLogin;
