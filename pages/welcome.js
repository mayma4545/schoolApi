import { View, Image, StyleSheet, StatusBar, Pressable, Alert } from "react-native";
import { useEffect, useState } from "react";


export default function Welcome(props){
    
    function nextPage(){
        props.page(2)
    }
    return(
        <View style={styles.welcome}>
            <Pressable style={styles.btn} onPress={nextPage}>
                <Image style={styles.image} source={require("../../assets/logo.png")} resizeMode="stretch"></Image>
            </Pressable>

            
            <StatusBar />
        </View>
    )}

const styles = StyleSheet.create({
    welcome:{
        flex:1,
        width:"100%",
        backgroundColor:"#110c47",
        justifyContent:"center",
        alignItems:"center"
    },
    btn:{

    },
    image:{
        width:300,
        height:300
    }

})