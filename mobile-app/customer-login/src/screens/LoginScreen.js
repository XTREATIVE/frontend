import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function LoginScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Logo Container */}
      <View style={styles.logoContainer}>
        <Image source={require('../../assets/logo.png')} style={styles.logo} />
      </View>

      <Text style={styles.title}>Log Into Your Account</Text>
      <TextInput style={styles.input} placeholder="Email Address" keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry />

      {/* Forgot Password */}
      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.linkText}>Forgot Password?</Text>
      </TouchableOpacity>

        {/* Login Button */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
 {/* Social Login Images */}
     <View style={styles.socialLoginContainer}>
        <TouchableOpacity onPress={() => console.log('Google Login')}>
          <Image source={require('../../assets/google.png')} style={styles.socialImage} />
        </TouchableOpacity>
      </View>
      {/* Register Link */}
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.linkText}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    height: 50,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
    backgroundColor: '#f9f9f9',
  },
  button: {
    backgroundColor: '#4D72C9',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  linkText: {
    color: '#007BFF',
    textAlign: 'center',
    marginTop: 10,
  },
  socialLoginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',  /* Centers the icons horizontally */
    alignItems: 'center',      /* Centers the icons vertically */
    width: '100%',
    marginBottom: 20,
    paddingTop: 10,            /* Moves the icons a bit lower */
  },
  
  socialImage: {
    width: 40,  /* Smaller size for icons */
    height: 40, /* Smaller size for icons */
    resizeMode: 'contain',  /* Keeps the aspect ratio of images */
    marginHorizontal: 10,   /* Adds spacing between the icons */
  }
});
