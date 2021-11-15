import React, { useState } from 'react';
import styled from "styled-components/native";
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';

const Container = styled.View `
    background-color: #f9fafd;
    flex: 1;
    justify-content: center;
    align-items: center;
    padding: 20px;
`
const StyledText = styled.Text `
    font-size: 28;
    margin-bottom: 10px;
    color: #051d5f;
`
const NavButton = styled.View `
    margin-top: 15;
`
const NavButtonText = styled.Text `
    font-size: 18;
    font-weight: 500;
    color: #2e64e5;
`
const Logo = styled.Image`
    height: 150;
    width: 150;
`

const ForgotButton = styled.TouchableOpacity `
    margin-top: 15px;
`


const loginScreen = ({navigation}) => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    return (
       <Container>
           <Logo source={require('../assets/logo.png')}/>
           <StyledText>RN Social App</StyledText>
           <FormInput
                placeholderText = {email}
                onChangeText = {(userEmail) => setEmail(userEmail)}
                placeholderText = "Email"
                iconType = "user"
                keyboardType = "email-address"
                autoCapitalize = "none"
           />
           <FormInput
                placeholderText = {password}
                onChangeText = {(userPassword) => setPassword(userPassword)}
                placeholderText = "Password"
                iconType = "lock"
                secureTextEntry = {true}
           />
           <FormButton
                buttonTitle = "Sing In"
                onPress = {() => alert('Sing in clicked')}
           />
           <ForgotButton onPress={()=> navigation.navigate('Singup')}>
            <NavButtonText>Don't have an account? Create here</NavButtonText>
           </ForgotButton>
       </Container>
    )
}

export default loginScreen;