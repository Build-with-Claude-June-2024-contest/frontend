import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { useToast } from '@chakra-ui/react';
import { Button, Form, Input, Typography } from 'antd';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { auth } from '~/lib/firebase';
import { toastError, toastSuccess } from '~/utils/toastUtils';

interface FormValues {
  email: string;
  password: string;
  confirmPassword: string;
}

// const { Title } = Typography;
const REGISTRATION_FAILED = 'Registration failed';
const REGISTRATION_SUCCESS = 'Registration successful';

const RegisterForm: React.FC = () => {
  const router = useRouter();

  const toast = useToast();
  const [form] = Form.useForm<FormValues>();

  const onFinish = async (values: FormValues) => {
    const { email, password } = values;

    try {
      if (process.env.NEXT_PUBLIC_AUTH_SOLUTION === 'firebase') {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const token = await userCredential.user.getIdToken();
        localStorage.setItem('token', token);
      } else {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/user/create`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
          }
        );

        if (!response.ok) throw new Error('Registration failed');
      }

      toastSuccess(
        toast,
        REGISTRATION_SUCCESS,
        'Your account has been created.'
      );
      router.push('/login');
    } catch (error) {
      toastError(toast, REGISTRATION_FAILED, (error as Error).message);
    }
  };

  return (
    <Form form={form} name="register" onFinish={onFinish} layout="vertical">
      {/* <Text style={{ textAlign: 'center' }}>Create Your Account</Text> */}
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            type: 'email',
            message: 'Please input a valid email!',
          },
        ]}
      >
        <Input prefix={<MailOutlined />} placeholder="Email Address" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password prefix={<LockOutlined />} placeholder="Password" />
      </Form.Item>
      <Form.Item
        name="confirmPassword"
        dependencies={['password']}
        hasFeedback
        rules={[
          { required: true, message: 'Please confirm your password!' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error('The two passwords that you entered do not match!')
              );
            },
          }),
        ]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="Confirm Password"
        />
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
          Already have an account? <Link href="/login">Log in</Link>
        </Typography>
      </Form.Item>
    </Form>
  );
};

export { RegisterForm };
