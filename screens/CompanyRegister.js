import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  ImageBackground,
} from "react-native";
import { FormBuilder } from "react-native-paper-form-builder";
import { TimePicker } from "react-native-simple-time-picker";
import { useController, useForm } from "react-hook-form";
import { Button, Divider } from "react-native-paper";
import * as Location from "expo-location";
import moment from "moment";
import axios from "axios";

const CompanyRegister = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [errMsg, setErrMsg] = useState(null);

  const { control, setFocus, handleSubmit } = useForm({
    defaultValues: {
      companyname: "",
      companypassword: "",
      adminname: "",
      adminpassword: "",
      entertime: {},
      exittime: {},
    },
    mode: "onChange",
  });

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

  const companyRegister = async ({
    companyname,
    companypassword,
    entertime,
    exittime,
    adminname,
    adminpassword,
  }) => {
    await all([
      axios.post("https://attendance-backend.bakaotaku.dev/companyregister", {
        name: companyname,
        pass: companypassword,
        lat: location.coords.latitude,
        long: location.coords.longitude,
        entry_time: moment(
          `${entertime.hours}:${entertime.minutes}`,
          "H:m"
        ).format(),
        exit_time: moment(
          `${exittime.hours}:${exittime.minutes}`,
          "H:m"
        ).format(),
      }),
      axios.post("https://attendance-backend.bakaotaku.dev/adminregister", {
        username: adminname,
        pass: adminpassword,
        company_id: 1,
      }),
    ])
      .then(
        axios.spread((data1, data2) => {
          console.log("Company_Data", data1.data, "Admin_Data", data2.data);
          navigation.navigate("CompanyLogin");
        })
      )
      .catch(function (error) {
        console.error(error);
      });
  };

  if (errMsg !== null) {
    return <Text>Please Allow Location Permissions</Text>;
  }
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
          <Text style={styles.headingStyle}>Company Register</Text>
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
                name: "companypassword",
                type: "password",
                textInputProps: {
                  label: "Caompany Password",
                },
                rules: {
                  required: {
                    value: true,
                    message: "Company Password is required",
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
              {
                name: "entertime",
                type: "custom",
                JSX: datePicker,
                textInputProps: {
                  label: "Set Entry Time",
                },
                rules: {
                  required: {
                    value: true,
                    message: "Time is required",
                  },
                },
              },
              {
                name: "exittime",
                type: "custom",
                JSX: datePicker,
                textInputProps: {
                  label: "Set Exit Time",
                },
                rules: {
                  required: {
                    value: true,
                    message: "Time is required",
                  },
                },
              },
              {
                name: "adminname",
                type: "text",
                rules: {
                  required: {
                    value: true,
                    message: "Admin Name is required",
                  },
                },
                textInputProps: {
                  label: "Admin Name",
                },
              },
              {
                name: "adminpassword",
                type: "password",
                textInputProps: {
                  label: "Admin Password",
                },
                rules: {
                  required: {
                    value: true,
                    message: "Admin Password is required",
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
              onPress={handleSubmit((data) => companyRegister(data))}
            >
              Submit
            </Button>
          </View>
          <Divider style={{ marginTop: 20 }} />

          <Button
            mode="text"
            style={{ paddingHorizontal: 25, paddingVertical: 5 }}
            onPress={() => navigation.navigate("CompanyLogin")}
          >
            Already have Account? Login!
          </Button>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

const datePicker = (props) => {
  const {
    name,
    rules,
    shouldUnregister,
    defaultValue,
    control,
    textInputProps,
  } = props;
  const { field } = useController({
    name,
    rules,
    shouldUnregister,
    defaultValue,
    control,
  });

  return (
    <>
      <Text style={styles.title}>{textInputProps.label}</Text>
      <View
        style={{
          backgroundColor: "white",
        }}
      >
        <TimePicker
          value={field.value}
          onChange={field.onChange}
          emptyLabel={"Select"}
        />
      </View>
    </>
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
    marginTop: 80,
    padding: 15,
  },
  headingStyle: {
    fontSize: 35,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 15,
    color: "white",
  },
});

export default CompanyRegister;
