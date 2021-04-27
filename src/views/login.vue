<template>
  <div class="login-form">
   <template v-if="login">
       <h1>登录系统</h1>
     <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户账号" prop="username">
          <el-input v-model.number="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
         <el-button type="primary" @click="submitFormIndex('ruleForm')">提交</el-button>
         <el-button @click="changeLogin(false, true)">前往注册</el-button>
     </el-form>
    </template>

     <template v-if="register">
        <h1>注册界面</h1>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
           <el-form-item label="用户账号" prop="username">
             <el-input v-model.number="ruleForm.username"></el-input>
           </el-form-item>
           <el-form-item label="密码" prop="password">
               <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
           </el-form-item>
           <el-form-item label="确认密码" prop="confirmPassword">
               <el-input type="password" v-model="ruleForm.confirmPassword" autocomplete="off"></el-input>
           </el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
            <el-button @click="changeLogin(true, false)">已有账号</el-button>
        </el-form>
    </template>
  </div>
</template>

<script>
  import util from '../util';

  export default{
    name:'logins',
    data(){

      let validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (_this.ruleForm.password !== '') {
            this.$refs.ruleForm.validateField('password');
          }
          callback();
        }
      };
       var validatePass2 = (rule, value, callback) => {
              if (value === '') {
                callback(new Error('请再次输入密码'));
              } else if (value !== this.ruleForm.password) {
                callback(new Error('两次输入密码不一致!'));
              } else {
                callback();
              }
            };
      return{
        login: false,
        register: true,
         ruleForm: {

          username: '123',
          password: '',
          confirmPassword: '',
        },
         rules: {
              password: [
                { required: true, message: '请输入密码', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ],
              confirmPassword: [
                { validator: validatePass2, trigger: 'blur' }
              ],
              username: [
               { required: true, message: '请输入用户名称', trigger: 'blur' },
               { min: 3, max: 5, message: '长度在 3 到 5 个字符' }
              ]

          }
      }
    },
    created(){
      //获取路由参数
      if(this.$route.params.loginStatus === "logout" ){
          window.localStorage.clear();
           this.register = true;
          this.login = false;
          this.$store.commit('getLoginStatus',false);
      }
      if( this.$route.params.loginStatus === "login"){
         this.login = true;
         this.register = false;
        this.$store.commit('getLoginStatus',false);
      }
      const loginStatus = this.$store.state.loginStatus;
      if(loginStatus){
          this.login = false;
          this.register = false;
          window.alert('您已经是登录状态')
          window.location.href = '/index'
      }
    },
    methods:{
      submitForm(){
          if(this.ruleForm.password === this.ruleForm.confirmPassword){
            window.localStorage.setItem('username',this.ruleForm.username);
            window.localStorage.setItem('password',this.ruleForm.password);
            this.register = false;
            window.localStorage.setItem('loginStatus','login');
             // this.$store.commit('getUser',this.ruleForm.username)
              this.$store.commit('getUser', this.ruleForm.username);
            window.location.href='/index'
          }else{
            this.ruleForm.password ='';
            this.ruleForm.confirmPassword ='';
             window.alert('密码和确认密码不一致')
          }


      },
      submitFormIndex(){
        let username =  window.localStorage.getItem('username');
         let password = window.localStorage.getItem('password')
         if( !util.trim(this.ruleForm.username)  ||  !util.trim(this.ruleForm.password) ){
           window.alert('账号或者密码不能为空')
         }
         if(username === this.ruleForm.username && password === this.ruleForm.password){
           this.login = false;
           window.localStorage.setItem('loginStatus','login');
            this.$store.commit('getUser',this.ruleForm.username)
           window.location.href='/index'
         }else{
           window.alert('账号或者密码错误')
         }


      },
      changeLogin(b1,b2){
        this.login = b1;
        this.register = b2
      }
    }
  }
</script>

<style scoped>
  .login-form{
    text-align: center;
    padding: 15px 0;
    width: 800px;
    margin: 0 auto;
  }
  h1{
    margin-bottom: 20px;
  }
    .login-info{
        height:100%;
        width:100%;
        text-align: center;
    }
    .login-info-form{
        position: relative;
        top: 100px;
    }
    p{
         font-size: 26px;
         color: #5c6b77;
     }
    .submit{
        font-size: 18px;
    }
    span{
        font-size: 16px;
        color: #5c6b77;
    }
</style>
