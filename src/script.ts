
import * as jQuery from 'jquery';
import * as Quill from 'quill';
import * as Emoji from "quill-emoji";

import * as QuillItems from './quillitems';



/// <reference path="./preview" />

var toolbarOptions = {
  container: [
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'script': 'sub' }, { 'script': 'super' }],
    [{ 'color': [] }],
    ['clean'],
    ['emoji'],
    ['link', 'image'],
  ],
  handlers: {
    'emoji': function () {},
    'image': function () {},
    "placeholder": function (value) { 
      if (value) {
          const cursorPosition = this.quill.getSelection().index;
          this.quill.insertText(cursorPosition, value);
          this.quill.setSelection(cursorPosition + value.length);
      }
    }
  }
};


Quill.register("modules/emoji", Emoji);

var quill = new Quill('#editor', {
  modules: {
    "toolbar": toolbarOptions,
    "emoji-toolbar": true,
    "emoji-shortname": true,
  },
  placeholder: 'Compose an epic...',
  theme: 'snow',
});

  
  const myDropDown = new QuillItems.QuillToolbarDropDown({
    label: "User Inputs",
    rememberSelection: false
  })

function addInputVariables(){

  const dropDownItems = {};
  
  myDropDown.setItems(dropDownItems)

  for(var i=0;i<dialogue.length;i++){
    if(dialogue[i].type == "input"){
      console.log(dialogue[i]);
      dropDownItems[dialogue[i].submitUrl] = '['+dialogue[i].submitUrl+']';
    }
  }

  // const dropDownItems = {
  //   'Mike Smith': 'mike.smith@gmail.com',
  //   'Jonathan Dyke': 'jonathan.dyke@yahoo.com',
  //   'Max Anderson': 'max.anderson@gmail.com'
  // }


  
  
  myDropDown.setItems(dropDownItems)
  
  myDropDown.onSelect = function(label, value, quill) {
      // Do whatever you want with the new dropdown selection here
  
      // For example, insert the value of the dropdown selection:
      const { index, length } = quill.selection.savedRange
      quill.deleteText(index, length)
      quill.insertText(index, value)
      quill.setSelection(index + value.length)
  }
  
  myDropDown.attach(quill)
}



var curYPos = 0;
var curXPos = 0;
var curDown = false;

var area = document.getElementById("area");
var svgEl = document.getElementById("svg");
var zoomIn = document.getElementById("zoom-in");
var zoomOut = document.getElementById("zoom-out");
var zoom=1;

jQuery(document).on("mousemove", function (event) {
//jQuery(document).width();
//e.stopImmediatePropagation();
if (curDown === true) {
jQuery(document).scrollTop(parseInt(jQuery(document).scrollTop() + (curYPos - event.pageY)));
jQuery(document).scrollLeft(parseInt(jQuery(document).scrollLeft() + (curXPos - event.pageX)));
}
});

jQuery(area).on("mousedown", function (e) {  curDown = true; curYPos = e.pageY; curXPos = e.pageX; e.preventDefault(); });
jQuery(window).on("mouseup", function (e) { curDown = false; });

//initUIAll

function initUIAll(){


  for(var i=0; i<collection.length; i++){

    console.log(collection[i]);
    collection[i].configIndex = i;
    collection[i].initUI();
  }
}


function setDimentions(){
curDown = false; 
//if(zoom == 1){
var sL = jQuery(document).scrollLeft();
var sT = jQuery(document).scrollTop();
var sH = jQuery(document).height()+10;
var sW = jQuery(document).width();


jQuery(area).removeAttr('style');
jQuery(svg).removeAttr('style');

jQuery(area).css("height", jQuery(document).height()+"px");
jQuery(area).css("width", sW+"px");

jQuery(svg).css("height", jQuery(document).height()+"px");
jQuery(svg).css("width", jQuery(document).width()+"px");

jQuery('body').css("height", jQuery(document).height()+"px");
jQuery('body').css("width", jQuery(document).width()+"px");


jQuery(document).scrollLeft(sL);
jQuery(document).scrollTop(sT);

//area.style.zoom = zoom;
area.style.transform = "scale("+zoom+")";
//initUIAll();
//}

}

jQuery(window).on("load", function () {
setDimentions();

});

