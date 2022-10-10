

import * as jQuery from 'jquery';

import {dialogue, initialize} from './script';

var textInp = <HTMLInputElement> document.getElementById("textInp");
var textSubmit = document.getElementById("textSubmit");
var chatscroll = document.getElementById("chatscroll");
var phoneChat = document.getElementById("phone-chat");
var reset = document.getElementById("reset");
var found;
var first;

let inputs = [];
textInp.disabled = true;
var form = new FormData();
var json = dialogue;
//var json = [{"type":"node","inputs":[{"name":"Chatbots","connectedTo":2},{"name":"Live chat functionality on my website","connectedTo":3},{"name":"I need help with something","connectedTo":4}],"messages":["What are you looking for?"],"position":{"x":384,"y":328}},{"type":"node","inputs":[{"name":"Just looking around","connectedTo":2},{"name":"Looking for something specific","connectedTo":0}],"messages":["Hi there! How can I help you today? 😀"],"position":{"x":97,"y":139},start:true},{"type":"node","inputs":[{"name":"Yes of course!","connectedTo":5},{"name":"Nah I'm looking for something else!","connectedTo":null},{"name":"I'll get back to you","connectedTo":null}],"messages":["We offer fast and efficient bots like myself (not to brag haha😆)","Would you interested in something like this?"],"position":{"x":710,"y":72}},{"type":"node","inputs":[{"name":"Value1","connectedTo":9},{"name":"Value2","connectedTo":null},{"name":"asda","connectedTo":null}],"messages":["Hey"],"position":{"x":768,"y":386}},{"type":"node","inputs":[{"name":"Value1","connectedTo":9},{"name":"Value2","connectedTo":null}],"messages":["Hi"],"position":{"x":779,"y":593}},{"type":"input","inputs":[{"name":"On input","connectedTo":7}],"messages":["Splendid! When would you like it delivered?"],"position":{"x":1031,"y":116},"inpType":"date"},{"type":"submit","inputs":[],"messages":[],"position":{"x":1452,"y":408}},{"type":"input","inputs":[{"name":"On input","connectedTo":8}],"messages":["Mhmm. And your email is?"],"position":{"x":1069,"y":352},"inpType":"email"},{"type":"input","inputs":[{"name":"On input","connectedTo":10}],"messages":["Any message you would like to me convey?"],"position":{"x":1261,"y":261},"inpType":"text"},{"type":"submit","inputs":[],"messages":[],"position":{"x":1016,"y":580}},{"type":"node","inputs":[{"name":"Thank you!","connectedTo":6}],"messages":["Thank you for visiting. We're done here!"],"position":{"x":1267,"y":480}}];
const messages = document.getElementsByClassName("msg");
for (let i = 0; messages.length > i; i++) {
  setTimeout(() => messages[i].classList.add("show"), i * 1000);
}


document.addEventListener("DOMContentLoaded", function(){
  /*
  for(var i=0;i<collection.lenth; i++){
  collection[i].configure();
  }
  */
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      //console.log(this.responseText);
      var chatdat = JSON.parse(this.responseText);
      //console.log(chatdat);
      var chatText = chatdat[0].chatdat.json;
      //console.log(chatText);
      var chatJson = JSON.parse(chatText);
      console.log(chatJson);
      initialize(chatJson);
      found = findStart(dialogue)
      console.log(found);
      first = new Message(found);
    }
  };
  
  //console.log(dialogue);
  var dat = JSON.stringify(dialogue);
  //console.log(dat);
  
  xhttp.open("POST", "/fetch", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send();
  
  
  })


reset.onclick = function(){
  phoneChat.innerHTML = "";
  found = findStart(dialogue);
  first = new Message(found);
  inputs = [];
  console.log(form);
}


function findStart(jsonObj) {

console.log(jsonObj);

for(var i=0; i< jsonObj.length; i++){
  if(jsonObj[i].start== true){
    return jsonObj[i];
  }
}

  // return jsonObj.filter(
  //   function(data) {
  //     return data.type == "node"
  //   }
  // );
}




function OptionObj(connectedTo,name){
  this.connectedTo = connectedTo;
  this.name = name;
  this.domElement = document.createElement("div");
  this.domElement.innerHTML = name;
  var that = this;
  this.domElement.onclick = function(){
      this.parentElement.remove();
      var reply = document.createElement("div");
      reply.innerHTML = that.name;
      reply.classList.add("phone-chat-msg__me");
      reply.classList.add("msg");
      document.getElementsByClassName("phone-chat")[0].appendChild(reply);
        setTimeout(function(){ 
          reply.classList.add("show");
          chatscroll.scrollTop = chatscroll.scrollHeight - chatscroll.clientHeight;
        }, 500);
      var node = new Message(json[connectedTo]);
    }
  
  this.domElement.classList.add("option");
}

function checkForInput(msg){
  console.log(msg);
  for(var i=0;i<inputs.length;i++){
    console.log(inputs);
      msg = msg.replace('['+inputs[i].variable+']', inputs[i].value);
  }
  return msg;
}


