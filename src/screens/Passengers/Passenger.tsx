import * as React from "react";
import { ActivityIndicator } from "react-native";
import {
  Button,
  Container,
  Modal,
  PassengerCard,
  TextInput,
  Text,
} from "../../components";
import { IPassenger } from "../../models";
import { IPassengersNavigationProps } from "./PassengerStack";
import Axios from "axios";

interface IPassengerProps extends IPassengersNavigationProps<"Passenger"> {}

const Passenger: React.FC<IPassengerProps> = ({
  route: {
    params: { id: passengerId },
  },
}) => {
  const [pageLoading, setPageLoading] = React.useState<boolean>(true);
  const [passenger, setPassenger] = React.useState<IPassenger | null>(null);
  const [isEditModalShown, setIsEditModalShown] = React.useState<boolean>(
    false,
  );
  const [editedPassengerName, setEditedPassengerName] = React.useState<string>(
    "",
  );
  const [isSuccessModalShown, setIsSuccessModalShown] = React.useState<boolean>(
    false,
  );
  const [isErrorModalShown, setIsErrorModalShown] = React.useState<boolean>(
    false,
  );

  const getPassenger = async () => {
    try {
      const response = await Axios.get(
        `https://api.instantwebtools.net/v1/passenger/${passengerId}`,
      );
      return response.data;
    } catch (err) {
      return false;
    }
  };

  const updatePassenger = async () => {
    try {
      const response = await Axios.patch(
        `https://api.instantwebtools.net/v1/passenger/${passengerId}`,
        {
          name: editedPassengerName,
        },
      );
      return response.data;
    } catch (err) {
      return false;
    }
  };

  const onSubmit = async () => {
    setIsEditModalShown(false);
    setPageLoading(true);
    const updateReponse = await updatePassenger();
    if (updateReponse !== false) {
      const fetchReponse = await getPassenger();
      if (fetchReponse !== false) {
        setPassenger(fetchReponse);
        setIsSuccessModalShown(true);
      } else {
        setIsErrorModalShown(true);
      }
    } else {
      setIsErrorModalShown(true);
    }
    setPageLoading(false);
  };

  React.useEffect(() => {
    getPassenger().then((res) => {
      setPassenger(res);
      setEditedPassengerName(res.name);
    });
    setPageLoading(false);
  }, []);

  if (pageLoading || !passenger)
    return (
      <Container centered>
        <ActivityIndicator animating color="#2060ff" size="large" />
      </Container>
    );

  return (
    <Container>
      <PassengerCard
        passenger={passenger}
        onPressEdit={() => setIsEditModalShown(true)}
      />

      <Modal
        isShown={isEditModalShown}
        onDismiss={() => setIsEditModalShown(false)}
      >
        <TextInput
          placeholder="Enter Passenger Name"
          value={editedPassengerName}
          onChangeText={(v) => setEditedPassengerName(v)}
        />
        <Button bg="red" onPress={onSubmit}>
          <Text weight="bolder" color="white">
            Submit
          </Text>
        </Button>
        <Button bg="blue" onPress={() => setIsEditModalShown(false)}>
          <Text weight="bolder" color="white">
            Close
          </Text>
        </Button>
      </Modal>

      <Modal
        isShown={isSuccessModalShown}
        onDismiss={() => setIsSuccessModalShown(false)}
      >
        <Text weight="bold" color="green">
          Successfully updated passenger.
        </Text>
        <Button bg="blue" onPress={() => setIsSuccessModalShown(false)}>
          <Text weight="bolder" color="white">
            Close
          </Text>
        </Button>
      </Modal>

      <Modal
        isShown={isErrorModalShown}
        onDismiss={() => setIsErrorModalShown(false)}
      >
        <Text weight="bold" color="red">
          Error while updating passenger.
        </Text>
        <Button bg="blue" onPress={() => setIsErrorModalShown(false)}>
          <Text weight="bolder" color="white">
            Close
          </Text>
        </Button>
      </Modal>
    </Container>
  );
};

export default Passenger;