jQuery(window).on("mouseout", function (e) { 

setDimentions();

});

jQuery('.node').mousedown(function(){
//what can I write here to prevent parent's click event from fireing?
//e.stopPropagation();
//event.stopImmediatePropagation() already 
});

document.body.onclick = function(){
menu.style.display = "none";
}



zoomIn.onclick= function(){
area.style.transform = "scale(1)";
zoom = 1;
setDimentions();
}

zoomOut.onclick= function(){
area.style.transform = "scale(0.7)";
zoom = 0.7;
setDimentions();
}


// document.addEventListener("DOMContentLoaded", function(){
// /*
// for(var i=0;i<collection.lenth; i++){
// collection[i].configure();
// }
// */
// var xhttp = new XMLHttpRequest();
// xhttp.onreadystatechange = function() {
//   if (this.readyState == 4 && this.status == 200) {
//     //console.log(this.responseText);
//     var chatdat = JSON.parse(this.responseText);
//     //console.log(chatdat);
//     var chatText = chatdat[0].chatdat.json;
//     //console.log(chatText);
//     var chatJson = JSON.parse(chatText);
//     console.log(chatJson);
//     initialize(chatJson);
//   }
// };

// //console.log(dialogue);
// var dat = JSON.stringify(dialogue);
// //console.log(dat);

// xhttp.open("POST", "/fetch", true);
// xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
// xhttp.send();



// })

// SVG SETUP
// ===========
const svg = document.createElementNS(
  "http://www.w3.org/2000/svg",
  "svg"
);

area.appendChild(svg);

//Dial setup
var dial = document.getElementById('dial');
var menu = document.getElementById('menu');
var inp = document.getElementById('inp');
var submit = document.getElementById('submit');
var close = document.getElementById('close');
var save = document.getElementById('save');
var inputting = {} as any;
export var dialogue = [];

close.onclick = function(){
dial.style.display = "none";
}

area.oncontextmenu = function(e){
//var evt = new Object({keyCode:93});
///stopEvent(e); 
var newNode = document.createElement('div');
newNode.innerHTML = "Add new Dialogue";

var newInput = document.createElement('div');
newInput.innerHTML = "Add new User Input";    

var newSubmit = document.createElement('div');
newSubmit.innerHTML = "Add Submit Data Node";

menu.innerHTML = "";
e.stopPropagation();
var x = e.clientX /zoom + jQuery(document).scrollLeft();     // Get the horizontal coordinate
var y = e.clientY /zoom + jQuery(document).scrollTop();     // Get the vertical coordinate
event.preventDefault();
newNode.onclick = function(){
  createNode(x,y,"node");
}    
newInput.onclick = function(){
  createNode(x,y,"input");
}    
newSubmit.onclick = function(){
  createNode(x,y,"submit");
}
menu.appendChild(newSubmit);
menu.appendChild(newNode);
menu.appendChild(newInput);
menu.style.display = "block";
menu.style.left = x+"px";
menu.style.top = y+"px";
}

function createNode(x,y,type){ 
var node = new NodeObj(type);
if(type == "node"){
  node.addInput('Value1');
  node.addInput('Value2');
}
if(type == "input"){
  node.addInput('On input');
}
node.moveTo({x:x,y:y});
node.initUI();
menu.style.display = "none";
node.configure();
//console.log(dialogue);
}

save.onclick = function(){

for(var i=0;i<collection.length; i++){
collection[i].configure();
}

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
if (this.readyState == 4 && this.status == 200) {
//console.log(this.responseText);
}
};

//console.log(dialogue);
var dat = JSON.stringify(dialogue);
console.log(dat);

xhttp.open("POST", "/save", true);
xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xhttp.send("json="+dat);
}

submit.onclick = function(){

//console.log(quill.root.innerHTML)
//quill.setText('Hello\n');
if(inputting.operation == "add"){
if(inputting.type == "message"){
  inputting.object.addMessage(quill.root.innerHTML);
  dial.style.display = "none";
} else {
  inputting.object.addInput(quill.root.innerHTML);
  dial.style.display = "none";
}

inputting.object.configure();

} else {
if(inputting.type == "message"){
  inputting.object.text = quill.root.innerHTML;
  inputting.object.domElement.innerHTML = quill.root.innerHTML;
  dial.style.display = "none";
} else {
  //inputting.object.addInput(quill.root.innerHTML);
  inputting.object.domElement.innerHTML = quill.root.innerHTML;
  inputting.object.name = quill.root.innerHTML;
  dial.style.display = "none";
}

inputting.object.parentObj.configure();

}
}

