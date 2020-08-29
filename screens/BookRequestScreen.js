import React,{Component} from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  Alert} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader'

export default class BookRequestScreen extends Component{
  constructor(){
    super();
    this.state ={
      userId : firebase.auth().currentUser.email,
      bookName:"",
      price:"",
      reasonToRequest:""
    }
  }

  createUniqueId(){
    return Math.random().toString(36).substring(7);
  }

getBookRequest=()=>{
  var bookRequest=db.collection('requested_books')
  .where('user_id','==',this.state.userId)
  .get()
    .then((snapshot)=>{
      if(doc.data().book_status !== "recieved"){
this.setState=({
  request_id:doc.data().request_id,
  requestedBookName:doc.data().book_name,
  book_status:doc.data().book_status,
  docId:doc.id
})
      }
    })
  
}
getIsBookRequestActive(){
  db.collection('users')
  .where('email_id','==',this.state.userId)
  .onSnapshot(querySnapshot=>{
    querySnapshot.forEach(doc=>{
      isBookRequestActive:doc.data().isBookRequestActive,
userDocId.docId
    })
  })
}

  addRequest =(bookName,reasonToRequest)=>{
    var userId = this.state.userId
    var randomRequestId = this.createUniqueId()
    db.collection('requested_books').add({
        "user_id": userId,
        "book_name":bookName,
        "price" : price,
        "reason_to_request":reasonToRequest,
        "request_id"  : randomRequestId,
    })
await this.getBookRequest()
db.collection('users').where('email_id','==',userId).get()
.then()
.then((snapshot)=>{
  db.collection('users').doc(doc.id).update({
    isBookRequestActive:true
  })
})
    this.setState({
        bookName :'',
        price:'',
        reasonToRequest : ''
    })

    return Alert.alert("Book Requested Successfully")
  }


  render(){
    if(this.state.isBookRequestActive===true){
      return(
        <View style={{flex:1,justifyContent:'center',}}>
          <View style={{borderColor:'orange',borderWidth:2,justifyContent:'center',alignItems:'center',padding:10}}>
            <Text>Item Name</Text>
      <Text>{this.state.requestedBookName}</Text>
          </View>
          <View style={{borderColor:'orange',borderWidth:2,justifyContent:'center',alignItems:'center',padding:10}}>
            <Text>Book Staus</Text>
      <Text>{this.state.bookStaus}
      </Text>
          </View>
        </View>
      )
    }
    else{
    return(
        <View style={{flex:1}}>
          <MyHeader title="Request Book" navigation ={this.props.navigation}/>
            <KeyboardAvoidingView style={styles.keyBoardStyle}>
              <TextInput
                style ={styles.formTextInput}
                placeholder={"enter item name"}
                onChangeText={(text)=>{
                    this.setState({
                        bookName:text
                    })
                }}
                value={this.state.bookName}
              />
              <TextInput
                style ={[styles.formTextInput,{height:300}]}
                multiline
                numberOfLines ={8}
                placeholder={"Description"}
                onChangeText ={(text)=>{
                    this.setState({
                        reasonToRequest:text
                    })
                }}
                value ={this.state.reasonToRequest}
              />
               <TextInput
                style ={[styles.formTextInput,{height:300}]}
                multiline
                numberOfLines ={8}
                placeholder={"price"}
                onChangeText ={(text)=>{
                    this.setState({
                        price:text
                    })
                }}
                value ={this.state.price}
              />
              <TouchableOpacity
                style={styles.button}
                onPress={()=>{this.addRequest(this.state.bookName,this.state.reasonToRequest, this.state.price)}}
                >
                <Text>Post Ad</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    )
              }
  }
}

const styles = StyleSheet.create({
  keyBoardStyle : {
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  formTextInput:{
    width:"75%",
    height:35,
    alignSelf:'center',
    borderColor:'#ffab91',
    borderRadius:10,
    borderWidth:1,
    marginTop:20,
    padding:10,
  },
  button:{
    width:"75%",
    height:50,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10,
    backgroundColor:"#ff5722",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    marginTop:20
    },
  }
)
