import { Avatar, Button } from "react-native-paper";
import { StyleSheet, View, Text, ImageBackground } from "react-native";

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri: "https://raw.githubusercontent.com/Drish-xD/SIH-Hackthon/master/assets/bg.png",
        }}
        resizeMode="cover"
        style={styles.container}
      >
        <Avatar.Icon size={100} icon="check" />

        <Text style={{ color: "white", textAlign: "center" }}>
          <Text style={{ fontSize: 20, fontWeight: "800" }}>Hello Name</Text>
          <Text
            style={{ fontSize: 20, fontWeight: "500", padding: "1rem" }}
            numberOfLines={2}
          >
            {"\n"} Your Attendence has been marked for today
          </Text>
        </Text>
        <Button
          icon="home"
          mode="contained"
          onPress={() => navigation.navigate("Main")}
          style={{
            paddingHorizontal: 35,
            paddingVertical: 10,
            borderRadius: 50,
          }}
        >
          Home
        </Button>
      </ImageBackground>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-evenly",
    textAlign: "center",
    width: "100%"
  },
});
