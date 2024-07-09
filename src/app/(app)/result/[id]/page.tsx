'use client';

import { useAuth } from '~/lib/components/hooks/useAuth';
import ResultPageComponent from '~/lib/components/result/ResultPageComponent';

const QueryResult = ({ params }: { params: { id: string } }) => {
  useAuth('/');
  return <ResultPageComponent talent_query_id={params.id} />;
};

export default QueryResult;
