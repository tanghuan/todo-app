import React, { FC } from 'react';
import { useHelloQuery } from '../generated/graphql';

const Greeting: FC = () => {
  const { loading, error, data } = useHelloQuery();
  if (loading) {
    return <div>loading ... </div>;
  }

  if (error) {
    return <div>load error.</div>;
  }

  return <div>{data?.hello}</div>;
};

export default Greeting;
