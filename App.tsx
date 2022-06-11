/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type { Node } from 'react';

import GlobalAppProvider from './store/GlobalAppProvider';

const App: () => Node = () => {
  return (
    <GlobalAppProvider />
  );
};

export default App;
