<template>
  <div id="signin">
  <i id="loader" v-show="state" class="fa fa-2x fa-spin fa-circle-o-notch" aria-hidden="true"></i>
  <div class="container-fluid jumbo">
    <hr align="left" id="hr2"/>
    <div class="headtext">HealthX <i class="fa fa-medkit" aria-hidden="true"></i></div>
    <hr width="10%" align="left" style="border:1px solid #d2e5ff"/>
    <hr id="hr" width="7%" align="left"/>
  </div>
  <div class="text-center container"><div class="row">
  <br/>
  <div class="col-xs-12 image"><img style="float:left;" class="icon" src="../../heavylift.png"/><br/><div><u class="text-primary">Your Personal Health Manager</u></br>" We take care of the heavy lifting for you. We believe we can do more with your data. Our system is designed to be scalable, efficient and the best of all easy to use."</div></div>
  <div class="col-xs-12 parallax" style="background:url('../../b2.png');margin-top:1%;min-height:200px;background-size:50% auto;background-position:right center;"><div class="parallax_text col-md-8 col-xs-12"><li>Leveraging the power of IOT</li><li>Applying online health information for health management in everyday life</li><li>Maximizing and Increasing IT literacy</li><li>Appraizing online health information</li></div></div>
  <div class="col-md-3"></div><div class="col-xs-12 col-md-6 box">
    <form @submit.prevent="authenticate">
    <label class="text-center"><span>Email</span><input type="text" v-model="email" required placeholder="xyz@hotmail.com" class="form-control"></label>
    <br>
    <label class="text-center"><span>Password</span><input type="password" v-model="password" required class="form-control"></label>
    <div class="text-center"><button class="btn btn-primary border" style="margin-top:3%">Sign In <i class="fa fa-sign-in" aria-hidden="true"></i></button></div>
    </form><br/><div class="col-xs-12 text-center"><router-link to="/Register">New Here?Register Yourself</router-link></div></div>
    <div class="col-md-3"></div>
    <div class="col-xs-12 parallax" style="background:url('../../b3.jpg');margin-top:5%;background-size:30% auto;min-height:200px;background-position:30% bottom;"><div class="col-md-4"></div><div class="col-xs-12 col-md-8 parallax_text">Having data isn't enough to make data based decisions. You need to ingest and understand that data. This is where interactive data visualization comes in</div></div>
    <div class="col-xs-12 image" style="margin-top:3%;"><img style="float:right;padding:1%;" class="icon" src="../../firebase.png"/><div style="padding:2%;"><u class="text-primary">Powered by Firebase</u></br>The old ways of doing things is that a client connected to database need batch update to get new sets of data. It is an inefficient architecture, imagine a program has to read 1 million records every fifteen (15) minutes with or without update. With Google Firebase Database, a client can be automatically triggered for refresh via Callback as soon as an update is made in the database</div></div>
    </div>
    </div>
    </div>
</template>

<script>

import firebase from '../firebase'

export default {
  name: 'signin',
  data () {
    return {
    email:'',
    password:'',
    state:false
    }
  },
  methods: {
    authenticate () {
      this.state=true
      let that=this
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
        function(user){
          that.state=false
          that.$router.push('/Dashboard')
        }
      ).catch((error)=>{that.state=false;console.log(error)})
    }
  },
  mounted () {
  let that=this
  firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    that.$router.push('/Dashboard')
  }});
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.parallax_text{font-size:20px;color:white;font-family:cursive;background:rgba(0,0,0,0.6);margin-top:3%;border:1px solid black;}
.parallax{background-attachment:fixed !important;background-repeat:no-repeat !important;background-color:rgba(0,0,0,0.6) !important;}
a{text-decoration:none !important}
.border{border:1px solid rgba(0,0,0,0.4);}
.headtext{color:white;text-shadow:3px 0px black;font-size:40px;}
.jumbo{background:rgba(0,0,0,0.6);min-height:100px;box-shadow:3px 5px 10px;border-bottom:1px solid black}
@keyframes stats {
    0%   {width:10%;}
    50%  {width:50%;}
    70%  {width:70%;}
    100% {width:10%;}
}
.icon{height:250px;}
hr {
    position: relative;
    -webkit-animation-name: stats; /* Safari 4.0 - 8.0 */
    -webkit-animation-duration: 3s; /* Safari 4.0 - 8.0 */
    -webkit-animation-iteration-count: infinite; /* Safari 4.0 - 8.0 */
    -webkit-animation-direction: alternate;
    animation-name: stats;
    animation-direction: alternate;
    animation-duration: 3s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
}
.image{text-align:justify !important;transition:all 0.2s;font-size:20px;font-family:cursive;}
.image:hover{box-shadow:0 5px 10px black;}
.box{
font-size:18px;
box-shadow:0 0 10px black;
margin-top:5%;
padding:2%;
background:rgba(192,192,192,0.2);
}
#hr{
  border:1px solid red;
  position: relative;
  animation-direction: alternate;
  -webkit-animation-name: stats; /* Safari 4.0 - 8.0 */
  -webkit-animation-duration: 2s; /* Safari 4.0 - 8.0 */
  -webkit-animation-direction: alternate;
  -webkit-animation-iteration-count: infinite; /* Safari 4.0 - 8.0 */
  animation-name: stats;
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
}

#hr2{
width:10%;
border:1px solid #ffedcb;
position: relative;
-webkit-animation-name: stats; /* Safari 4.0 - 8.0 */
-webkit-animation-duration: 4s; /* Safari 4.0 - 8.0 */
-webkit-animation-iteration-count: infinite; /* Safari 4.0 - 8.0 */
-webkit-animation-direction: alternate;
animation-name: stats;
animation-duration: 4s;
animation-iteration-count: infinite;
animation-timing-function: ease;
}
#signin{position:fixed;overflow:scroll;overflow-x:hidden;max-height:100%;width:100%;background:rgba(192,192,192,0.6);}
#signin::-webkit-scrollbar {
        width: 5px;
        background:rgba(0,0,0,0.6);
    }
#signin::-webkit-scrollbar-thumb {
    background: white;
}
#loader{color:black;position:fixed;top:50%;left:49%;transform:translate(-50%,-50%);z-index:5;}
label{width:100%;}
input[type=text]:focus,input[type=password]:focus{box-shadow:0 0 5px rgba(255,0,0,0.6);border:1px solid rgba(255,0,0,0.8);transition: border 0.4s ease-in,box-shadow 0.4s ease-in;}
@media screen and (max-width:768px){
  .image{font-size:15px;box-shadow:0 0 10px black;}
  .image:hover{box-shadow:0 0 10px black;}
  .icon{height:200px;}
  .parallax_text{font-size:15px;}
}
</style>
