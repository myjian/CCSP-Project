import React from 'react';
import {createHashRouter, RouterProvider} from 'react-router-dom';

import {DriverRecord} from './DriverRecord';
import {DriverRecordList} from './DriverRecordList';
import {IndexPage} from './IndexPage';

const router = createHashRouter([
  {
    path: '/driverRecords/:recordId',
    element: <DriverRecord />,
  },
  {
    path: '/driverRecords',
    element: <DriverRecordList />,
  },
  {
    path: '/',
    element: <IndexPage />,
    index: true,
  },
]);

export function RootComponent() {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}
