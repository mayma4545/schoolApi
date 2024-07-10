import { View, Text, StyleSheet, Pressable, ImageBackground, Image } from "react-native";
import { useEffect } from "react";
import { BackHandler } from "react-native";
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase("school3")

export default function Home(props){

    function getUwu(){
        console.log("hi")
        let da = []
        db.transaction(tx=>{
            tx.executeSql("SELECT * FROM destination",[], (e,res)=>{
                if(res.rows.length>1){
                for(let i = 0; i < res.rows.length; i++){
                  da.push(res.rows.item(i))
                }
            }else{
                console.log("error")
            }
            console.log(da)
            })
            })
    }
    function handleBackPress(){
        props.page(1)
        return true
      }
      useEffect(() => {
        const backHandler = BackHandler.addEventListener(
          'hardwareBackPress',
          handleBackPress
        );
      
        return () => backHandler.remove();
      }, []);
    return (
        <View style={styles.home}>
            <ImageBackground style={styles.background} source={require("../../assets/back.jpg")} resizeMode="cover">
                <View style={styles.opacit}></View>
           <View style={styles.header}>
                <Text style={styles.headerUpperText}>Good Day!</Text>
                <Text style={styles.headerLowerText}>Which gate will you use?</Text>
           </View>
           <View style={styles.btnContainer}>
                    <Pressable style={styles.btn} onPress={()=> props.page(3, "admin")}><Text style={styles.btnText}>Admin Gate</Text></Pressable>
                    <Pressable style={styles.btn} onPress={()=> props.page(3, "rosero")}><Text style={styles.btnText}>Rosero Gate</Text></Pressable>
                    <Pressable style={styles.btn} onPress={()=> props.page(3, "main")}><Text style={styles.btnText}>Main Gate</Text></Pressable>
                </View>
                <Image style={styles.girl} source={require("../../assets/Kawaii-removebg-preview.png")} resizeMode="stretch"></Image>
                </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    home:{
        flex:1,
        width:"100%",
        backgroundColor:"cyan",
    },
    opacit:{
        position:"absolute",
        backgroundColor:"#91C3FD",
        opacity:0.5,
        width:"100%",
        height:"100%"
    },
    header:{
      //  borderColor:"red",
     //   borderWidth:2
     marginLeft:"5%",
    },
    headerUpperText:{
        fontFamily:"yellowtail",
        marginTop:"10%",
        fontSize:40,
        color:"black",
        fontWeight:"600"
    },
    headerLowerText:{
        fontSize:17,
        marginTop:20,
        color:"black",
        fontWeight:"700",
        letterSpacing:1,
        fontFamily:"Poppins-black"
    },
    btnContainer:{
     //   borderColor:"red",
    //    borderWidth:2,
    marginTop:"10%",
        alignItems:"center",
        justifyContent:"center",

    },
    btn:{
        backgroundColor:"#6f97fa",
        width:"65%",
        height:"15%",
        justifyContent:"center",
        marginBottom:"7%",
        borderBottomRightRadius:25,
        borderTopEndRadius:25,
        borderBottomStartRadius:10,
       borderBottomColor:"black",
       borderBottomWidth:3,
       borderEndColor:"black",
       borderEndWidth:3,
       borderTopColor:"black",
       borderTopWidth:1.2,
       borderLeftColor:"black",
       borderLeftWidth:1,
        opacity:1
        
    },
    btnText:{
        fontFamily:"sharp",
        color:"black",
        textAlign:"center",
        fontSize:30,
        fontWeight:"500"
    },
    background:{
        position:"relative",
        width:"100%",
        height:"100%"
    },
    girl:{
        position:"absolute",
        bottom:0,
        left:-30,
        width:"80%",
        height:"40%"
    }

    
})