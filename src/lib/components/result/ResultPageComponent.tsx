'use client';

import { Box, Button, Flex, useMediaQuery, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import LoadingOverlay from '../common/LoadingOverlay';
import type { Profile } from '~/lib/types/profile';
import { checkStatus401 } from '~/utils/checkStatus';
import { debug } from '~/utils/loggingUtils';

import ProfileCard from './ProfileCard';

interface ResultPageComponentProps {
  talent_query_id: string;
}

export default function ResultPageComponent({
  talent_query_id,
}: ResultPageComponentProps) {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const router = useRouter();
  const toast = useToast();
  const [isMobile] = useMediaQuery('(max-width: 480px)');

  useEffect(() => {
    const token = localStorage.getItem('token');
    setLoading(true);
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/talent-query/${talent_query_id}?page=${currentPage}&size=5`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        setLoading(false);
        if (checkStatus401(response, router, toast)) {
          return true;
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          // Log the data output from the API
          debug(`API Response: ${data}`);

          // Ensure data is not undefined
          setProfiles(data.data);
          setTotalPages(data.totalPages); // Assuming the API returns the total number of pages
          setLoading(false);
        }
      })
      .catch((error) => {
        debug(`Error fetching data: ${error}`);
        setLoading(false);
      });
  }, [talent_query_id, currentPage, router, toast]); // Added router and toast to dependencies

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) {
    return <LoadingOverlay />;
  }

  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      minHeight="70vh"
      gap={4}
      mb={8}
      w="full"
    >
      {profiles.map((profile) => (
        <ProfileCard
          key={profile.id}
          id={profile.id}
          name={profile.name}
          title={profile.title}
          location={profile.location}
          logo_url={profile.logo_url}
          url={profile.url}
          member_experience_collection={profile.member_experience_collection}
        />
      ))}
      <Box display="flex" gap="2">
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </Button>
        {Array.from({ length: isMobile ? 3 : 10 }, (_, i) => (
          <Button
            key={i + 1}
            onClick={() => handlePageChange(i + 1)}
            disabled={i + 1 === currentPage}
            colorScheme={i + 1 === currentPage ? 'blue' : 'gray'}
          >
            {i + 1}
          </Button>
        ))}
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </Box>
    </Flex>
  );
}
