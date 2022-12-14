import { StyleSheet, View, Text } from "react-native";
import MainButton from "../components/MainButton";
import MainLogo from "../components/MainLogo";
import MainInput from "../components/MainInput";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default Signup = ({ navigation }) => {
  const [name, setName] = useState("abc");
  const [phone, setPhone] = useState("123");
  const [email, setEmail] = useState("abc@gmail.com");
  const [password, setPassword] = useState("123");
  const onSignUp = () => {
    if (name.trim() == "" || !name) {
      alert("Không được để trống họ và tên !");
    } else if (phone.trim() == "" || !phone) {
      alert("Không được để trống phone !");
    } else if (email.trim() == "" || !email) {
      alert("Không được để trống email !");
    } else if (password.trim() == "" || !password) {
      alert("Không được để trống mật khẩu !");
    } else {
      createAccount();
    }
  };
  function goLogin() {
    navigation.replace("Login");
  }
  const createAccount = async () => {
    let userData = await AsyncStorage.getItem("userData");
    if (userData) {
      userData = JSON.parse(userData);
      let arr = [...userData];
      arr = arr.filter(
        (value) => value.email.toLocaleLowerCase() == email.toLocaleLowerCase()
      );
      if (arr.length > 0) {
        alert("Email already registered!");
        return;
      } else {
        userData.push({
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim(),
          password: password.trim(),
        });
      }
    } else {
      userData = [];
      userData.push({
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
        password: password.trim(),
      });
    }
    AsyncStorage.setItem("userData", JSON.stringify(userData));
    alert("Đăng ký thành công!");
    goLogin();
  };

  return (
    <View style={{ marginTop: 70 }}>
      <MainLogo title="Create new account" />

      <MainInput placeholder="Full Name" value={name} onchangeText={setName} />
      <MainInput
        placeholder="Phone Number"
        value={phone}
        onchangeText={setPhone}
      />
      <MainInput
        placeholder="E-mail Adress"
        value={email}
        onchangeText={setEmail}
      />
      <MainInput
        placeholder="Password"
        value={password}
        onchangeText={setPassword}
      />

      <View
        style={{
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <MainButton
          backgroundColor={{ backgroundColor: "#3b5998" }}
          title="Sign Up"
          onPress={onSignUp}
        />
        <Text style={{ fontSize: 20, color: "grey", marginTop: 30 }}>OR</Text>
        <MainButton
          backgroundColor={{ backgroundColor: "#fff" }}
          color={{ color: "#3975e8" }}
          title="Already have an account?"
          onPress={goLogin}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#f8f8ff",
    alignItems: "center",
    justifyContent: "center",
  },
});