// MOUSE SETUP
// =============
var mouse = {
currentInput: null,
createPath: function(a, b){
var diff = {
  x: b.x - a.x,
  y: b.y - a.y
};

var pathStr = 'M' + a.x + ',' + a.y + ' ';
pathStr += 'C';
pathStr += a.x + diff.x / 3 * 2 + ',' + a.y + ' ';
pathStr += a.x + diff.x / 3 + ',' + b.y + ' ';
pathStr += b.x + ',' + b.y;

return pathStr;
}
};

window.onmousemove = function(e){
// console.log("x is "+e.pageX+"y is "+e.pageY)
if(mouse.currentInput){
var p = mouse.currentInput.path;
var iP = mouse.currentInput.getAttachPoint();
var oP = {x: e.pageX /zoom, y: e.pageY/zoom};

//console.log("here"+oP)

//console.log("x is "+e.pageX+"y is "+e.pageY)
var s = mouse.createPath(iP, oP);
p.setAttributeNS(null, 'd', s);
}
};

window.onclick = function(e){
if(mouse.currentInput){
mouse.currentInput.path.removeAttribute('d');
if(mouse.currentInput.node){
  mouse.currentInput.node.detachInput(mouse.currentInput);
}
mouse.currentInput = null;
}
};

// CLEAN UP AND ACTUAL CODE [WIP]
// ================================

function GetFullOffset(element){
var offset = {
top: element.offsetTop,
left: element.offsetLeft,
};

if(element.offsetParent){
var po = GetFullOffset(element.offsetParent);
offset.top += po.top;
offset.left += po.left;
return offset;
}
else
return offset;
}

