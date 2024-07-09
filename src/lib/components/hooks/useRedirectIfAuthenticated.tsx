import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function useRedirectIfAuthenticated(redirectUrl = '/search') {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.push(redirectUrl);
    }
  }, [router, redirectUrl]);
}
