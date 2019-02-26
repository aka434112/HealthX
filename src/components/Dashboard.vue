<template>
<div id="dashboard">
<div @click="files=!files" class="col-xs-12" :class="{cover:files}" v-show="files" style="position:fixed;min-height:100%;z-index:45;"></div>
<i v-show="state" class=" loader fa fa-2x fa-spin fa-circle-o-notch" aria-hidden="true" style="z-index:5;left:49%"></i>
<div v-show="popup" class="loader text-center jumbotron" style="z-index:20;box-shadow:0 0 15px black;padding:5%;color:black;">
  <label>Device ID<input class="form-control" type="text" id="id" v-model="id"></label>
  <button @click="submit" class="btn btn-primary btn-block">Submit</button>
</div>
<div class="container-fluid jumbo">
  <div class="row">
  <div class="col-xs-9 text-left headtext">HealthX <i class="fa fa-medkit" aria-hidden="true"></i></div>
  <div class="col-xs-3 text-right headtext"><i v-show="display" class="fa fa-bars" aria-hidden="true" @click="display=!display"></i></div>
  <div class="col-xs-12" :class="{container:!display}" style="position:fixed;z-index:20;"><div id="display" class="text-left" :class="{width:!display}" style="border-left:1px solid white;"><div role="navigation" style="padding:0 10%;"><div style="font-size:40px;"><i class="fa fa-bars" aria-hidden="true" @click="display=!display"></i></div><div class="highlight">Dashboard</div><hr/><div class="highlight" @click="profile">Profile</div><hr/><div @click="signout" class="highlight">Logout</div></div></div></div>
  </div>
</div>
<br/><br/>
<div id="image" class="loader col-xs-10 col-md-4" v-show="files"></div>
<div class="container-fluid" style="margin-top:1%">
<div class="row">
<div class="col-xs-12 col-md-6 text-center box">
  <div class="test">
    <div class="title">File Manager</div><br/><br/>
      <div class="files col-xs-12"><input type="file" @change="upload" accept="image/*"></div><br/><br/>
      <button class="files col-xs-12" @click="retrieve">Retrieve Records</button><br/><br/>
  </div>
</div>
<div class="col-xs-12 col-md-6 text-center box">
  <div class="test">
    <div class="title">Heart Rate <i class="fa fa-heartbeat" aria-hidden="true"></i></div>
    <div id="heartrate"></div>
  </div>
</div>
<div class="col-xs-12 col-md-6 text-center box">
  <div class="test">
    <div class="title">Body Temperature <i class="fa fa-thermometer-three-quarters" aria-hidden="true"></i></div>
    <div id="temperature"></div>
  </div>
</div>
<div class="col-xs-12 col-md-6 text-center box">
  <div class="test">
    <div class="title">Oxygen Concentration <i class="fa fa-opera" aria-hidden="true"></i><sub>2</sub></div>
    <div id="oxygen"></div>
  </div>
</div>
</div></div>
<div style="margin-top:5%"></div>
</div>
</template>
<script>

