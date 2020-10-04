import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Passenger from "./Passenger";
import Passengers from "./Passengers";
import { PassengersParamList } from "./PassengerStack";

interface IPassengerIndexProps {}

const PassengerStack = createStackNavigator<PassengersParamList>();

const PassengerIndex: React.FC<IPassengerIndexProps> = () => {
  return (
    <PassengerStack.Navigator>
      <PassengerStack.Screen name="Passengers" component={Passengers} />
      <PassengerStack.Screen name="Passenger" component={Passenger} />
    </PassengerStack.Navigator>
  );
};

export default PassengerIndex;
