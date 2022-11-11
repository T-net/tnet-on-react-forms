import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AppLayout from './components/layout/app-layout';
import AddPineapple from './pages/add-pineapple';
import AddPineappleGroupui from './pages/add-pineapple-groupui';

const App = () => (
  <Routes>
    <Route path="/" element={<AppLayout />}>
      <Route index element={<AddPineapple />} />
      <Route path="groupui" element={<AddPineappleGroupui />} />
    </Route>
  </Routes>
);

export default App;
