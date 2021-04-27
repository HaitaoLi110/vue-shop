import Vue from 'vue'
import Vuex from 'vuex'
import util from '../util';
import data_product from '../product'
Vue.use(Vuex)

const store = new Vuex.Store({
  state:{
    //商品列表信息
    productList:[],
    //购物车数据，数组形式，数据元素为对象（商品id，购买数量count）
    cartList:[],
    username:window.localStorage.getItem('username'),
      loginStatus: !!window.localStorage.getItem('loginStatus')
  },
  getters:{
     //品牌、颜色筛选
              brands: state => {
                  const brands = state.productList.map(item => item.brand);
                  return util.getFilterArray(brands);
              },
              colors: state => {
                  const colors = state.productList.map(item => item.color);
                  return util.getFilterArray(colors);
              }
  },
   mutations:{
     setproductList(state,data){
       state.productList = data
     },
     addCart(state,id){
      const isAddCard = state.cartList.find((item) =>item.id === id)
      if(isAddCard){
        isAddCard.count++
      }else{
        state.cartList.push({
          id:id,
          count:1
        })
      }
     },
     editCardCount(state,payload){
        const product = state.cartList.find((item) => item.id === payload.id)
        product.count += payload.count;
        
     },
     deleteCart(state,id){
       const index = state.cartList.findIndex((item) => item.id === id)
       state.cartList.splice(index,1)
     },
     emptyCart(state){
       state.cartList = []
     },
     getLoginStatus(state,flag){
       state.loginStatus  = flag
     },
     getUser(state,username){
        console.log('username',username)
       state.username = username;
     }
   },
   actions:{
    //异步请求商品列表，暂且使用setTimeout
    getProductList( context){
      setTimeout(()=>{
        context.commit('setproductList',data_product)
      }, 500)
    },
    buy(context){
      return new Promise(resolve => {
        setTimeout(() =>{
            context.commit('emptyCart')
            resolve()
        },500)
      })
    }
   }
})

export default store
