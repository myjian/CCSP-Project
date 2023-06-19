import React from 'react';

import {PageFoot} from './PageFoot';
import {PageHead} from './PageHead';

interface Props {
  children: React.ReactNode;
  title: string;
  isIndex?: boolean;
}

export function PageContainer({children, isIndex, title}: Props) {
  return (
    <div id="body" className="container">
      <PageHead title={title} isIndex={isIndex} />
      {children}
      <PageFoot />
    </div>
  );
}
