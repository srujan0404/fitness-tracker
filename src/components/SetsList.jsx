import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
} from "react-native";
import { gql } from "graphql-request";
import { useQuery } from "@tanstack/react-query";
import graphqlClient from "../graphqlClient";
import { useAuth } from "../providers/AuthContext";
import SetListItem from "./SetListItem";
import ProgressGraph from "./ProgressGraph";

const setsQuery = gql`
  query sets($exercise: String!, $username: String!) {
    sets(exercise: $exercise, username: $username) {
      documents {
        _id
        exercise
        reps
        weight
      }
    }
  }
`;

const SetsList = ({ ListHeaderComponent, exerciseName }) => {
  const { username } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ["sets", exerciseName],
    queryFn: () =>
      graphqlClient.request(setsQuery, { exercise: exerciseName, username }),
  });

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <FlatList
      data={data.sets.documents}
      ListHeaderComponent={() => (
        <>
          <ListHeaderComponent />
          <ProgressGraph sets={data.sets.documents} />
        </>
      )}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => <SetListItem set={item} />}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});

export default SetsList;
