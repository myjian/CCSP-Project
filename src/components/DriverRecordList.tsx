import React from 'react';
import {Link} from 'react-router-dom';

import {PageHead} from './PageHead';

export function DriverRecordList() {
  return (
    <>
      <PageHead title="影像資料庫" />
      <Link to="/driverRecords/538f93df30a496020098f6f1/">View 538f93df30a496020098f6f1</Link>
    </>
  );
}
