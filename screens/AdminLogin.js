import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  ImageBackground,
} from "react-native";
import { FormBuilder } from "react-native-paper-form-builder";
import { useForm } from "react-hook-form";
import { Button, Divider } from "react-native-paper";
import FormData from "form-data";
import axios from "axios";

const AdminLogin = ({ navigation }) => {
  const { control, setFocus, handleSubmit } = useForm({
    defaultValues: {
      adminname: "",
      password: "",
    },
    mode: "onChange",
  });

  const adminLogin = ({ adminname, password }) => {
    const formData = new FormData();

    formData.append("adminname", adminname);
    formData.append("password", password);

    var config = {
      method: "post",
      url: "https://attendance-backend.bakaotaku.dev/adminlogin",
      data: formData,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        navigation.navigate("Admin");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <View style={styles.containerStyle}>
      <ImageBackground
        source={{
          uri: "https://raw.githubusercontent.com/Drish-xD/SIH-Hackthon/master/assets/bg.png",
        }}
        resizeMode="cover"
        style={styles.containerStyle}
      >
        <ScrollView contentContainerStyle={styles.scrollViewStyle}>
          <Text style={styles.headingStyle}>Admin Login</Text>
          <FormBuilder
            control={control}
            setFocus={setFocus}
            formConfigArray={[
              {
                name: "adminname",
                type: "text",
                rules: {
                  required: {
                    value: true,
                    message: "Name is required",
                  },
                },
                textInputProps: {
                  label: "Name",
                },
              },
              {
                name: "password",
                type: "password",
                textInputProps: {
                  label: "Password",
                },
                rules: {
                  required: {
                    value: true,
                    message: "Password is required",
                  },
                  minLength: {
                    value: 8,
                    message: "Password should be atleast 8 characters",
                  },
                  maxLength: {
                    value: 30,
                    message: "Password should be between 8 and 30 characters",
                  },
                },
              },
            ]}
          />
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Button
              mode="contained"
              style={{
                paddingHorizontal: 25,
                paddingVertical: 5,
                borderRadius: 50,
                width: "80%",
              }}
              onPress={handleSubmit((data) => adminLogin(data))}
            >
              Submit
            </Button>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  scrollViewStyle: {
    marginTop: 200,
    padding: 15,
  },
  headingStyle: {
    fontSize: 35,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 40,
    marginHorizontal: 60,
  },
});

export default AdminLogin;
