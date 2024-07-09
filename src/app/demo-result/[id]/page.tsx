'use client';

import ResultPageComponent from '~/lib/components/result/ResultPageComponent';

const DemoQueryResult = ({ params }: { params: { id: string } }) => {
  return <ResultPageComponent talent_query_id={params.id} />;
};

export default DemoQueryResult;
