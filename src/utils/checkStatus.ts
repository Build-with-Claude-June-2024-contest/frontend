import type { CreateToastFnReturn } from '@chakra-ui/react';
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export function checkStatus401(
  response: Response,
  router: AppRouterInstance,
  toast: CreateToastFnReturn
) {
  // const router = useRouter();
  // const toast = useToast();

  if (response.status === 401) {
    localStorage.removeItem('token');
    toast({
      title: 'Session expired',
      description: 'Please log in again',
      status: 'error',
      duration: 9000,
      isClosable: true,
      position: 'top',
    });
    router.push('/login');
    return true;
  }
  return false;
}
