import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    SafeAreaView,
    useWindowDimensions 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TextInput from '../components/TextInput'
import { FONTS, COLORS, SIZES, images } from "../constants";
import RenderHtml from 'react-native-render-html';
import { emailValidator } from '../components/EmailValidator';
import { passwordValidator } from '../components/PasswordValidator';


const Login =  ({ route, navigation }) => {
    const [email, setEmail] = useState({ value: '', error: '' })
    const [password, setPassword] = useState({ value: '', error: '' })
    const [message, setMessage] = React.useState(message);

    const getLogin = async () => {
        const emailError = emailValidator(email.value)
        const passwordError = passwordValidator(password.value)
        const link = 'https://f745-2404-8000-1001-d0a0-c820-2294-fc3d-d6f.ap.ngrok.io'
        AsyncStorage.setItem('linkApi', link);

        if (emailError || passwordError) {
          setEmail({ ...email, error: emailError })
          setPassword({ ...password, error: passwordError })
          return
        } else {
            try{
                const resp = await fetch(link+'/api/users/login', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: email.value,
                        password: password.value
                      })
                    });
                const data =  await resp.json();
                AsyncStorage.setItem('token', data.token);
                AsyncStorage.setItem('userId', JSON.stringify(data.userId));
                const link2 = await AsyncStorage.getItem('linkApi')
                navigation.navigate("Home", {})
                console.log("login : ok ")
            } catch (error) {
                console.log("error : " +error);
            }
        }
        
    };

    function loginView() {
        return (
            <View style={{alignItems:'center', alignContent:'center'}}>
                <Image
                    source={images.logo}
                    style={{
                        width: 120,
                        height: 120,
                        marginBottom: 20,
                        borderRadius: 20
                    }}
                    />
                <TextInput
                    label="Email"
                    returnKeyType="next"
                    value={email.value}
                    onChangeText={(text) => setEmail({ value: text, error: '' })}
                    error={!!email.error}
                    errorText={email.error}
                    autoCapitalize="none"
                    autoCompleteType="email"
                    textContentType="emailAddress"
                    keyboardType="email-address"
                />
                <TextInput
                    label="Password"
                    returnKeyType="done"
                    value={password.value}
                    onChangeText={(text) => setPassword({ value: text, error: '' })}
                    error={!!password.error}
                    errorText={password.error}
                    secureTextEntry
                />
                <TouchableOpacity
                    style={{
                        width: '100%',
                        height: '15%',
                        backgroundColor: COLORS.primary,
                        marginVertical: SIZES.base,
                        borderRadius: SIZES.radius,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onPress={ getLogin }
                    // onPress={() => navigation.navigate("Home", {})}
                >
                    <Text style={{ ...FONTS.h3, color: COLORS.white }}>Login</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.black }}>
            <View style={{ height: 200, marginHorizontal: 40, marginTop: 150 }}>
                {loginView()}
                {/* <WebView
                    originWhitelist={['*']}
                    source={{ html: '<h1>This is a static HTML source!</h1>' }}
                /> */}
            </View>
        </SafeAreaView>
        

    )
}
export default Login;