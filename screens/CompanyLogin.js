import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  ImageBackground,
} from "react-native";
import { FormBuilder } from "react-native-paper-form-builder";
import { useForm } from "react-hook-form";
import { Button, Divider } from "react-native-paper";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CompanyLogin = ({ navigation }) => {
  const { control, setFocus, handleSubmit } = useForm({
    defaultValues: {
      companyname: "",
      password: "",
    },
    mode: "onChange",
  });

  const companyLogin = async ({ companyname, password }) => {
    await axios
      .post("http://33ae-103-255-232-154.ngrok.io/companylogin", {
        name: companyname,
        pass: password,
      })
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        storeData(response.data);
        navigation.navigate("Main");
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("Credential", jsonValue);
      console.log("Data Saved");
    } catch (e) {
      console.warn(e);
    }
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
          <Text style={styles.headingStyle}>Company Login</Text>
          <FormBuilder
            control={control}
            setFocus={setFocus}
            formConfigArray={[
              {
                name: "companyname",
                type: "text",
                rules: {
                  required: {
                    value: true,
                    message: "Company Name is required",
                  },
                },
                textInputProps: {
                  label: "Company Name",
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
              onPress={handleSubmit((data) => companyLogin(data))}
            >
              Submit
            </Button>
          </View>
          <Divider style={{ marginTop: 20 }} />

          <Button
            mode="text"
            style={{ paddingHorizontal: 25, paddingVertical: 5 }}
            onPress={() => navigation.navigate("CompanyRegister")}
          >
            Do not have Account? Register
          </Button>
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
  },
});

export default CompanyLogin;
