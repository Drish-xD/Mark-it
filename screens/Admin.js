import { Avatar, Divider, IconButton, List } from "react-native-paper";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";

const Admin = ({ navigation }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    employees();
  }, []);

  const employees = async () => {
    await axios
      .post("https://attendance-backend.bakaotaku.dev/employees", {
        company_id: 1,
      })
      .then(function (response) {
        console.log(JSON.stringify(response));
        setUsers(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri: "https://raw.githubusercontent.com/Drish-xD/SIH-Hackthon/master/assets/bg.png",
        }}
        resizeMode="repeat"
        style={styles.container}
      >
        <Avatar.Icon
          size={100}
          icon="account-group"
          style={{ marginVertical: 30 }}
        />
        <Text style={{ fontSize: 30, fontWeight: "bold", color: "white" }}>
          Employee List
        </Text>
        <Divider style={{ marginTop: 15, padding: 1, width: "90%" }} />
        <List.Section style={styles.userlist}>
          {users.map((user) => (
            <List.Item
              key={user.iD}
              title={user.Name}
              description={`Attendence: ${user.Working_Days}`}
              titleStyle={{ color: "white" }}
              descriptionStyle={{ color: "white" }}
              left={() => <List.Icon icon="account" color="white" />}
            />
          ))}
        </List.Section>
        <IconButton
          style={styles.iconbtn}
          icon="plus"
          size={30}
          animated
          color="#fff"
          onPress={() => navigation.navigate("AddUser")}
        />
      </ImageBackground>
    </View>
  );
};

export default Admin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    textAlign: "center",
  },
  iconbtn: {
    position: "absolute",
    right: 10,
    bottom: 10,
    backgroundColor: "#6200ee",
  },
  userlist: {
    width: "100%",
  },
});
