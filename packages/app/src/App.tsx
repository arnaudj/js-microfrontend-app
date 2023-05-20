import React from 'react';
import { RecoilRoot } from 'recoil';
import MainPage from './MainPage';

const App = () => {
  return (
    <>
      <RecoilRoot>
        <MainPage />
      </RecoilRoot>
    </>
  );
};

export default App;
