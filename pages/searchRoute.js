import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TextInput, Image, ImageBackground, Pressable, Dimensions, Button, Alert, ScrollView } from "react-native";
import { BackHandler } from "react-native";
import * as SQLite from 'expo-sqlite';
import data from "../data";
import adminData from "../adminData";
import roseroData from "../roseroData";

const db = SQLite.openDatabase("school3")
const { width, height } = Dimensions.get("window");

export default function SearchPage(props) {
  const [getSearch, setSearch] = useState("");
  const [getData, setData] = useState([])
 
  const [getSearchResult, setSearchResult] = useState([]);
  function handleBackPress(){
    props.page(2)
    return true
  }
  function refreshData(){
  let dir = []
  if(props.gate == "main"){
    console.log("main is selected")
  for(let i = 0; i < data.length; i++){
    if(data[i].gate == props.gate){
      dir.push(data[i])
    }}
    console.log("bagi")
    setData(dir)
  }
  

  if(props.gate == "admin"){
    for(let i = 0; i < adminData.length; i++){
      if(adminData[i].gate == props.gate){
        dir.push(adminData[i])
      }}
      console.log("bagi")
      setData(dir)
    }

    if(props.gate == "rosero"){
    for(let i = 0; i < roseroData.length; i++){
        dir.push(roseroData[i])
      }
      //console.log(dir)
      setData(dir)
    }

  }
  
  useEffect(() => { 
    /*adminData.map((e)=>{
      if(!e.last) console.log(e.id)
      if(!e.last2) console.log(e.id)
      if(!e.section) console.log(e.id)
    })*/
    
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress
    );
  
    return () => backHandler.remove();
  }, []);
  
  useEffect(() => {
    refreshData()
    if (getSearch.trim() === "") {
      setSearchResult([]); // Clear search results if search bar is empty
    } else {
      let res = getData.filter((item) =>
        item.building.toLowerCase().startsWith(getSearch.toLowerCase()) ||
        item.grade_level.toLowerCase().startsWith(getSearch.toLowerCase()) ||
        item.teacher.toLowerCase().startsWith(getSearch.toLowerCase()) ||
        item.teacher_assist.toLowerCase().startsWith(getSearch.toLowerCase()) ||
        item.facilities.toLowerCase().startsWith(getSearch.toLowerCase()) ||
        item.last && item.last.toLowerCase().startsWith(getSearch.toLowerCase()) ||
        item.last2 && item.last2.toLowerCase().startsWith(getSearch.toLowerCase()) ||
        item.section && item.section.toLowerCase().startsWith(getSearch.toLowerCase()) ||
        item.room.toLowerCase().startsWith(getSearch.toLowerCase())
      );
      setSearchResult(res);
      
    }
  }, [getSearch]);

  return (
    <View style={styles.searchContainer}>
      <ImageBackground style={{ flex: 1 }} source={require("../../assets/back.jpg")} resizeMode="cover">
        <View style={{ position: "absolute", width: "100%", height: "100%", backgroundColor: "#91C3FD", opacity: 0.6 }}></View>
        <View style={styles.inputContainer}>
          <Image style={styles.searchLogo} source={require("../../assets/searchLogo.png")} resizeMode="cover"></Image>
          <TextInput style={styles.input} onChangeText={(txt) => setSearch(txt)} placeholder="search here"></TextInput>

        </View>
        <ScrollView style={getSearch.trim() == "" ? {display:"none"} :styles.searchResult}>
            {getSearchResult.length > 0 && getSearch.trim() !== "" ? (
              getSearchResult.map((data, index) => (
              
                <Pressable key={index} style={styles.searchResultPressable} onPress={()=> props.page(4, props.gate, data.id, data)}>
                  <Text style={styles.searchResultText}>{data.description}</Text>
                </Pressable>
              ))
            ) : (
              <Text style={styles.searchResultText}>No results found</Text>
            )}
          </ScrollView>
        <View style={styles.instruction}>
          <Text style={{ fontSize: 16, color: "white", fontFamily: "Poppins-black", marginBottom: 20 }}>Things you can search in the search bar:</Text>
          <Text style={styles.bulletText}>* Grade Level</Text>
          <Text style={styles.bulletText}>* Teacher (eg. joy)</Text>
          <Text style={styles.bulletText}>* Section (eg, Pintados)</Text>
          <Text style={styles.bulletText}>* Building Number (eg, Building 1)</Text>
          <Text style={styles.bulletText}>* Comfort Room (CR)</Text>
          <Text style={styles.bulletText}>* Facilities (eg. Auditorium)</Text>
          <Text style={styles.bulletText}>* Room (eg. Room 1)</Text>
      
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignContent: "center",
    zIndex: 1
  },
  searchResult: {
    position: "absolute",
    top:60,
    left:30,
    maxHeight:300,
    backgroundColor: "white",
    width: 300,
    padding: 8,
    zIndex: 5,
  },
  searchResultText: {
    fontSize: 16,
  },
  searchResultPressable: {
    padding: 10,
  },
  bulletText: {
    fontFamily: "Poppins-black",
    color: "white",
    marginBottom: "2%",
    marginLeft: 20,
  },
  inputContainer: {
    alignSelf: "center",
    width: "85%",
    margin: 10,
    paddingVertical: 8,
    paddingLeft: "12%",
    borderColor: "black",
    borderWidth: 3,
    borderRadius: 20,
    backgroundColor: "white"
  },
  searchLogo: {
    position: "absolute",
    width: "10%",
    height: "100%",
    top: "30%",
    marginLeft: "3%"
  },
  input: {
    fontSize: 18,
    paddingVertical: 1
  },
  instruction: {
    position: "absolute",
    width: "80%",
    height: "40%",
    backgroundColor: "#294471",
    top: height - 330,
    alignSelf: "center",
    paddingTop: 20,
    paddingHorizontal: 10,
    borderRadius: 30,
    zIndex: 0
  }
});
