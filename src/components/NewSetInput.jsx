import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import { useState } from "react";
import { gql } from "graphql-request";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import graphqlClient from "../graphqlClient";
import { useAuth } from "../providers/AuthContext";

const mutationDocument = gql`
  mutation MyMutation($newSet: NewSet!) {
    insertSet(
      document: $newSet
      dataSource: "Cluster1"
      database: "workouts"
      collection: "sets"
    ) {
      insertedId
    }
  }
`;

const NewSetInput = ({ exerciseName }) => {
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");

  const { username } = useAuth();
  const queryClient = useQueryClient();

  const { mutate, error, isError, isLoading } = useMutation({
    mutationFn: (newSet) => graphqlClient.request(mutationDocument, { newSet }),
    onSuccess: () => {
      setReps("");
      setWeight("");
      queryClient.invalidateQueries(["sets", exerciseName]);
    },
  });

  const addSet = () => {
    const newSet = {
      username,
      exercise: exerciseName,
      reps: Number.parseInt(reps),
      weight: Number.parseFloat(weight) || undefined,
    };
    mutate(newSet);
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TextInput
          value={reps}
          onChangeText={setReps}
          placeholder="Reps"
          style={styles.input}
          keyboardType="numeric"
        />
        <TextInput
          value={weight}
          onChangeText={setWeight}
          placeholder="Weight"
          style={styles.input}
          keyboardType="numeric"
        />
        <Button title={isLoading ? "Adding..." : "Add"} onPress={addSet} />
      </View>
      {isError && <Text style={styles.error}>Failed to add the set</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    gap: 5,
  },
  row: {
    flexDirection: "row",
    gap: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "gainsboro",
    padding: 10,
    flex: 1,
    borderRadius: 5,
  },
  error: {
    color: "red",
    marginTop: 5,
  },
});

export default NewSetInput;
