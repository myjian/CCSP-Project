import React from 'react';

import {PageContainer} from './PageContainer';

interface Props {
  errorMessage: string;
}

export function ErrorPage({errorMessage}: Props) {
  return (
    <PageContainer title="發生錯誤">
      <div>{errorMessage && <code style={{color: 'red'}}>{errorMessage}</code>}</div>
    </PageContainer>
  );
}
