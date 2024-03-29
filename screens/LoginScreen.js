import { useEffect, useState } from "react";
import { iniciarSesion } from "../estados/usuarios";
import { useSelector, useDispatch } from "react-redux";
import {
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";

import { Box, TextInput, Button } from "@react-native-material/core";

const styles = StyleSheet.create({
  logo: {
    width: 150,
    height: 150,
  },
});
const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const usuario = useSelector((estado) => estado.usuarios);
  const [Login, setLogin] = useState({ eMail: "", contrasena: "" });

  useEffect(() => {
    if (usuario.infoDeUsuario.id) navigation.navigate("Inicio");
  }, [usuario.infoDeUsuario]);

  const LoginEmailHandler = (e) => {
    setLogin({ ...Login, eMail: e });
  };
  const LoginContrasenalHandler = (e) => {
    setLogin({ ...Login, contrasena: e });
  };

  const SubmitHandler = () => {
    dispatch(iniciarSesion(Login))
      .then(() => {
        Alert.alert(
          "Inicio de Sesión",
          "Inicio de sesión exitoso!",
          [{ text: "Entendido" }],
          { cancelable: true }
        );
        setLogin({ eMail: "", contrasena: "" });
      })
      .catch((error) => {
        Alert.alert(
          "Inicio de Sesión",
          error.message,
          [{ text: "Entendido" }],
          { cancelable: true }
        );
      });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f89c1c" }}>
      <Box
        style={{
          marginTop: "20%",
          alignItems: "center",
        }}
      >
        <Image style={styles.logo} source={require("../assets/globlal.png")} />
        <Text style={{ fontSize: 30, marginBottom: 10 }}>INICIAR SESIÓN</Text>
        <View
          style={{
            flexDirection: "row",
            borderBottomColor: "#f89c1c",
            borderBottomWidth: 1,
            paddingLeft: 15,
            paddingRight: 15,
            marginBottom: 25,
          }}
        >
          <TextInput
            onChangeText={LoginEmailHandler}
            placeholder="Mail"
            style={{ flex: 1, paddingVertical: 0 }}
            value={Login.eMail}
          ></TextInput>
        </View>
        <View
          style={{
            flexDirection: "row",
            borderBottomColor: "#f89c1c",
            borderBottomWidth: 1,
            paddingLeft: 15,
            paddingRight: 15,
            marginBottom: 25,
          }}
        >
          <TextInput
            onChangeText={LoginContrasenalHandler}
            placeholder="Contrasena"
            style={{ flex: 1, paddingVertical: 0 }}
            secureTextEntry={true}
            value={Login.contrasena}
          ></TextInput>
        </View>
        <TouchableOpacity onPress={() => {}}>
          <Text style={{ color: "blue" }}>Olvido su contraseña?</Text>
        </TouchableOpacity>
        <View>
          <Button
            title="ENTRAR"
            style={{ backgroundColor: "#0072b7", marginTop: 30, width: 130 }}
            onPress={SubmitHandler} //  navigation.navigate("Home");
          ></Button>
        </View>
      </Box>
    </SafeAreaView>
  );
};

export default Login;
