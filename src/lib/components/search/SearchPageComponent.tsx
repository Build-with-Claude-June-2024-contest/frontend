'use client';

import {
  Flex,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useToast,
  useMediaQuery,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaFilter, FaPaperPlane } from 'react-icons/fa';

import LoadingOverlay from '../common/LoadingOverlay';
import { checkStatus401 } from '~/utils/checkStatus';

export default function SearchPageComponent() {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const toast = useToast();
  const [isMobile] = useMediaQuery('(max-width: 480px)');

  const handleButtonClick = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/talent-query`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            nature_language_query: query,
          }),
        }
      );

      if (checkStatus401(response, router, toast)) return;

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      setIsLoading(false);
      if (data.talent_query_id) {
        router.push(`/result/${data.talent_query_id}`);
      } else {
        throw new Error('Invalid response data');
      }
    } catch (error) {
      setIsLoading(false);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : String(error),
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <Flex direction="column" align="left" justify="center" height="100vh">
      <Flex align="left" mb={4}>
        <Icon as={FaFilter} color="purple.500" boxSize={6} mr={2} />
        <Text fontSize="lg" color="purple.500" fontWeight="bold" align="left">
          Set filters with AI
        </Text>
      </Flex>
      <InputGroup>
        <Input
          placeholder={
            isMobile
              ? 'Software Engineers in London'
              : 'Software Engineers with 5+ yrs of experience at fintech companies in the Bay Area'
          }
          mb={4}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <InputRightElement>
          <IconButton
            aria-label="Send Message"
            icon={<FaPaperPlane />}
            colorScheme="purple"
            isRound={false}
            size="md"
            p={2}
            borderRadius="0"
            onClick={handleButtonClick}
          />
        </InputRightElement>
      </InputGroup>
    </Flex>
  );
}
