import React, { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { StyleSheet, View, Text, Image, ImageBackground } from "react-native";
import { Button } from "react-native-paper";
import FormData from "form-data";
import axios from "axios";

const Main = ({ navigation }) => {
  const [errMsg, setErrMsg] = useState(null);
  const [location, setLocation] = useState(null);
  const [hasCameraPermission, setCameraPermission] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrMsg("Permission to access location was denied.");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      setCameraPermission(cameraStatus.status === "granted");
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const entryAttendence = async () => {
    const form = new FormData();

    form.append("image", image);
    form.append("company_id", "1");
    form.append("lat", location.coords.latitude);
    form.append("long", location.coords.longitude);

    await axios
      .post("https://attendance-backend.bakaotaku.dev/entry", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(function (response) {
        console.log(JSON.stringify(response));
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const exitAttendence = () => {
    const formData = new FormData();

    formData.append("image", image);
    formData.append("company_id", "1");
    formData.append("lat", location.coords.latitude);
    formData.append("long", location.coords.longitude);

    var config = {
      method: "post",
      url: "https://attendance-backend.bakaotaku.dev/exit",
      data: formData,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        navigation.navigate("Sucess");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  if (hasCameraPermission === false || errMsg !== null) {
    return <Text>Please Allow Camera And Location Permissions</Text>;
  }
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri: "https://raw.githubusercontent.com/Drish-xD/attendence/master/assets/bg.png",
        }}
        resizeMode="cover"
        style={styles.container}
      >
        <Image
          source={require("../assets/logo.png")}
          style={{ resizeMode: "contain", width: 100 }}
        />
        <Text style={{ color: "white", textAlign: "center" }}>
          <Text style={{ fontSize: 30, fontWeight: "800" }}>Hello</Text>
          <Text
            style={{ fontSize: 20, fontWeight: "500", padding: "1rem" }}
            numberOfLines={2}
          >
            {"\n"} Welcome back to our app!!!
          </Text>
        </Text>
        <Button
          icon="account"
          mode="contained"
          onPress={() => navigation.navigate("AdminLogin")}
          style={{
            paddingHorizontal: 25,
            paddingVertical: 5,
            borderRadius: 50,
          }}
        >
          Admin Login
        </Button>
        
        {image && (
          <Image
            source={{ uri: image }}
            style={{ height: 100, width: 100, alignSelf: "center" }}
          />
        )}
        <Button
          icon="camera"
          mode="contained"
          onPress={() => pickImage()}
          style={{ marginHorizontal: 5, borderRadius: 50 }}
        >
          Take Image
        </Button>
        <View style={{ flexDirection: "row" }}>
          <Button
            mode="contained"
            onPress={() => entryAttendence()}
            style={{ marginHorizontal: 5, borderRadius: 50 }}
          >
            Entry Attendence
          </Button>

          <Button
            mode="contained"
            onPress={() => exitAttendence()}
            style={{ marginHorizontal: 5, borderRadius: 50 }}
          >
            Exit Attendence
          </Button>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Main;

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
