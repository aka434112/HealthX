<template>
  <div id="profile">
  <div class="container">
    <div class="row">
    <div class="col-md-3"></div>
    <div class="col-xs-12 col-md-6 text-center jumbotron" id="update">
      <input type="text" placeholder="Enter your new username" class="form-control"/>
      <br/>
      <input type="password" placeholder="Enter your new password" class="form-control"/>
      <br/>
      <input @click="submit" type="submit" value="Submit" class="btn btn-danger"/><br/><br/>
      <router-link to="/Dashboard">Click here to go back to your Dashboard</router-link>
    </div>
    <div class="col-md-3"></div>
    </div>
  </div>
  </div>
</template>

<script>
  export default {
    name:"profile",
    data: function() {
      return {}
    },
    methods : {
      submit () {

      }
    },
  }
</script>

<style scoped>
  #profile{background:rgba(0,0,0,0.6);position:fixed;width:100%;height:100%;}
  a{text-decoration:none;}
  input[type=submit]{border:1px solid rgba(0,0,0,0.6);}
  input:focus{box-shadow:0 0 5px rgba(255,0,0,0.6);border:1px solid rgba(255,0,0,0.6);}
  #update{box-shadow:0px 0px 10px black;position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);}
</style>
