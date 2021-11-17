import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect} from 'react';
import { View, Alert, Button, TextInput, TouchableOpacity, Text, StyleSheet, SnapshotViewIOSBase} from "react-native";
import {Accordion, Card, InputGroup, ListGroup, Modal} from 'react-bootstrap';
import { useIsFocused } from "@react-navigation/core";

import { Ionicons } from '@expo/vector-icons';
import firebase from '../database/firebase'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

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
    <Accordion defaultActiveKey="0">
     <Accordion.Item eventKey="0">
      <Accordion.Header>Add A New Activity TO DO</Accordion.Header>
      <Accordion.Body>
      <InputGroup className="mb-3">
    <InputGroup.Text id="inputGroup-sizing-default">TO DO</InputGroup.Text>
    <input value={input} onInput={e => setInput(e.target.value)} />
      </InputGroup>
      <Button title={"ADD"} onPress={createItem}/>
      </Accordion.Body>
     </Accordion.Item>
     <Accordion.Item eventKey="1">
      <Accordion.Header>MY ACTIVITIES TO DO</Accordion.Header>
      <Accordion.Body>
        {

        list.map((item, index) => (
          <Modal.Dialog>
          <Modal.Header >
            <Modal.Title>{item.title}</Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <TouchableOpacity 
      onPress={
        event => {
        moveToDone(item.id)}
      }> <Ionicons size={'30px'} name="checkmark"/> </TouchableOpacity>
<TouchableOpacity
        onPress={event => {removeTODO(item.id)}}>
         <Ionicons size={'30px'} name="close"/> 
        </TouchableOpacity>
          </Modal.Footer>
        </Modal.Dialog>
        ))}
      </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="2">
    <Accordion.Header>ACTIVITIES DONE!!</Accordion.Header>
    <Accordion.Body>
     {

        done.map((item, index) => (
          <Modal.Dialog>
          <Modal.Header closeButton>
            <Modal.Title>{item.title}</Modal.Title>
          </Modal.Header>
          <Modal.Footer>
          <TouchableOpacity
        onPress={event => {moveToList(item.id)}}>
         <Ionicons size={'30px'} name="arrow-back"/> 
        </TouchableOpacity>
        <TouchableOpacity
        onPress={event => {removeTODO(item.id)}}>
         <Ionicons size={'30px'} name="close"/> 
        </TouchableOpacity>

          </Modal.Footer>
        </Modal.Dialog>
        ))}
    </Accordion.Body>
  </Accordion.Item>
</Accordion>
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