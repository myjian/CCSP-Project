import React from 'react';

import {PageFoot} from './PageFoot';
import {PageHead} from './PageHead';

export function LoginRequired() {
  return (
    <>
      <PageHead title="無法使用" />
      <div id="body" className="container-fluid">
        <p>目前不支援此功能（帳號系統已停用）。</p>
      </div>
      <PageFoot />
    </>
  );
}
