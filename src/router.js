import Vue from 'vue'
import VueRouter from 'vue-router'
import SignIn from './components/SignIn'
import Dashboard from './components/Dashboard'
import Register from './components/Register'
import Verification from './components/Verification'
import Profile from './components/Profile'

Vue.use(VueRouter)

export default new VueRouter ({
  mode:"history",
  routes:[
    {path:"/Verification",component:Verification},
    {path:"/Register",component:Register},
    {path:"/",component:SignIn},
    {path:"/Signin",component:SignIn},
    {path:"/Dashboard",component:Dashboard},
    {path:"/Profile",component:Profile}
  ]
})
