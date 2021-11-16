import * as React from 'react';
import { StatusBar } from "expo-status-bar";
import { Text, View, StyleSheet, TextInput ,TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useIsFocused } from "@react-navigation/core";

function ProfileScreen() {
    const [counter, setCounter] = React.useState(0);
      const [show, setshow] =React.useState(false)
      function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
      const increaseCounter = () => {
          setCounter((current) => current + 1);
      };
      const decreaseCounter = () => {
          setCounter((current) => current - 1);
      };
      
      async function autoCounter(){
        for (let index = counter; index < 100; index++) { 
          await sleep(50)
          setCounter((current) => current + 1);
  
        }
      }
    return (
      <View style={styles.MainContainer}>
              <Text style={{ ...styles.normalText, ...styles.boldText }}>
                  Counter
              </Text>
              <Text style={styles.normalText}>{counter}</Text>
              <TouchableOpacity
                  onPress={autoCounter}
                  style={styles.buttonStyles}
              >
                  <Text style={styles.buttonText}>++</Text>
              </TouchableOpacity>
              <TouchableOpacity
                  onPress={counter < 100 ? increaseCounter : null}
                  style={styles.buttonStyles}
              >
                  <Text style={styles.buttonText}>+</Text>
              </TouchableOpacity>
              <TouchableOpacity
                  onPress={counter > 0 ? decreaseCounter : null}
                  style={styles.buttonStyles}
              >
                  <Text style={styles.buttonText}>-</Text>
              </TouchableOpacity>
              <StatusBar style="auto" />
      </View>
    );
  }
  const styles = StyleSheet.create({
    MainContainer: {
      flex: 1,
      margin: 10,
      alignItems: 'center'
      
    },
   
    TextStyle:{
      fontSize : 25,
       textAlign: 'center'
    },
    input: {
      position: 'relative',
      height: 50,
      width:200,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
    buttonStyles: {
      borderRadius: 50,
      padding: 5,
      margin: 10,
      backgroundColor: "blue",
      width: 200,
      alignItems: "center",
  },
  buttonAddStyles: {
    position:'relative',
    borderRadius: 0,
    padding: 5,
    margin: 10,
    backgroundColor: "red",
    width: 200,
    height: 40,
    alignItems: "center",
  },
  buttonText: {
    position: "relative",
    fontSize: 30,
    color: "white",
  },
  });
export default ProfileScreen;