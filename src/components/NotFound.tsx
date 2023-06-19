import React from 'react';

import {PageContainer} from './PageContainer';

interface Props {
  messages?: readonly string[];
}

export const NotFound = ({messages}: Props) => {
  return (
    <PageContainer title="不存在的頁面">
      {Array.isArray(messages) ? (
        <div className="text-info">
          {messages.map((msg, i) => (
            <p key={i}>{msg}</p>
          ))}
        </div>
      ) : null}
      <p>Page not found. :-(</p>
    </PageContainer>
  );
};
