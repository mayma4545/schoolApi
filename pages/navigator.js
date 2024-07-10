import React, { useState, useEffect } from 'react';
import { StatusBar, StyleSheet, View, Text, ScrollView, Image, ImageBackground } from 'react-native';
import * as SQLite from 'expo-sqlite';
import dir_Images from './images'; 
import adminImage from './adminImages'
import roseroImages from './roseroImages';
import { BackHandler } from 'react-native';
import data from '../data';

const db = SQLite.openDatabase("school3");

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function Navigator(props) {
  const [imageGroups, setImageGroups] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [renderedImages, setRenderedImages] = useState([]);
  const [getDes, setDes] = useState("")

  function show() {
    if(props.gate == "main"){
    let items = dir_Images.filter(image => image.id === props.des);
    setImageGroups(items);
    setRenderedImages([]);
    setCurrentImageIndex(0);
    }
    if(props.gate == "admin"){
      let items = adminImage.filter(image => image.id === props.des);
      setImageGroups(items);
      setRenderedImages([]);
      setCurrentImageIndex(0);
      }
      if(props.gate == "rosero"){
        let items = roseroImages.filter(image => image.id === props.des);
        setImageGroups(items);
        setRenderedImages([]);
        setCurrentImageIndex(0);
        }
  }

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress
    );

    // Show images automatically on component mount
    show();

    return () => backHandler.remove();
  }, []); // Empty dependency array ensures this effect runs only once on mount

  useEffect(() => {
    if (currentImageIndex < imageGroups.length) {
      const timeout = setTimeout(() => {
        setRenderedImages(prevImages => [...prevImages, imageGroups[currentImageIndex]]);
        setCurrentImageIndex(currentImageIndex + 1);
      }, 200); // Delay in milliseconds (adjust as needed)
      
      return () => clearTimeout(timeout);
    }
  }, [currentImageIndex, imageGroups]);

  function handleBackPress() {
    props.page(3);
    return true;
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={require("../../assets/back.jpg")} style={{width:"100%", height:"100%"}}>
        <View style={{width:"100%", height:"100%", backgroundColor:"#91c3fdc9", position:"absolute"}}></View>
        <View style={{paddingLeft:20, marginTop:10, marginBottom:30, backgroundColor:"white", borderRadius:20, marginHorizontal:10, paddingVertical:5}}>
      <Text style={styles.des}>{capitalize(props.dataName.building)}</Text>
      {props.dataName.room != "null" ? <Text style={styles.des}>{props.dataName.room}</Text>: console.log("K")}
      {props.dataName.facilities == "null" || props.dataName.grade_level != "null" ? console.log("oki") : <Text style={styles.des}>{capitalize(props.dataName.facilities)}</Text>}
      { props.dataName.teacher == "null" ?  console.log("hi"): <Text style={styles.des}>{capitalize(props.dataName.teacher)}</Text>}
      {props.dataName.grade_level == "null" ? console.log("nuill") : <Text style={styles.des}>{capitalize(props.dataName.grade_level)} - {capitalize(props.dataName.facilities)}</Text>}

      </View>
      <ScrollView style={styles.pathImageContainer}>
        {renderedImages.map((image, index) => (
          <View key={index} style={styles.imageContainer}>
            <Image  source={require("../../assets/black-arrow.png")} style={{width:20, height:30 }}/>
            <Image
              style={styles.image}
              source={image.path}
            />
          </View>
        ))}
      </ScrollView>
      <StatusBar />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:"100%",
    backgroundColor: "#91C3FD",
  },
  des:{
    fontSize:19,
    textAlign:"justify",
    fontFamily:"Poppins-black",
    width:300,
    color:"#4d4c4c",
    fontWeight:"700"
  },
  pathImageContainer: {
    flex: 1,
    width: "100%",
  },
  imageContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  imageText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  image: {
    marginTop:10,
    width: 300,
    height: 200,
  },
});
