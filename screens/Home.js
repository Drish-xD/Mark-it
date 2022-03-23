import { Button, ActivityIndicator } from "react-native-paper";
import { StyleSheet, View, Text, Image, ImageBackground } from "react-native";

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
        <Image
          source={require("../assets/logo2.png")}
          style={{ width: "60%", height: 200, resizeMode: "contain" }}
        />
        <View>
          <Text
            style={{
              fontSize: 35,
              fontWeight: "bold",
              textAlign: "center",
              color: "white",
            }}
          >
            Hello
          </Text>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "normal",
              padding: 10,
              color: "white",
            }}
            numberOfLines={2}
          >
            {"\n"}Welcome back to our app!!!
          </Text>
        </View>
        <Button
          icon="login"
          mode="contained"
          onPress={() => navigation.navigate("CompanyLogin")}
          style={{
            paddingHorizontal: 25,
            paddingVertical: 5,
            borderRadius: 50,
          }}
        >
          Company Login
        </Button>
      </ImageBackground>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-evenly",
    textAlign: "center",
  },
});