import firebase from '../firebase'
import {GoogleCharts} from 'google-charts'
export default{
name:"dashboard",
data:function(){
return {
  display:true,
  state:false,
  id:"",
  popup:false,
  user:"",
  json:"",
  files:false
}
},
methods: {
  signout () {
    let that=this
    firebase.auth().signOut().then(function() {
    that.$router.push('/')
    })
  },
  profile () {
    this.$router.push('/Profile')
  },
  upload (e) {
  if(e.target.files.length!=0){
    let that=this
    this.state=true
    let file=e.target.files[0]
    let element=document.getElementById('upload')
    let upload=firebase.storage().ref().child(that.id+'/'+file.name).put(file)
    upload.on(firebase.storage.TaskEvent.STATE_CHANGED, function(snapshot) {}, function(error){},
    function(){
      firebase.database().ref('download/'+that.id).push(upload.snapshot.downloadURL).then(()=>that.state=false)
      })
    }
  },
  submit () {
    let user=this.user
    let id=this.id
    this.popup=false
    if ((id==="")||(id==null)||(id.length!=8)) {
      alert("Not a valid ID. Please check your ID and try logging in again")
    }
    else{
    firebase.database().ref('users').push({email:user.email,id:id}).then(()=>window.location.reload(true))
    }
  },
  retrieve () {
    let that=this
    this.state = true
    firebase.database().ref('download/'+that.id).on("value", function(snapshot) {
      let parent=document.getElementById('image')
      while(parent.children.length){
        parent.removeChild(parent.children[0])
      }
      for(let i in snapshot.val()){
        let img=document.createElement('img')
        let div=document.createElement('div')
        div.setAttribute('class', 'col-xs-3')
        img.setAttribute('src', snapshot.val()[i])
        img.setAttribute('style', 'margin-top:1%')
        img.setAttribute('height', '200px')
        img.setAttribute('class', 'col-xs-6 col-md-6')
        parent.appendChild(img)
      }
      that.state=false
      that.files=true
    })
  },
  draw () {
    let that=this
    let data1 = new google.visualization.DataTable()
    let data2 = new google.visualization.DataTable()
    let data3 = new google.visualization.DataTable()
    data1.addColumn('string','time')
    data2.addColumn('string','time')
    data3.addColumn('string','time')
    data1.addColumn('number','Heart rate')
    data2.addColumn('number','temperature')
    data3.addColumn('number','oxygen level')
    for (let i in that.json) {
      let row1=[]
      let row2=[]
      let row3=[]
      for(let j in that.json[i]){
      if(j==="Heart rate"){
        row1.push(that.json[i][j])
      }
      else if(j==="oxygen level") {
        row3.push(that.json[i][j])
      }
      else if(j==="temperature"){
        row2.push(that.json[i][j])
      }
      else{
        row1.unshift(that.json[i][j])
        row2.unshift(that.json[i][j])
        row3.unshift(that.json[i][j])
      }
    }
      data1.addRow(row1)
      data2.addRow(row2)
      data3.addRow(row3)
    }
    that.state=false
    var chart1 = new google.visualization.ColumnChart(document.getElementById('heartrate'))
    var chart2 = new google.visualization.ColumnChart(document.getElementById('temperature'))
    var chart3 = new google.visualization.ColumnChart(document.getElementById('oxygen'))
    chart1.draw(data1, {
      height:300,
      animation:{
        duration: 500,
        easing: 'out',
        startup: true
      },
      legend:{position:'none'},
      hAxis:{title:"Date"},
      vAxis:{title:"Heart Beat Count"},
      colors:['green']
    })
    chart2.draw(data2, {
      height:300,
      animation:{
        duration: 500,
        easing: 'out',
        startup: true
      },
      legend:{position:'none'},
      hAxis:{title:"Date"},
      vAxis:{title:"Temperature"},
      colors:['orange']
    })
    chart3.draw(data3, {
      height:300,
      animation:{
        duration: 500,
        easing: 'out',
        startup: true
      },
      legend:{position:'none'},
      hAxis:{title:"Date"},
      vAxis:{title:"Oxygen Concentration"}
    })
  }
},
mounted () {
  let that=this
  this.state=true
  firebase.auth().onAuthStateChanged(function(user) {
  that.user=user
  if (!user) {
    that.$router.push('/')
  }
  else{
    if(!(user.emailVerified)){
      that.$router.push('/Verification')
    }
    else{
    firebase.database().ref('users').orderByChild('email').equalTo(user.email).once("value").then(function(snapshot) {
        if(snapshot.val()==null){
          that.popup=true
        }
        else{
          snapshot.forEach((data)=>{
            that.id=(snapshot.val())[data.key]["id"]
          })
          let ref=firebase.database().ref(that.id)
          ref.on("value", (snapshot)=>{
          that.json=snapshot.val()
          GoogleCharts.load(that.draw)
          }, (error)=>{console.log(error)})
        }
        })
    }
  }
  })
}
}
</script>
<style scoped>
#dashboard::-webkit-scrollbar {
        width: 5px;
    }
#dashboard::-webkit-scrollbar-thumb {
    background: rgba(0,0,0,0.5);
    border-radius:3px;
}
#dashboard::-webkit-scrollbar-track {
    background:rgba(255,255,255,0.9);
}
#image{z-index:50;background:rgba(255,255,255,1);max-height:75%;overflow:scroll;overflow-x:hidden;box-shadow:0 0 15px black;}
#image::-webkit-scrollbar {
        width: 5px;
    }
#image::-webkit-scrollbar-track {
    background: black;
}
#image::-webkit-scrollbar-thumb {
    background: white;
}
.cover{background:rgba(255,255,255,0.9);}
.files{background:#337ab7;padding:1mm;color:white;border:1px solid rgba(0,0,0,0.6);}
.loader{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);color:white;}
input[type=file]{display:inline-block;}
button{border:1px solid rgba(0,0,0,0.6);}
.title{font-size:32px;}
.test{background:rgba(0,0,0,0.6);border:1px solid white;border-radius:10px;padding:10px;margin-top:8px;}
#dashboard{background:rgba(0,0,0,0.6);position:fixed;overflow:scroll;overflow-x:hidden;max-height:100%;width:100%;}
.box{box-shadow:0px 0px 10px black;margin-top:1%;min-height:375px;background:rgba(255,255,255,0.1);color:white;}
hr{border:1px inset white;}
.highlight:hover{color:black;background:white;transition:background 1s,color 1s;}
.width{transform:translateX(0) !important}
.container{background:rgba(255,255,255,0.5);min-height:100%;}
#display{box-shadow:-5px 0 5px rgba(0,0,0,0.7);color:white !important;min-height:100%;min-width:40%;right:0;position:fixed;background:#f44283;transform:translateX(110%);font-size:25px;transition:transform 0.5s cubic-bezier(0,.98,.7,1);}
#avatar{border-radius:50%;border:1px solid rgba(0,0,0,0.4);}
.signout{border:1px solid rgba(0,0,0,0.4);font-size:15px}
.jumbo{min-height:100px;box-shadow:3px 5px 10px rgba(0,0,0,0.6);}
.headtext{color:rgba(255,255,255,0.9);text-shadow:2px 0px black;font-size:40px;}
@media screen and (max-width:768px){
  #display{min-width:80%}
}
#id:focus{border:1px solid red}
</style>
