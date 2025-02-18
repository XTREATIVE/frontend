import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, Animated, ActivityIndicator } from "react-native";
import { TextInput, Button, Text, Modal } from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [welcomeVisible, setWelcomeVisible] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(1));
  const rotation = new Animated.Value(0);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

  const startLoadingAnimation = () => {
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      })
    ).start();
  };

  const handleLogin = (values) => {
    // Start loading animation after successful login
    setLoading(true);

    // Simulating  a successful login
    setTimeout(() => {
      // Hiding loading spinner after 2 seconds
      setLoading(false);

      // Showing welcome modal
      setWelcomeVisible(true);

      // Fade out the modal after a delay
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start();

      // Navigate to Admin Dashboard after modal disappears
      setTimeout(() => {
        setWelcomeVisible(false);
        navigation.navigate("AdminDashboard");
      }, 1500);
    }, 2000);
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loaderContainer}>
          <Animated.View
            style={{
              transform: [
                {
                  rotate: rotation.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0deg", "360deg"],
                  }),
                },
              ],
            }}
          >
            <Image source={require("../../assets/logo.png")} style={styles.logo} />
            <ActivityIndicator size="large" color="#A52A2A" />
          </Animated.View>
        </View>
      ) : (
        <View style={styles.contentContainer}>
          <View style={styles.logoContainer}>
            <Image source={require("../../assets/logo.png")} style={styles.logo} />
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.title}>Sign In</Text>

            <Formik initialValues={{ email: "", password: "" }} validationSchema={validationSchema} onSubmit={handleLogin}>
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <View>
                  <TextInput label="Email" mode="outlined" onChangeText={handleChange("email")} onBlur={handleBlur("email")} value={values.email} style={styles.input} keyboardType="email-address" />
                  {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

                  <TextInput label="Password" mode="outlined" secureTextEntry onChangeText={handleChange("password")} onBlur={handleBlur("password")} value={values.password} style={styles.input} />
                  {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

                  <Text style={styles.forgotPassword}>Forgot Password?</Text>

                  <Button mode="contained" onPress={handleSubmit} style={styles.button}>
                    <Text style={styles.buttonText}>Sign In</Text>
                  </Button>
                </View>
              )}
            </Formik>
          </View>

          {/* Welcome Popup with Fade Animation */}
          <Modal visible={welcomeVisible} dismissable={false} contentContainerStyle={styles.modalContainer}>
            <Animated.View style={{ opacity: fadeAnim }}>
              <Text style={styles.welcomeText}>Welcome to the Admin Panel!</Text>
            </Animated.View>
          </Modal>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    padding: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 5,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  logoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: "contain",
    marginBottom: 20,
  },
  formContainer: {
    flex: 1.5,
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    marginBottom: 10,
  },
  forgotPassword: {
    textAlign: "right",
    color: "blue",
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#A52A2A",
    padding: 10,
    marginTop: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },
  modalContainer: {
    backgroundColor: "#fff",
    padding: 40,
    borderRadius: 10,
    alignItems: "center",
    elevation: 5,
    width: "80%",
    justifyContent: "center",
    height: 150,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
});

export default LoginScreen;