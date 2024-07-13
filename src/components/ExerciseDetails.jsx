import { View, Text, StyleSheet } from "react-native";

const ExerciseDetails = ({ exercise }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.exerciseName}>{exercise.name}</Text>
      <Text style={styles.exerciseSubtitle}>
        <Text style={styles.subValue}>{exercise.muscle}</Text> |{" "}
        <Text style={styles.subValue}>{exercise.equipment}</Text>
      </Text>
      <Text style={styles.description}>{exercise.instructions}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  exerciseName: {
    fontSize: 20,
    fontWeight: "500",
  },
  exerciseSubtitle: {
    color: "dimgray",
    marginBottom: 5,
  },
  subValue: {
    textTransform: "capitalize",
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
  },
});

export default ExerciseDetails;
