import {
  Button,
  Checkbox,
  Container,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from '@chakra-ui/react';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { auth, googleProvider } from '~/lib/firebase';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
    <Container centerContent>
      <form onSubmit={handleSubmit}>
        <FormControl isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl isRequired mt={4}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="remember-me" mb="0">
            Remember me
          </FormLabel>
          <Checkbox
            id="remember-me"
            isChecked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
        </FormControl>
        <Button mt={4} colorScheme="teal" type="submit">
          Login
        </Button>
        <Button mt={4} colorScheme="red" onClick={handleGoogleSignIn}>
          Sign in with Google
        </Button>
      </form>

      <Link href="/register" style={{ marginTop: '20px' }}>
        Do not have an account? Register here
      </Link>
    </Container>
  );
}
