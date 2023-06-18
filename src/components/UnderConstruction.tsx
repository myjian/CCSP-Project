import React from 'react';

import {PageFoot} from './PageFoot';
import {PageHead} from './PageHead';

export function UnderConstruction() {
  return (
    <>
      <PageHead title="抱歉" />
      <div id="body" className="container-fluid">
        <p>網站建置中…</p>
      </div>
      <PageFoot />
    </>
  );
}
