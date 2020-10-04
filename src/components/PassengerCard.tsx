import * as React from "react";
import styled from "styled-components/native";
import { IPassenger } from "../models";
import { Button, Text } from ".";
import FontAwesomeIcons from "react-native-vector-icons/FontAwesome";

interface IPassengerCardProps {
  passenger: IPassenger;
  onPressDetail?: (id: string) => void;
  onPressEdit?: () => void;
}

export const PassengerCard: React.FC<IPassengerCardProps> = React.memo(
  ({ passenger, onPressDetail, onPressEdit }) => {
    return (
      <PassengerCardContainer>
        {passenger.airline && passenger.airline.logo ? (
          <AirlineImage source={{ uri: passenger.airline.logo }} />
        ) : (
          <Text>No Airline Image</Text>
        )}

        <PassengerInformation>
          <Text weight="bold" size="big">
            {passenger.name && passenger.name.trim().length > 0
              ? passenger.name
              : "No Name"}
          </Text>
          <PassengerTripInformation>
            <Text weight="bold" size="big">
              {passenger.trips}
            </Text>
            <Text weight="normal" size="medium">
              Trips
            </Text>
          </PassengerTripInformation>
        </PassengerInformation>
        <PassengerDetailButton>
          {onPressDetail && (
            <Button onPress={() => onPressDetail(passenger._id)}>
              <Text color="white" weight="bolder">
                Details
              </Text>
            </Button>
          )}
          {onPressEdit && (
            <Button onPress={onPressEdit}>
              <FontAwesomeIcons
                color="white"
                style={{ marginRight: 5 }}
                size={16}
                name="edit"
              />
              <Text color="white" weight="bolder">
                Edit
              </Text>
            </Button>
          )}
        </PassengerDetailButton>
      </PassengerCardContainer>
    );
  },
);

const PassengerCardContainer = styled.View`
  padding: 16px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

const AirlineImage = styled.Image`
  margin-right: 16px;
  width: 50px;
  height: 50px;
  resize-mode: contain;
`;

const PassengerInformation = styled.View`
  flex: 1;
`;

const PassengerTripInformation = styled.View`
  flex-direction: row;
  align-items: center;
`;

const PassengerDetailButton = styled.View`
  align-self: center;
`;
