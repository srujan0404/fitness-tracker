import { View, Text, StyleSheet } from "react-native";
import { formatDistanceToNow } from "date-fns";

const SetListItem = ({ set }) => {
  const timestamp = parseInt(set._id.substr(0, 8), 16) * 1000;
  const createdAt = new Date(timestamp);

  return (
    <View style={styles.container}>
      <Text style={styles.repsWeight}>
        {set.reps} x {set.weight}
      </Text>
      <Text style={styles.timestamp}>{formatDistanceToNow(createdAt)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    marginVertical: 5,
    padding: 10,
    borderRadius: 5,
    gap: 5,
  },
  repsWeight: {
    fontWeight: "bold",
  },
  timestamp: {
    color: "gray",
  },
});

export default SetListItem;