function Message(found){

  this.domElement = document.createElement("div");
  this.mSpace = document.createElement("div");
  this.oSpace = document.createElement("div");
  var that = this;


  if(found.type == "node"){  
    
    for(var i=0; i<found.inputs.length; i++){
      var option = new OptionObj(found.inputs[i].connectedTo,found.inputs[i].name);
      this.oSpace.appendChild(option.domElement);
      var index = i;

    }
  }


if(found.type == "input"){  
    
  if(found.inpType == "date"){
    var date = document.createElement("input");
    date.type = "date";
    var submit = document.createElement("div");
    submit.innerHTML = "Submit";
    submit.onclick = function(){
      form.append("date",date.value);
      console.log(found.submitUrl);
      inputs.push({"variable":found.submitUrl,"value":date.value})
      console.log(found);
      console.log(form);
      submit.remove();
      date.remove();
      var reply = document.createElement("div");
      reply.innerHTML = date.value;
      reply.classList.add("phone-chat-msg__me");
      reply.classList.add("msg");
      document.getElementsByClassName("phone-chat")[0].appendChild(reply);
        setTimeout(function(){ 
          reply.classList.add("show"); 

          var totalHeight = 0;
          jQuery(phoneChat).children().each(function(){
                totalHeight += jQuery(this).outerHeight();
                //alert(totalHeight)
                //alert(jQuery(this).outerHeight())
            });

          if(totalHeight > chatscroll.offsetHeight){
            chatscroll.style.overflowY = "hidden";
            chatscroll.style.overflowY = "scroll";
            chatscroll.scrollTop = chatscroll.scrollHeight - chatscroll.clientHeight;
          }

          chatscroll.scrollTop = chatscroll.scrollHeight - chatscroll.clientHeight;
        }, 500);
      new Message(json[found.inputs[0].connectedTo]);
    }
    this.oSpace.appendChild(date);
    this.oSpace.appendChild(submit);
  } else {
    textInp.disabled = false;
    textInp.type = "email";
    textInp.focus();
    textSubmit.onclick = function(){

      var data = textInp.value;      
      form.append("email",data);
      
      inputs.push({"variable":found.submitUrl,"value":data})
      console.log(form);
      textInp.value = "";
      textInp.disabled = true;      
      var reply = document.createElement("div");
      reply.innerHTML = data;
      reply.classList.add("phone-chat-msg__me");
      reply.classList.add("msg");
      document.getElementsByClassName("phone-chat")[0].appendChild(reply);
        setTimeout(function(){
          reply.classList.add("show"); 

          var totalHeight = 0;
          jQuery(phoneChat).children().each(function(){
                totalHeight += jQuery(this).outerHeight();
            });

            console.log("totalHeight"+totalHeight);
            console.log("chatscrol"+chatscroll.offsetHeight);

          if(totalHeight > chatscroll.offsetHeight){
            chatscroll.style.overflowY = "hidden";
            chatscroll.style.overflowY = "scroll";
            chatscroll.scrollTop = chatscroll.scrollHeight - chatscroll.clientHeight;
          }

          chatscroll.scrollTop = chatscroll.scrollHeight - chatscroll.clientHeight;
        }, 500);
      console.log(json[found.inputs[0].connectedTo])
      new Message(json[found.inputs[0].connectedTo]);
    }
  }
}


  for(var i=0; i<found.messages.length; i++){
  var mText = document.createElement("div");
    mText.innerHTML = checkForInput(found.messages[i]);
    mText.classList.add("phone-chat-msg__contact");
    this.mSpace.appendChild(mText);
    mText.classList.add("show");
    chatscroll.scrollTop = chatscroll.scrollHeight - chatscroll.clientHeight;
  }

  this.domElement.appendChild(this.mSpace);
  this.domElement.appendChild(this.oSpace);
  
  chatscroll.scrollTop = chatscroll.scrollHeight;
  this.domElement.classList.add("msg");
  document.getElementsByClassName("phone-chat")[0].appendChild(this.domElement);

  setTimeout(function(){ 
    that.domElement.classList.add("show"); 
    chatscroll.scrollTop = chatscroll.scrollHeight - chatscroll.clientHeight;
  //alert("pchat"+phoneChat.offsetHeight);
  var totalHeight = 0;
  jQuery(phoneChat).children().each(function(){
        totalHeight += jQuery(this).outerHeight();
        //alert(totalHeight)
        //alert(jQuery(this).outerHeight())
    });

    console.log("totalHeight"+totalHeight);
    console.log("chatscrol"+chatscroll.offsetHeight);

  if(totalHeight > chatscroll.offsetHeight){
    console.log("it werk");
    chatscroll.style.overflowY = "hidden";
    chatscroll.style.overflowY = "scroll";
    chatscroll.scrollTop = chatscroll.scrollHeight - chatscroll.clientHeight;
  }

}, 1000);

}

