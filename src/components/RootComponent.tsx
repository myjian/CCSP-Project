import React, {useState} from 'react';
import {createHashRouter, RouterProvider} from 'react-router-dom';

import {DriverRecord} from '../record';
import {Store, StoreContext} from '../store';
import {DriverRecordDetail} from './DriverRecordDetail';
import {DriverRecordList} from './DriverRecordList';
import {IndexPage} from './IndexPage';
import {LoginRequired} from './LoginRequired';
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
]);

export function RootComponent() {
  const setRecords = (records: DriverRecord[]) => {
    setStore({...store, records});
  };

  const setError = (error: string) => {
    setStore({...store, error});
  };

  const initStoreState: Store = {
    records: [],
    setRecords,
    error: '',
    setError,
  };

  const [store, setStore] = useState(initStoreState);
  return (
    <React.StrictMode>
      <StoreContext.Provider value={store}>
        <RouterProvider router={router} />
      </StoreContext.Provider>
    </React.StrictMode>
  );
}
