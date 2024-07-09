import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Container,
  useToast,
} from '@chakra-ui/react';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { auth, googleProvider } from '~/lib/firebase';
import { toastError, toastSuccess } from '~/utils/toastUtils';

const REGISTRATION_FAILED = 'Registration failed';
const REGISTRATION_SUCCESS = 'Registration successful';

export default function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');

  const toast = useToast();
  const router = useRouter();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toastError(toast, REGISTRATION_FAILED, 'Passwords do not match');
      return;
    }

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
            body: JSON.stringify({ email, password, username }),
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

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const token = await result.user.getIdToken();
      localStorage.setItem('token', token);

      toastSuccess(
        toast,
        REGISTRATION_SUCCESS,
        "You've registered successfully."
      );
      router.push('/search');
    } catch (error) {
      toastError(toast, REGISTRATION_FAILED, (error as Error).message);
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
          <FormLabel>Username</FormLabel>
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
        <FormControl isRequired mt={4}>
          <FormLabel>Confirm Password</FormLabel>
          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </FormControl>
        <Button mt={4} colorScheme="teal" type="submit">
          Register
        </Button>
        <Button mt={4} colorScheme="red" onClick={handleGoogleSignIn}>
          Sign up with Google
        </Button>
      </form>
      <Link href="/login" style={{ marginTop: '20px' }}>
        Already have an account? Log in here
      </Link>
    </Container>
  );
}
