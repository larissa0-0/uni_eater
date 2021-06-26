import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const screendata ={
  screenarr:[]
}

const state = {
  screendata
}

export default new Vuex.Store({
  state,
  mutations:{
    screenmuta(state,listdata){
      console.log(listdata)
      state.screendata = {
        screenarr:listdata
      }
    }
  }
})