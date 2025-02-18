import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function SignUpScreen({ navigation, route }) {
  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [city, setCity] = useState('');
  const [region, setRegion] = useState('');
  const [extraInfo, setExtraInfo] = useState('');
  const [agreed, setAgreed] = useState(route.params?.agreed || false);
  const [selectedCountryCode, setSelectedCountryCode] = useState('+256');

  const countryData = [
    { label: 'Uganda (+256)', value: '+256', flag: require('../../assets/uganda.png') },
    { label: 'Rwanda (+250)', value: '+250', flag: require('../../assets/rwanda.png') },
  ];

  useEffect(() => {
    if (route.params?.agreed) {
      setAgreed(true);
    }
  }, [route.params?.agreed]);

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <View style={styles.formContainer}>
        <View style={styles.logoContainer}>
          <Image source={require('../../assets/logo.png')} style={styles.logo} />
        </View>

        <Text style={styles.title}>BECOME A CUSTOMER</Text>
        <Text style={styles.subtitle}>Create your account</Text>

        <TextInput style={styles.input} placeholder="Customer Name" value={customerName} onChangeText={setCustomerName} />
        <TextInput style={styles.input} placeholder="Email Address" value={email} onChangeText={setEmail} keyboardType="email-address" />

        <Text style={styles.label}>Phone Number</Text>
        <View style={styles.phoneContainer}>
          <Image source={countryData.find(country => country.value === selectedCountryCode)?.flag} style={styles.flag} />
          <Text style={styles.countryCode}>{selectedCountryCode}</Text>
          <Picker selectedValue={selectedCountryCode} style={styles.picker} onValueChange={(itemValue) => setSelectedCountryCode(itemValue)}>
            {countryData.map((country, index) => (
              <Picker.Item key={index} label={country.label} value={country.value} />
            ))}
          </Picker>
          <TextInput style={[styles.input, styles.phoneInput]} placeholder="Enter phone number" value={phoneNumber} onChangeText={setPhoneNumber} keyboardType="phone-pad" />
        </View>

        <TextInput style={styles.input} placeholder="City" value={city} onChangeText={setCity} />
        <TextInput style={styles.input} placeholder="Region" value={region} onChangeText={setRegion} />
       
        {/* Agree to Terms Button */}
        {!agreed && (
          <TouchableOpacity onPress={() => navigation.navigate('AgreeScreen')} style={styles.agreeButton}>
            <Text style={styles.agreeText}>Agree to Terms and Conditions</Text>
          </TouchableOpacity>
        )}

        {/* Register Button */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: agreed ? '#B14228' : '#ccc' }]}
          onPress={() => {
            if (!agreed) {
              navigation.navigate('AgreeScreen');
            } else {
              navigation.navigate('Verification');
            }
          }}
          disabled={!agreed}
        >
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.linkText}>Already have an account? Log in</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}const styles = StyleSheet.create({
  
  formContainer: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: 'white', borderRadius: 10, elevation: 5, margin: 10 },
  logoContainer: { alignItems: 'center', marginBottom: 20 },
  logo: { width: 100, height: 100, resizeMode: 'contain' },
  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 10, color: '#333' },
  subtitle: { fontSize: 18, textAlign: 'center', marginBottom: 20, color: '#555' },
  input: { height: 50, borderColor: '#ccc', borderWidth: 1, borderRadius: 5, marginBottom: 12, paddingLeft: 15, backgroundColor: '#fafafa' },
  agreeButton: { backgroundColor: '#4D72C9', padding: 12, borderRadius: 5, marginBottom: 15, alignItems: 'center' },
  agreeText: { color: 'white', fontSize: 16, textAlign: 'center', fontWeight: 'bold' },
  button: { padding: 15, borderRadius: 5, alignItems: 'center', marginTop: 20 },
  buttonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  linkText: { color: '#007BFF', textAlign: 'center', marginTop: 10, fontSize: 16 },

  
  /** Updated Phone Input Styling **/
  phoneContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'flex-start',  /* Aligns items to the left, prevents stretching */
    borderWidth: 1, 
    borderColor: '#ccc', 
    borderRadius: 5, 
    backgroundColor: '#fafafa', 
    marginBottom: 12, 
    paddingHorizontal: 10,  /* Adds space inside the container */
    maxWidth: 350,  /* Limiting the max width of the container */
    alignSelf: 'center',  /* Centers the container horizontally */
  },
  
  flag: { 
    width: 24, 
    height: 16, 
    resizeMode: 'contain', 
    marginRight: 5 
  },
  countryCode: { 
    fontSize: 14, 
    fontWeight: 'bold', 
    marginRight: 5 
  },
  picker: { 
    width: 30, 
    height: 40, 
    marginRight: 5 
  },
  phoneInput: { 
    flex: 1, 
    height: 40, 
    borderLeftWidth: 1, 
    borderLeftColor: '#ccc', 
    paddingLeft: 10,
     
  }
});
