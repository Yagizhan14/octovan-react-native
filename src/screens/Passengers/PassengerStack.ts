import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

export type PassengersParamList = {
  Passengers: undefined;
  Passenger: {
    id: string;
  };
};

export interface IPassengersNavigationProps<
  T extends keyof PassengersParamList
> {
  navigation: StackNavigationProp<PassengersParamList, T>;
  route: RouteProp<PassengersParamList, T>;
}
