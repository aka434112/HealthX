<template>
  <div id="register">
  <i id="loader" v-show="state" class="fa fa-2x fa-spin fa-circle-o-notch" aria-hidden="true"></i>
  <div class="container-fluid jumbo">
    <hr align="left" id="hr2"/>
    <div class="headtext">HealthX <i class="fa fa-medkit" aria-hidden="true"></i></div>
    <hr width="10%" align="left" style="border:1px solid blue"/>
    <hr id="hr" width="7%" align="left"/>
  </div>
  <div class="container-fluid">
    <div class="row">
      <div class="col-xs-12 col-md-3 text-center"><img class="width margin top" src="../../microscope.png"></div>
      <div class="col-xs-12 col-md-6 box text-center font">
        <form @submit.prevent>
          <label>Email<input type="email" class="form-control" required v-model="email"></label>
          <label>Password<input type="password" class="form-control" required v-model="password"></label>
          <button class="btn btn-primary" style="margin-top:2%" @click="signup">Register <i class="fa fa-id-card-o" aria-hidden="true"></i></button>
        </form><br/><div class="col-xs-12 text-center" style="font-size:18px;"><router-link to="/SignIn">Already Registered?Sign In</router-link></div>
      </div>
      <div class="col-xs-12 col-md-3 text-center"><img class="width top" src="../../medicines.png"></div>
    </div>
  </div>
  </div>
</template>
<script>
import firebase from './../firebase'

export default {
  data () {
    return {
      email:"",
      password:"",
      state:false
    }
  },
  methods : {
    signup () {
      this.state=true
      let that=this
      firebase.auth().createUserWithEmailAndPassword(that.email, that.password).then((user)=>{
      firebase.auth().currentUser.sendEmailVerification().then(()=>{that.state=false})
      }).catch(function(error) {
        var errorCode = error.code
        var errorMessage = error.message
        console.log(errorMessage)
      })
    }
  }
}
</script>
<style scoped>
a{text-decoration:none !important}
.top{margin-top:5%}
@media screen and (min-width: 992px) {
  .margin{margin-top:40%;}
}
.width{max-width:100%}
label{width:100% !important}
.box{
box-shadow:0 0 10px black;
margin-top:5%;
padding:2%;
background:rgba(0,0,0,0.1);
}
.font{font-size:17px;}
.headtext{color:rgba(200,200,200,0.9);text-shadow:2px 0px black;font-size:40px;}
.jumbo{background:rgba(155,155,155,0.3);min-height:100px;box-shadow:3px 5px 10px;}
@keyframes stats {
    0%   {width:10%;}
    50%  {width:50%;}
    70%  {width:70%;}
    100% {width:10%;}
}
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
  animation-timing-function: ease;
}
button{border:1px solid rgba(0,0,0,0.6);}
#hr2{
width:10%;
border:1px solid green;
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
#loader{position:fixed;top:50%;left:49%;transform:translate(-50%,-50%);color:black;z-index:5;}
#register{position:fixed;max-height:100%;max-width:100%;overflow:scroll;overflow-x:hidden;}
#register::-webkit-scrollbar {
        width: 5px;
    }
#register::-webkit-scrollbar-thumb {
    background: rgba(0,0,0,0.7);
    border-radius:3px;
}
input:focus{box-shadow:0 0 5px rgba(255,0,0,0.6);border:1px solid rgba(255,0,0,0.8);transition: border 0.4s ease-in,box-shadow 0.4s ease-in;}
</style>
