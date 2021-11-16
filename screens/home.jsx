import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect} from 'react';
import { View, Alert, Button, TextInput, TouchableOpacity, Text, StyleSheet, SnapshotViewIOSBase} from "react-native";
import { useIsFocused } from "@react-navigation/core";
import { ListItem, Avatar } from 'react-native-elements'

import { Ionicons } from '@expo/vector-icons';
import firebase from '../database/firebase'


function HomeScreen() {
  const [input, setInput] = useState('');
  const [list, setList] = useState([]);
  const [done, setDone] = useState([]);
  const isFocused = useIsFocused();
  
    React.useEffect(() => {
      if (isFocused) {
        listItems()
      }
    }, [isFocused]);



  const createItem = async () =>{
    const newRef = firebase.database().ref("etdmiu2");
    if(input == ""){
      alert("Please provide something!!")
    } else {
      try{
        await newRef.push({
          title: input,
          complete: false,
          user:localStorage.getItem('user')
        });

        listItems()
      } catch(err){
        console.log(err)
      }
    }
  }
  
  const listItems = () =>{
    const listRef = firebase.database().ref("etdmiu2").orderByChild('user').equalTo(localStorage.getItem('user'));
    listRef.on("value", (snapshot) => {
      const getAll = snapshot.val();
      const list = [];
      const done = []
      for (let id in getAll){
        
        if (getAll[id]['complete'] == false) {
          list.push({id, ...getAll[id]})
          console.log(getAll[id]);
        }else{
          done.push({id, ...getAll[id]})
          console.log(getAll[id]);
        }
      }
      setList(list);
      setDone(done)
     
    })
  }


  const moveToDone = (item) =>{
    const updateRef = firebase.database().ref('etdmiu2').child(item);
    updateRef.update({
      complete: true
    })
  }
  const moveToList = (item) =>{
    const updateRef = firebase.database().ref('etdmiu2').child(item);
    updateRef.update({
      complete: false
    })
  }
  const removeTODO = (item) =>{
    const updateRef = firebase.database().ref('etdmiu2').child(item);
    updateRef.remove()
  }
 


    return (
      <View>
    <input value={input} onInput={e => setInput(e.target.value)} />
      <Button title={"ADD"} onPress={createItem}/>
        {
        list.map((item, index) => (
          <ListItem key={item.id} bottomDivider>
          <ListItem.Content>
            <ListItem.Title>{item.title}</ListItem.Title>
            <ListItem.Subtitle>  <TouchableOpacity key={index}
      onPress={
        event => {
        moveToDone(item.id)}
      }> <Ionicons size={'30px'} name="checkmark"/> </TouchableOpacity> 
      <TouchableOpacity key={index}
        onPress={event => {removeTODO(item.id)}}>
         <Ionicons size={'30px'} name="close"/> 
        </TouchableOpacity>
      </ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
        ))}
        <Text> DONE!!</Text>
     {

        done.map((item, index) => (
          <ListItem key={item.id}>
          <ListItem.Content>
            <ListItem.Title>{item.title}</ListItem.Title>
            <ListItem.Subtitle>
            <TouchableOpacity
        onPress={event => {moveToList(item.id)}}>
         <Ionicons size={'30px'} name="checkmark"/> 
        </TouchableOpacity>
        <TouchableOpacity
        onPress={event => {removeTODO(item.id)}}>
         <Ionicons size={'30px'} name="close"/> 
        </TouchableOpacity>
            </ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
        ))}
</View>
    );
  }
  const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10
  },
  button: {
    alignItems: "center",
    backgroundColor: "#0000ff",
    padding: 10,
    height: '10px',
    width: '10px'
  },
  countContainer: {
    alignItems: "center",
    padding: 10
  },
  Icons: {
    alignItems: 'left'
  }
});
export default HomeScreen;