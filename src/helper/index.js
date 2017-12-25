import { AsyncStorage } from "react-native";

export function setAsyncStorage(key,value){
    try{
        AsyncStorage.setItem(key, value);
    }
    catch(e){
        alert('set error')
    }
}

export function getAsyncStorage(key,callback){
    try{
        debugger;
       var s= AsyncStorage.getItem("@user").then((value) => {
            debugger;
            this.setState({"myKey": value});
        }).done();
        AsyncStorage.getItem(key).then(callback).done();
    }
    catch(e){
        alert('get error')
    }
}   

export function clearAsyncStorage(){
    try{
        AsyncStorage.clear();
    }
    catch(e){
        alert('clear error')
    }
}   