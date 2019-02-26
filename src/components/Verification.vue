<template>
  <div id="verify">
    <div class="col-xs-12 col-md-4 text-center text-primary message">Our Resources Say That You Haven't Verified Your Account Yet<br/><i style="font-size:40px" class="fa fa-meh-o" aria-hidden="true"></i><br/>Please Verify By Clicking On The Link That Was Sent To Your Email
    <br/><button class="btn btn-success" @click="signout">Logout <i class="fa fa-sign-out" aria-hidden="true"></i></button></div>
  </div>
  </div>
</template>

<script>
  import firebase from '../firebase'

  export default {
    data () {
      return {}
    },
    methods : {
      signout () {
        let that=this
        firebase.auth().signOut().then(function() {
        that.$router.push('/')
        })
      }
    },
    mounted () {
      let that=this
      firebase.auth().onAuthStateChanged(function(user) {
      if (!user) {
        that.$router.push('/')
      }
      else{
        if(user.emailVerified){
          that.$router.push('/Dashboard')
        }
      }
      })
    }
  }
</script>

<style scoped>
  #verify{position:fixed;min-height:100%;width:100%;background:rgba(192,192,192,0.4)}
  .message{background:white;box-shadow:0 1px 2px black;font-size:20px;position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);padding:2%;transition:box-shadow 0.2s;}
  .message:hover{box-shadow:0 5px 12px black;}
  button{font-size:20px;border:1px solid rgba(0,0,0,0.5)}
</style>
