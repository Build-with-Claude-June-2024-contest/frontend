'use client';

import { useAuth } from '~/lib/components/hooks/useAuth';
import SearchPageComponent from '~/lib/components/search/SearchPageComponent';

const SearchPage = () => {
  useAuth('/');
  return <SearchPageComponent />;
};

export default SearchPage;
