import React from 'react';
import {createHashRouter, RouterProvider} from 'react-router-dom';

import {DriverRecordDetail} from './DriverRecordDetail';
import {DriverRecordList} from './DriverRecordList';
import {IndexPage} from './IndexPage';
import {LoginRequired} from './LoginRequired';
import {NotFound} from './NotFound';
import {UnderConstruction} from './UnderConstruction';

const router = createHashRouter([
  {
    path: '/driverRecords/:recordId',
    element: <DriverRecordDetail />,
  },
  {
    path: '/driverRecords',
    element: <DriverRecordList />,
  },
  {
    path: '/report',
    element: <LoginRequired />,
  },
  {
    path: '/userRecords',
    element: <LoginRequired />,
  },
  {
    path: '/userInfo',
    element: <LoginRequired />,
  },
  {
    path: '/tips',
    element: <UnderConstruction />,
  },
  {
    path: '/trafficLaws',
    element: <UnderConstruction />,
  },
  {
    path: '/contactUs',
    element: <UnderConstruction />,
  },
  {
    path: '/',
    element: <IndexPage />,
    index: true,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export function RootComponent() {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}
