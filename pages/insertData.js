import { useState } from "react";
import { View, StyleSheet, Button, Alert, StatusBar, Text,Image } from "react-native";
import * as SQLite from 'expo-sqlite';


const db = SQLite.openDatabase("school3")
db.transaction(tx=>{
    tx.executeSql("CREATE TABLE IF NOT EXISTS images (id INTEGER PRIMARY KEY AUTOINCREMENT, des_id INTEGER, image_dir text)")
},(error)=> Alert.alert("error on database creation"+error))
db.transaction(tx=>{
    tx.executeSql("CREATE TABLE IF NOT EXISTS destination (id INTEGER PRIMARY KEY AUTOINCREMENT, gate text ,building text, room, grade_level, facilities, teacher, teacher_assist, description)")
},(error)=> Alert.alert("error on database creation"+error))




export default function Insert(props){
   const [getId, setId] = useState("0")
   const [getDescription, setDescription] = useState("")
   const [getImageDir, setImageDir] = useState([])

   function deleteDes(){
    db.transaction(tx=>{
        tx.executeSql("DELETE FROM  destination where id = ?",[40],(tx, res)=>{
            if(res.rowsAffected > 0) {
                console.log("delete success");
                Alert.alert("delete success");
            } else {
                console.log("delete failed");
                Alert.alert("error on deleting data");
            }
        });
    });
}
   function selectData(){
    db.transaction(tx=>{
        tx.executeSql("SELECT * FROM destination ORDER BY id DESC LIMIT 1",[], (tx, res)=>{
            let item = []
            if(res.rows.length > 0){
                for(let i = 0; i < res.rows.length; i++){
                    item.push(res.rows.item(i))
                }
                console.log("Selected data:", item[0].id);
                setId(item[0].id)
                setDescription(item[0].description)
                console.log(item)
                
            }else{
                console.log("No data found");
                Alert.alert("no destination")
            }
        });
    }); 
}
function selectImagesOFDes(){
    db.transaction(tx=>{
        tx.executeSql("SELECT * FROM images where des_id = ?",[getId], (tx, res)=>{
            let dir = []
            if(res.rows.length > 0){
                for(let i = 0; i < res.rows.length; i++){
                    dir.push(res.rows.item(i).image_dir)
                }
               console.log(dir)
               setImageDir(dir)
                
            }else{
                console.log("No data found");
                Alert.alert("no data")
            }
        });
    }); 
}
function insertImageOfDes(){
    db.transaction(tx=>{
        tx.executeSql("INSERT INTO images(des_id, image_dir) VALUES (?,?)",[getId,"../../assets/Path/Main/Building 21/Room 1 Janine Badillo Rean M. Essler Grade 10 Kasanggayahan/7"],(tx, res)=>{
            if(res.rowsAffected > 0) {
                console.log("Insert success");
                Alert.alert(" insert success");
                
                
            } else {
                console.log("Insert failed");
                Alert.alert("error on inserting data");
            }
        });
    });
}

   function insertDes(){
    db.transaction(tx=>{                                                                                                                                  // gate = building = room = grade_level = facilities = teacher = teacher_Assist = description
        tx.executeSql("INSERT INTO destination (gate, building, room, grade_level, facilities,  teacher, teacher_assist, description) VALUES (?,?,?,?,?,?,?,?)",["main","Building 21","room 1","grade 10","Kasanggayahan","Janine Badillo","Rean M. Essler", "Building 21, Room 1 Janine Badillo Rean M. Essler Grade 10 Kasanggayahan"],(tx, res)=>{
            if(res.rowsAffected > 0) {
                console.log("Insert success");
                Alert.alert("success");
                selectData()
                
            } else {
                console.log("Insert failed");
                Alert.alert("error on inserting data");
            }
        });
    });
}
    return(
        <View style={styles.container}>
            <Button title="add destination" onPress={insertDes} />
            <Button title="check destination" color={"lightgreen"} onPress={selectData}/>
            <Button title="add images" color={"blue"} onPress={insertImageOfDes}/>
            <Button title="show images ko" color={"blue"} onPress={selectImagesOFDes}/>
            
            <Text>Current description: {getDescription}</Text>
            <Text>id: {getId}</Text>
            <Text>Images:{getImageDir}</Text>
            {getImageDir && getImageDir.length > 0 ?
            getImageDir.map(e=>{
               <Text>hi e.image_dir</Text>
            }): <Text style={{color:"red"}}>No Current image</Text>}
            <StatusBar/>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        width:"100%",
        height:"100%",
        backgroundColor:"cyan",
        gap:20
    }
});