function NodeObj(type){
// DOM Element creation
var typeName = {
"node": "Dialogue Node",
"input": "User Input",
"submit":"Submit Form"
};
this.domElement = document.createElement('div');
this.domElement.classList.add('node');
this.domElement.setAttribute('title', typeName[type]);

// Create output visual
var outDom = document.createElement('span');
outDom.classList.add('output');
outDom.innerHTML = '&nbsp;';
this.domElement.appendChild(outDom);

// Create header visual
var Nodeheader = document.createElement('div');
Nodeheader.classList.add('nodeHeader');
Nodeheader.innerHTML = typeName[type];
this.domElement.appendChild(Nodeheader);


//PUSH TO dialogue object (basic configuration)

var testRowIndex = dialogue.push({
type:type,
inputs:[],
messages:[],
position:{},
uid:"",
inpType:"",
submitUrl:""
}) - 1;
// then you can access that item like this
//var item = dialogue[testRowIndex];

this.configIndex = testRowIndex;



// msg visual
// node + input
var mSpace = document.createElement('div');
mSpace.classList.add('mspace');
if(type != "submit"){
  this.domElement.appendChild(mSpace);
}
this.mSpace = mSpace;

// Create menu visual

//addMsg
var addMsg = document.createElement('div');
addMsg.classList.add('menuitem');
addMsg.innerHTML = 'Add Message';
//this.domElement.appendChild(outDom);


//addOpt
// NODE ONLY
var addOpt = document.createElement('div');
addOpt.classList.add('menuitem');
addOpt.innerHTML = 'Add Option';
//this.domElement.appendChild(outDom);

//start
var start = document.createElement('div');
start.classList.add('menuitem');
start.innerHTML = 'Set as start point';

//delNode
var delNode = document.createElement('div');
delNode.classList.add('menuitem');
delNode.innerHTML = 'Delete Node';
//this.domElement.appendChild(outDom);

delNode.onclick = function(){

  console.log(that.inputs);
  while(that.inputs.length>0){
    
    that.removeInput(that.inputs[0])
  }

  while(that.attachedPaths.length>0){
    console.log(that.attachedPaths[0].input);
    that.attachedPaths[0].input.domElement.classList.remove('filled');
    that.attachedPaths[0].input.domElement.classList.add('empty');
    that.detachInput(that.attachedPaths[0].input);
  }

  collection.splice(that.configIndex,1);
  dialogue.splice(that.configIndex,1);

  that.domElement.parentNode.removeChild(that.domElement);

  initUIAll();
}

//set start
start.onclick = function(e){
  
menu.style.display = "none";

function findStart() {
  return dialogue.filter(
    function(data) {
      return data.start == true;
    }
  );
}

var found = findStart();

if(found[0]){
  found[0].start = false;
}
//console.log(that.configIndex);
dialogue[that.configIndex].start = true;
var index = dialogue.indexOf(found[0]);
collection[index].domElement.style.border = "none";
collection[index].domElement.style.boxShadow = "none";
collection[that.configIndex].domElement.style.border = "5px solid deepskyblue";
collection[that.configIndex].domElement.style.boxShadow = "0px 0px 10px 0px deepskyblue";


}

jQuery(this.domElement).mousedown(function(e){
//what can I write here to prevent parent's click event from fireing?
e.stopPropagation();
//alert("asd");
//event.stopImmediatePropagation() already 
});

// Output Click handler
var that = this;
outDom.onclick = function(e){
if(mouse.currentInput &&
   !that.ownsInput(mouse.currentInput)){
  var tmp = mouse.currentInput;
  mouse.currentInput = null;
  that.connectTo(tmp);
}
e.stopPropagation();
};
this.domElement.oncontextmenu = function(e){
//var evt = new Object({keyCode:93});
///stopEvent(e); 
var x = e.clientX /zoom + jQuery(document).scrollLeft();     // Get the horizontal coordinate
var y = e.clientY /zoom + jQuery(document).scrollTop();     // Get the vertical coordinate
event.preventDefault();
event.stopPropagation();
menu.style.display="block";
menu.style.left = x+"px";
menu.style.top = y+"px";
menu.innerHTML = "";
if(type != "submit"){
  menu.appendChild(addMsg);
}

if(type == "node"){
  menu.appendChild(addOpt);
}

menu.appendChild(start);
menu.appendChild(delNode);
}

//menu click events

addMsg.onclick = function(e){
inputting = {
  operation: "add",
  object:that,
  type:"message"
}
dial.style.display = "block";
menu.style.display = "none";
}

addOpt.onclick = function(e){
inputting = {
  operation: "add",
  object:that,
  type:"option"
}
dial.style.display = "block";
menu.style.display="none";
}


function textInput(title, that){

var textInput = document.createElement('input');
var varName = document.createElement('div');
var space = document.createElement('div');
var inspace = document.createElement('div');
var done = document.createElement('div');
var varText = document.createElement('div');

var editIcon = document.createElement('div') as HTMLDivElement;
editIcon.innerHTML = `<i class="material-icons" style="font-size: 17px;float: right;">edit</i>`.trim();
editIcon = editIcon.children[0] as HTMLDivElement;

that.textInput = textInput;
that.varName = varName;

textInput.type = 'text';


inspace.classList.add('inputBox');
textInput.classList.add('inputVar');
done.classList.add('done');
varText.classList.add('varText');
varName.classList.add('varName');

inspace.style.display = "none";

space.classList.add('mspace');
space.innerHTML = title;
done.innerHTML = `<i class="material-icons" style="font-size:22px;">check_circle</i>`;

that.domElement.appendChild(space);
space.appendChild(inspace);
space.appendChild(varText);
inspace.appendChild(textInput);
inspace.appendChild(done);


varText.appendChild(varName);
varText.appendChild(editIcon);

//varName.insertAdjacentHTML('afterend', `<i class="material-icons" style="font-size: 17px;float: right;">edit</i>`);

function textSave(){
  if(textInput.value != ""){
    inspace.style.display = "none";
    varName.style.display = "block";      
    editIcon.style.display = "block";

    varName.innerHTML = textInput.value;
    if(textInput.value.length > 16){
      varName.innerHTML = textInput.value.substring(0, 15)+"...";
    }

    that.submitUrl = textInput.value;
    that.configure();
    addInputVariables();
  }
}

done.onclick = function(){
  textSave();
}
/*
      textInput.onchange = function(){
        urlsave();
      }
*/
varText.onclick = function(){
        inspace.style.display = "block";
        varName.style.display = "none";
        editIcon.style.display = "none";
      }

}


if(type == "node"){

}

if(type == "input"){
var inpType = document.createElement('select');
this.inpTypeDom = inpType;
this.domElement.appendChild(inpType);

var optext = document.createElement("option");
optext.text = "Text";
optext.value = "text";

var opemail = document.createElement("option");
opemail.text = "Email";
opemail.value = "email";

var opint = document.createElement("option");
opint.text = "Number";
opint.value = "number";

var opdate = document.createElement("option");
opdate.text = "Date";
opdate.value = "date";

inpType.add(optext, inpType[0]);
inpType.add(opemail, inpType[1]);
inpType.add(opint, inpType[2]);
inpType.add(opdate, inpType[3]);
mSpace.appendChild(inpType);
//this.domElement.appendChild(inpType);
textInput("Unique Id",that);
inpType.onchange = function(){
  that.inpType = inpType.value;
  that.configure();
}

}

if(type == "submit"){

  textInput("POST Request URL",that);

}

// Node Stuffs
this.value = '';
this.messages = [];
this.inputs = [];
this.connected = false;

// SVG Connectors
this.attachedPaths = [];


this.configure();
}

