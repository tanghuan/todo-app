import React from 'react';
import { render } from '@testing-library/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { HelloDocument, HelloQuery } from '../generated/graphql';
import Greeting from './Greeting';

it('should render Greeting component', async () => {
  const mocks: ReadonlyArray<MockedResponse<HelloQuery>> = [
    {
      request: {
        query: HelloDocument,
      },
      result: {
        data: {
          hello: 'Hello Graphql!',
        },
      },
    },
  ];
  const { getByText, findByText } = render(
    <MockedProvider mocks={mocks}>
      <Greeting />
    </MockedProvider>,
  );

  const loadingEl = getByText(/loading/);
  expect(loadingEl).toBeInTheDocument();

  const resultEl = await findByText(/Hello/);
  expect(resultEl).toBeInTheDocument();
});
