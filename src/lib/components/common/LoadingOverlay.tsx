import { Center, Spinner } from '@chakra-ui/react';

const LoadingOverlay = () => {
  return (
    <Center
      position="fixed"
      top="0"
      left="0"
      width="100%"
      height="100%"
      backgroundColor="rgba(255, 255, 255, 0.8)"
      zIndex="10"
    >
      <Spinner size="xl" color="purple.500" />
    </Center>
  );
};

export default LoadingOverlay;