NodeObj.prototype.setStart = function(){
  this.start = true;
  dialogue[this.configIndex].start = true;
  console.log("this");
}
  

NodeObj.prototype.addInputType = function(type){
this.inpType = type;
this.inpTypeDom.value = type;
}

NodeObj.prototype.addTextInputs = function(submitUrl, uid){
console.log(uid);
console.log(submitUrl);
this.submitUrl = submitUrl;
this.uid = uid;

if(uid != ""){
this.textInput.value = uid;
console.log(uid);
this.varName.innerHTML = uid;
}

if(submitUrl != undefined){

  this.textInput.value = submitUrl;
  this.varName.innerHTML = submitUrl;

  if(submitUrl.length > 16){
    
  this.varName.innerHTML = submitUrl.substring(0,15)+"...";
  }
}
}

function NodeInput(name,node){
this.name = name;
this.node = null;
this.parentObj = node;

// The dom element, here is where we could add
// different input types
this.domElement = document.createElement('div');
this.domElement.innerHTML = name;
this.domElement.classList.add('connection');
this.domElement.classList.add('empty');

//ADD TO DIALOGUE CONFIG OBJ
/*
var configIndex = dialogue[node.configIndex].inputs.push({
name:name,
connectedTo:null
});

this.configIndex = configIndex;
*/
//menu viuals

//edit
var edit = document.createElement('div');
edit.classList.add('menuitem');
edit.innerHTML = 'Edit Option';


//del
var del = document.createElement('div');
del.classList.add('menuitem');
del.innerHTML = 'Delete Option';

this.domElement.oncontextmenu = function(e){
//var evt = new Object({keyCode:93});
///stopEvent(e); 
e.stopPropagation();
var x = e.clientX /zoom + jQuery(document).scrollLeft();     // Get the horizontal coordinate
var y = e.clientY /zoom + jQuery(document).scrollTop();     // Get the vertical coordinate
e.preventDefault();
console.log('success!');
menu.style.display="block";
menu.style.left = x+"px";
menu.style.top = y+"px";
//console.log(menu);
menu.innerHTML="";
menu.appendChild(edit);
menu.appendChild(del);
}

edit.onmousedown = function(e){
  inputting = {
    operation: "edit",
    object:that,
    type:"option"
  }
  dial.style.display = "block";
  menu.style.display = "none";
  var delta = quill.clipboard.convert(that.name)
  quill.setContents(delta);
  //inp.value = that.name;
}

del.onclick = function(e){
  inputting = {
    operation: "deleting",
    object:that,
    type:"option"
  }
  that.parentObj.removeInput(that);
  menu.style.display = "none";
}




// SVG Connector
this.path = document.createElementNS(svg.namespaceURI, 'path');
this.path.setAttributeNS(null, 'stroke', '#8e8e8e');
this.path.setAttributeNS(null, 'stroke-width', '2');
this.path.setAttributeNS(null, 'fill', 'none');
svg.appendChild(this.path);

console.log(svg.parentElement);

// DOM Event handlers
var that = this;
this.domElement.onclick = function(e){
if(mouse.currentInput){
  if(mouse.currentInput.path.hasAttribute('d'))
    mouse.currentInput.path.removeAttribute('d');
  if(mouse.currentInput.node){
    mouse.currentInput.node.detachInput(mouse.currentInput);
    mouse.currentInput.node = null;
  }
}
mouse.currentInput = that;
if(that.node){
  that.node.detachInput(that);
  that.domElement.classList.remove('filled');
  that.domElement.classList.add('empty');
}
e.stopPropagation();
};
}

