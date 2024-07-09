import {
  Box,
  chakra,
  HStack,
  IconButton,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';
import { FaLinkedin } from 'react-icons/fa'; // Ensure you have react-icons installed

import type { Profile } from '~/lib/types/profile';

const ProfileCard = ({
  id,
  name,
  title,
  location,
  logo_url,
  member_experience_collection: experiences,
  url, // Make sure to add this in the Profile type and pass it as a prop
}: Profile) => {
  const recentExperiences = experiences
    .sort(
      (a, b) =>
        new Date(b.last_updated).getTime() - new Date(a.last_updated).getTime()
    )
    .slice(0, 2);

  return (
    <Box
      key={id}
      p={4}
      borderWidth="1px"
      borderRadius="lg"
      w="full"
      boxShadow="md"
      bg="white"
    >
      <VStack align="start" spacing={2}>
        <Text fontWeight="bold" fontSize="lg">
          {name}{' '}
          <IconButton
            aria-label="LinkedIn"
            icon={<FaLinkedin />}
            colorScheme="blue"
            onClick={() => window.open(url, '_blank')}
            isRound={false}
            size="md"
            borderRadius="15"
            width="25px"
            height="25px"
          />
        </Text>
        <HStack>
          <Image borderRadius="full" boxSize="20px" src={logo_url} alt={name} />
          <Text>{title}</Text>
        </HStack>
        <Text color="gray.500">{location}</Text>
        {recentExperiences.map((exp) => (
          <Box key={exp.id} mt={2}>
            <chakra.span fontWeight="bold">
              {exp.title} at {exp.company_name}
            </chakra.span>
            <chakra.span color="gray.500">, {exp.location}</chakra.span>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default ProfileCard;
