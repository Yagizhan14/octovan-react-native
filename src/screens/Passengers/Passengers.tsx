import * as React from "react";
import { useFocusEffect } from "@react-navigation/native";
import { ActivityIndicator, FlatList } from "react-native";
import { Container, Divider, Text } from "../../components";
import { IPassengersNavigationProps } from "./PassengerStack";
import Axios from "axios";
import { IPassenger } from "../../models";
import { PassengerCard } from "../../components";

interface IPassengersProps extends IPassengersNavigationProps<"Passengers"> {}

const Passengers: React.FC<IPassengersProps> = ({ navigation }) => {
  const [currentPage, setCurrentPage] = React.useState<number>(0);
  const [totalPages, setTotalPages] = React.useState<number | null>(null);
  const [pageLoading, setPageLoading] = React.useState<boolean>(true);
  const [passengers, setPassengers] = React.useState<IPassenger[]>([]);
  const [isRefreshing, setRefreshing] = React.useState<boolean>(false);

  const getInitialPassengers = async () => {
    try {
      const response = await Axios.get(
        `https://api.instantwebtools.net/v1/passenger?page=0&size=10`,
      );
      setPassengers(response.data.data);
      setTotalPages(response.data.totalPages);
      setPageLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const getPassengers = React.useCallback(async () => {
    try {
      const response = await Axios.get(
        `https://api.instantwebtools.net/v1/passenger?page=${
          currentPage + 1
        }&size=10`,
      );
      setPassengers((cs) => [...cs, ...response.data.data]);
      setCurrentPage((cs) => cs + 1);
    } catch (err) {
      console.log(err);
    }
  }, [currentPage]);

  const refreshPassengers = async () => {
    setRefreshing(true);
    setCurrentPage(0);
    await getInitialPassengers();
    setRefreshing(false);
  };

  React.useEffect(() => {
    getInitialPassengers();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      setPageLoading(true);
      const unsubscribe = () => getInitialPassengers();
      unsubscribe();
      return () => {};
    }, []),
  );

  return (
    <Container>
      {pageLoading ? (
        <Container centered>
          <ActivityIndicator animating color="#2060ff" size="large" />
        </Container>
      ) : (
        <FlatList
          keyExtractor={(item) => item._id.toString()}
          data={passengers}
          refreshing={isRefreshing}
          onRefresh={refreshPassengers}
          onEndReached={
            currentPage + 1 <= totalPages! ? getPassengers : undefined
          }
          onEndReachedThreshold={0.01}
          ListFooterComponent={
            currentPage + 1 <= totalPages! ? (
              <ActivityIndicator animating color="#2060ff" size="large" />
            ) : undefined
          }
          ItemSeparatorComponent={() => <Divider />}
          ListEmptyComponent={
            <Container centered>
              <Text>No Passengers</Text>
            </Container>
          }
          renderItem={({ item }) => (
            <PassengerCard
              key={item._id}
              passenger={item}
              onPressDetail={(id) => navigation.navigate("Passenger", { id })}
            />
          )}
        />
      )}
    </Container>
  );
};

export default Passengers;