function Message(text,node){
this.text = text;
this.node = null;
this.parentObj = node;
this.domElement = document.createElement("div");
this.domElement.classList.add('message');
this.domElement.innerHTML = text;
var that = this;
//edit
var edit = document.createElement('div');
edit.classList.add('menuitem');
edit.innerHTML = 'Edit Message';


//del
var del = document.createElement('div');
del.classList.add('menuitem');
del.innerHTML = 'Delete Message';

this.domElement.oncontextmenu = function(e){
//var evt = new Object({keyCode:93});
///stopEvent(e); 
e.stopPropagation();
var x = e.clientX /zoom + jQuery(document).scrollLeft();     // Get the horizontal coordinate
var y = e.clientY /zoom + jQuery(document).scrollTop();     // Get the vertical coordinate
event.preventDefault();
menu.style.display="block";
menu.style.left = x+"px";
menu.style.top = y+"px";
//console.log(menu);
menu.innerHTML="";
menu.appendChild(edit);
//console.log(edit);
menu.appendChild(del);
}

edit.onmousedown = function(e){
  inputting = {
    operation: "edit",
    object:that,
    type:"message"
  }
  dial.style.display = "block";
  menu.style.display = "none";
  const delta = quill.clipboard.convert(that.text)
  quill.setContents(delta, 'silent');

  //quill.setText(that.text);
  //inp.value = that.text;
  node.initUI();
}

del.onclick = function(e){
  
  var index = that.parentObj.messages.indexOf(that);
  if (index > -1) {
    that.parentObj.messages.splice(index, 1);
  }
  that.domElement.remove();
  node.initUI();
  menu.style.display = "none";
}
}


NodeInput.prototype.getAttachPoint = function(){
var offset = GetFullOffset(this.domElement);
return {
x: offset.left + this.domElement.offsetWidth - 2,
y: offset.top + this.domElement.offsetHeight / 2
};
};


NodeObj.prototype.configure = function(){

dialogue[this.configIndex].inputs = [];
dialogue[this.configIndex].messages = [];
dialogue[this.configIndex].submitUrl = this.submitUrl;
for(var i=0;i<this.inputs.length; i++){
//console.log(this.inputs[i]);
var connectedTo = null;
if(this.inputs[i].node != null){
  connectedTo = this.inputs[i].node.configIndex;
}

dialogue[this.configIndex].inputs[i] = {
  name:this.inputs[i].name,
  connectedTo:connectedTo
};
//console.log(dialogue[this.configIndex].inputs[i]);
}

for(var i=0;i<this.messages.length; i++){
dialogue[this.configIndex].messages[i] = this.messages[i].text;
}

dialogue[this.configIndex].position = {
  x:parseInt(this.domElement.style.left, 10),
  y:parseInt(this.domElement.style.top, 10),
};

dialogue[this.configIndex].inpType = this.inpType;

}

NodeObj.prototype.getOutputPoint = function(){
var tmp = this.domElement.firstElementChild;
var offset = GetFullOffset(tmp);

return {
x: offset.left + tmp.offsetWidth / 2,
y: offset.top + tmp.offsetHeight / 2
};
};

NodeObj.prototype.addInput = function(name){
var input = new NodeInput(name, this);
this.inputs.push(input);
this.domElement.appendChild(input.domElement);

return input;
};

NodeObj.prototype.removeInput = function(obj){
if(obj.node){
obj.node.detachInput(obj);
}

var index = this.inputs.indexOf(obj);
if (index > -1) {
  this.inputs.splice(index, 1);
}
//console.log(this);
//this.domElement.appendChild(input.domElement);

obj.domElement.remove();
this.initUI();
this.configure();
//console.log(this);
};

