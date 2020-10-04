import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import PassengerIndex from './src/screens/Passengers';

const App: React.FC<{}> = () => {
  return (
    <NavigationContainer>
      <PassengerIndex />
    </NavigationContainer>
  );
};

export default App;
