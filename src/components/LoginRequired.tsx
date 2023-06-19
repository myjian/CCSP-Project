import React from 'react';

import {PageContainer} from './PageContainer';

export function LoginRequired() {
  return (
    <PageContainer title="無法使用">
      <p>目前不支援此功能（帳號系統已停用）。</p>
    </PageContainer>
  );
}