NodeObj.prototype.addMessage = function(text){
var message = new Message(text,this);
this.messages.push(message);
this.mSpace.appendChild(message.domElement);
this.initUI();

return message;
};

NodeObj.prototype.detachInput = function(input){
var index = -1;
for(var i = 0; i < this.attachedPaths.length; i++){
if(this.attachedPaths[i].input == input)
  index = i;
};

if(index >= 0){
this.attachedPaths[index].path.removeAttribute('d');
this.attachedPaths[index].input.node = null;
this.attachedPaths.splice(index, 1);
}

if(this.attachedPaths.length <= 0){
this.domElement.classList.remove('connected');
}

this.configure();
input.parentObj.configure();
};

NodeObj.prototype.ownsInput = function(input){
for(var i = 0; i < this.inputs.length; i++){
if(this.inputs[i] == input)
  return true;
}
return false;
};

NodeObj.prototype.updatePosition = function(start){
var outPoint = this.getOutputPoint();
if(start ==true){
outPoint.x = outPoint.x/zoom;
outPoint.y = outPoint.y/zoom;
console.log(outPoint);
}

//console.log(outPoint);
var aPaths = this.attachedPaths;
for(var i = 0; i < aPaths.length; i++){
var iPoint = aPaths[i].input.getAttachPoint();
var pathStr = this.createPath(iPoint, outPoint);
aPaths[i].path.setAttributeNS(null, 'd', pathStr);
}

for(var j = 0; j < this.inputs.length; j++){
if(this.inputs[j].node != null){
  var iP = this.inputs[j].getAttachPoint();
  var oP = this.inputs[j].node.getOutputPoint();

  var pStr = this.createPath(iP, oP);
  this.inputs[j].path.setAttributeNS(null, 'd', pStr);
}
}

this.configure();
};

NodeObj.prototype.createPath = function(a, b){
var diff = {
x: b.x - a.x,
y: b.y - a.y
};

var pathStr = 'M' + a.x + ',' + a.y + ' ';
pathStr += 'C';
pathStr += a.x + diff.x / 3 * 2 + ',' + a.y + ' ';
pathStr += a.x + diff.x / 3 + ',' + b.y + ' ';
pathStr += b.x + ',' + b.y;

return pathStr;
};

NodeObj.prototype.connectTo = function(input){
input.node = this;
this.connected = true;
this.domElement.classList.add('connected');

input.domElement.classList.remove('empty');
input.domElement.classList.add('filled');

this.attachedPaths.push({
input: input,
path: input.path
});

var iPoint = input.getAttachPoint();
var oPoint = this.getOutputPoint();
var pathStr = this.createPath(iPoint, oPoint);

input.path.setAttributeNS(null, 'd',pathStr);
this.configure();
input.parentObj.configure();
};

NodeObj.prototype.moveTo = function(point){
this.domElement.style.top = point.y + 'px';
this.domElement.style.left = point.x + 'px';
this.updatePosition();
this.configure();
};

//drag


function dragElement(elmnt, obj) {
var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
// if (document.getElementById("nodeHeader")) {
//   /* if present, the header is where you move the DIV from:*/
//   document.getElementById("nodeHeader").onmousedown = dragMouseDown;
// } else {
//   /* otherwise, move the DIV from anywhere inside the DIV:*/
//   elmnt.onmousedown = dragMouseDown;
// }

jQuery(elmnt).find('.nodeHeader').on('mousedown', dragMouseDown);

function dragMouseDown(e) {
e = e || window.event;
e.preventDefault();
// get the mouse cursor position at startup:
pos3 = e.clientX;
pos4 = e.clientY;
document.onmouseup = closeDragElement;
// call a function whenever the cursor moves:
document.onmousemove = elementDrag;
}

function elementDrag(e) {
e = e || window.event;
e.preventDefault();
// calculate the new cursor position:
pos1 = pos3 - e.clientX;
pos2 = pos4 - e.clientY;
pos3 = e.clientX;
pos4 = e.clientY;
// set the element's new position:
elmnt.style.top = (elmnt.offsetTop - pos2/zoom) + "px";
elmnt.style.left = (elmnt.offsetLeft - pos1/zoom) + "px";
obj.updatePosition();
}

function closeDragElement() {
/* stop moving when mouse button is released:*/
document.onmouseup = null;
document.onmousemove = null;
}
}

