<template>
  <div id="index">
    <template v-if="show">
      <div class="header">
        <router-link to="/list" class="header-title" >网站首页</router-link>
        <div class="header-menu">
          <router-link to="/car" class="header-menu-cart">购物车
             <span v-if="cartList.length">{{cartListAll}}</span></router-link>
        </div>
        <div class="header-menu">{{user}}</div>
        <div class="header-menu">
          <router-link to="/login/login" class="header-menu-cart">退出登录</router-link>
        </div>
      </div>
    </template>
    <router-view></router-view>
  </div>
</template>

<script>
  export default{
    name:"index",

    data(){
      return{
        user:this.$store.state.username
      }
    },
     computed: {
          cartList(){
              return this.$store.state.cartList;
          },
          show(){
              return this.$store.state.loginStatus;
          },
          ininClick(){
            if(this.$store.state.username){
              this.$router.push('/list')
            }
          },
          cartListAll(){
            let countAll = 0;
            this.$store.state.cartList.forEach(item =>{
              countAll += item.count
            })
            return countAll
          }
      },
      mounted(){
        this.ininClick

      }
  }
</script>

<style>
</style>
