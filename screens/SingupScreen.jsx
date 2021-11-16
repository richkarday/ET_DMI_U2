import React, { useState } from 'react';
import styled from "styled-components/native";
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import { TouchableOpacity } from 'react-native';
import firebase from '../database/firebase';

const Container = styled.View `
    background-color: #f9fafd;
    flex: 1;
    justify-content: center;
    align-items: center;
    padding: 20px;
`
const StyledText = styled.Text `
    font-size: 28;
    margin-bottom: 10;
    color: #051d5f;
`
const NavButton = styled.View `
    margin-top: 15;
`
const NavButtonText = styled.View `
    font-size: 18;
    font-weight: 500;
    color: #2e64e5;
`
const Logo = styled.Image`
    height: 150;
    width: 150;
`

const TextPrivate = styled.View `
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 15;
`

const ColorTextPrivate = styled.Text `
    font-size: 13;
    font-weight: 400;
    color: grey;
`


const SingupScreen = ({navigation}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const registerUser = () => {
    if(email === '' && password === '') {
        console.log("Enter credentiales");
    } else {
      firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        console.log('User registered successfully!')
        navigation.navigate('login')
        // this.props.navigation.navigate('Login')
      })
      .catch(error => this.setState({ errorMessage: error.message }))      
    }
  }

    return (
       <Container>
           <StyledText>Create an account</StyledText>
           <FormInput
                placeholderText = {email}
                onChangeText = {(userEmail) => setEmail(userEmail)}
                placeholderText = "Email"
                iconType = "user"
                keyboardType = "email-address"
                autoCapitalize = "none"
                autoCorrect = "false"
           />
           <FormInput
                placeholderText = {password}
                onChangeText = {(userPassword) => setPassword(userPassword)}
                placeholderText = "Password"
                iconType = "lock"
                secureTextEntry = {true}
           />
           <FormButton
                buttonTitle = "Sing Up"
                onPress={() => registerUser()}

           />
           <TextPrivate>
               <ColorTextPrivate> By registering, you confirm that you accept our </ColorTextPrivate>
               <TouchableOpacity onPress={() => alert('Terms Clicked')}>
                   <ColorTextPrivate style={{color: '#e88832'}}> Terms of service </ColorTextPrivate>
               </TouchableOpacity>
                <ColorTextPrivate> and </ColorTextPrivate>
                <ColorTextPrivate style={{color: '#e88832'}}> Privacy Policy </ColorTextPrivate>
           </TextPrivate>

       </Container>
    )
}

export default SingupScreen;