NodeObj.prototype.initUI = function(){
var that = this;

if(dialogue[this.configIndex].start == true){
this.domElement.classList.add("firstNode");
}

dragElement(this.domElement,that);


//     var click = {
//     x: 0,
//     y: 0
// };

// var isStart = false;
//     //Make draggable
//     jQuery(this.domElement).draggable({
//       cancel: '.connection,.output,.mspace',
//       start: function(event) {
//         click.x = event.clientX;
//         click.y = event.clientY;
//         isStart = true;
//     },

//     drag: function(event, ui) {
//       console.log(isStart)

//         // This is the parameter for scale()
//         //var zoom = 1.5;

//         var original = ui.originalPosition;

//         // jQuery will simply use the same object we alter here
//         ui.position = {
//             left: (event.clientX - click.x + original.left) / zoom,
//             top:  (event.clientY - click.y + original.top ) / zoom
//         };

//       that.updatePosition(isStart);
//       isStart = false;

//     } 
//   });
// Fix positioning
this.domElement.style.position = 'absolute';

area.appendChild(this.domElement);
// Update Visual
this.updatePosition();
this.configure();
};


var collection = [];
//var queryJson = [{"name":"Another One","inputs":[{"name":"Value1","connectedTo":2},{"name":"Value2","connectedTo":null},{"name":"Value3","connectedTo":null}],"messages":[],"position":{"x":150,"y":20}},{"name":"Node 2","inputs":[{"name":"Text In","connectedTo":0},{"name":"Value 5","connectedTo":2}],"messages":[],"position":{"x":20,"y":70}},{"name":"Something Else","inputs":[{"name":"Color4","connectedTo":null},{"name":"Position","connectedTo":null},{"name":"Noise Octaves","connectedTo":null}],"messages":[],"position":{"x":300,"y":150}}];

export function initialize(queryJson){
for(var i=0; i<queryJson.length; i++){

var node = new NodeObj(queryJson[i].type);

    console.log(queryJson[i]);
  if(queryJson[i].start == true){
    node.setStart();
  }

  collection.push(node);
  for(var j=0; j<queryJson[i].inputs.length; j++){
    node.addInput(queryJson[i].inputs[j].name);/*
    if(queryJson[i].inputs[j].connectedTo != null){
      queryJson[queryJson[i].inputs[j].connectedTo]
    }*/
  }

  for(var j=0; j<queryJson[i].messages.length; j++){
    node.addMessage(queryJson[i].messages[j]);
  }

  if(queryJson[i].type == "input"){
    node.addInputType(queryJson[i].inpType)
  }

  node.addTextInputs(queryJson[i].submitUrl,queryJson[i].uid)
  
  node.moveTo(queryJson[i].position);

  node.initUI();
}

for(var i=0; i<queryJson.length; i++){

for(var j=0; j<queryJson[i].inputs.length; j++){
  if(queryJson[i].inputs[j].connectedTo != null){
    collection[queryJson[i].inputs[j].connectedTo].connectTo(collection[i].inputs[j]);
  }
}//node.inputs[0]
}

addInputVariables();



console.log(collection);
console.log(dialogue);

}



// DEMO
// ========
/*
// Node 1
var node = new NodeObj('Another One');
node.addInput('Value1');
node.addInput('Value2');
node.addInput('Value3');
//dialogue.push(node);

// Node 2
var node2 = new NodeObj('Node 2');
node2.addInput('Text In');
node2.addInput('Value 5');
//dialogue.push(node2);

// Node 3
var node3 = new NodeObj('Something Else');
node3.addInput('Color4');
node3.addInput('Position');
node3.addInput('Noise Octaves');
//dialogue.push(node3);

// Move to initial positions
node.moveTo({x: 150, y: 20});
node2.moveTo({x: 20, y: 70});
node3.moveTo({x:300, y:150});

// Connect Nodes
node.connectTo(node2.inputs[0]);
node3.connectTo(node2.inputs[1]);
node3.connectTo(node.inputs[0]);

// Add to DOM
node.initUI();
node2.initUI();
node3.initUI();
*/