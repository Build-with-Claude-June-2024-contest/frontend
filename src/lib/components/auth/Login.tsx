'use client';

import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Link, useToast } from '@chakra-ui/react';
import { Button, Checkbox, Form, Input, Typography } from 'antd';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { auth } from '~/lib/firebase';

interface FormValues {
  email: string;
  password: string;
}

// const { Title } = Typography;
const LoginForm: React.FC = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const [form] = Form.useForm<FormValues>();
  const toast = useToast();
  const router = useRouter();

  const onFinish = async (values: FormValues) => {
    const { email, password } = values;

    if (rememberMe) {
      localStorage.setItem('email', email);
    } else {
      sessionStorage.removeItem('email');
    }

    try {
      if (process.env.NEXT_PUBLIC_AUTH_SOLUTION === 'firebase') {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const token = await userCredential.user.getIdToken();
        localStorage.setItem('token', token);
      } else {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/user/login`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
          }
        );

        if (!response.ok) throw new Error('Login failed');
        const data = await response.json();
        const token = data.access_token;
        if (!token) throw new Error('Token not found');
        localStorage.setItem('token', token);
      }

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
    <Form form={form} name="login" onFinish={onFinish} layout="vertical">
      {/* <Title style={{ textAlign: 'center' }}>Welcome Back</Title> */}
      <Form.Item
        name="email"
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input
          prefix={<MailOutlined />}
          placeholder="Email Address"
          size="large"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="Password"
          size="large"
        />
      </Form.Item>
      <Form.Item>
        <Checkbox
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
        >
          Remember Me
        </Checkbox>
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          style={{ backgroundColor: '#000' }}
          htmlType="submit"
          size="large"
          block
        >
          Continue
        </Button>
      </Form.Item>
      <Form.Item>
        <Typography style={{ textAlign: 'center' }}>
          Don&apos;t have an account? <Link href="/register">Sign up</Link>
        </Typography>
      </Form.Item>
    </Form>
  );
};

export { LoginForm };
