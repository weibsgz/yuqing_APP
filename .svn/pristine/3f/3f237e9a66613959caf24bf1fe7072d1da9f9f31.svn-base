<style lang="less" scoped>
.signinWrapper{
	font-family: "微软雅黑";
	background-image:url(login-bg.png);
	background-repeat:no-repeat;
	background-size:100% auto;
	height: 100%;

}
.header{
	color:#fff;
	height:7.5rem;
	padding-top:1rem;
	font-size:1rem;
	text-align: center;
	font-weight: bold;
}
.minheight{
  min-height: 32.5rem;
  background-image:url('login-bg.png');
  background-repeat:no-repeat;
  background-size:100% auto;padding:0 1rem;
}
.header i{float:left;}
.infoBox{
	background-color: rgba(15,9,34,.5);
	border-radius:2px;
	margin-bottom:3.5rem;
}
.phoneWrapper,.msgWrapper,.pwdWrapper{
	border-bottom:1px solid #110508;
	height:4rem;
	overflow: hidden;
}
.confirmpwd{
	border-bottom:none;
}
.phoneWrapper input,.msgWrapper input,.pwdWrapper input{
	background: transparent;
	outline: none;
	color: #fff;
	font-size: 1rem;
	height:1.5rem;
	border:none;
	/*border-left:1px solid #Fff;*/
	margin-top: 1.2rem;
	padding-left: 1.4rem;
}
input::-webkit-input-placeholder{
	color:#fff;
	font-family: "微软雅黑";
}
.icon-password,.icon-duanxinyanzheng,.icon-shouji1{
	float: left;
	width:4rem;
	text-align: center;
	font-size: 1.3rem;
	margin-top:1.3rem;
	color:#fff;
	margin-left:1rem;
	border-right:1px solid #Fff;
}
.phoneWrapper div,.msgWrapper div,.pwdWrapper div{
	color:#Fff;
	font-size: 0.6rem;
	float:left;
	/*height:3rem;*/
}
.phoneWrapper p,.msgWrapper p,.pwdWrapper p{
	margin-left:1.4rem;
	margin-top:0.2rem;
	color:#ff3333;
}
.msgWrapper{position: relative;}
.msgWrapper button{
	font-family: "微软雅黑";
	position: absolute;
	height:1.8rem;
	width:5.2rem;
	border-radius: 2px;
	background:#ff3333;
	color:#fff;
	text-align: center;
	outline: none;
	border:none;
	right:1rem;
	top:1.1rem;
}
.signinBtn{
	font-size: 1rem;
	font-family: "微软雅黑";
	height:3rem;
	font-size: 0.9rem;
	color:#fff;
	background-color:#ff3333;
	width: 100%;
	border-radius:2px;
	margin-bottom:1rem;
}
.mint-msgbox{font-family: "微软雅黑";}
</style>
<template>
  <div class="signinWrapper">
    <div class="minheight">
  	<div class="header">
			<i class="iconfont icon-fanhui" onclick="window.history.go(-1)"></i>
			注册
		</div>
  	<div class="infoBox">
  		<!--输入手机号码-->
	    <div class="phoneWrapper">
	    	<i class="iconfont icon-shouji1"></i>
		    <div>
		      <input placeholder="请输入手机号" type="number" v-model.trim="ruleForm.phone" v-on:blur="showMsg('0')">
	      	<p v-show="!!isSubmit[0]&&!!phoneMsg">{{phoneMsg}}</p>
      	</div>
	    </div>
	    <!--输入短信验证码-->
	    <div class="msgWrapper">
		    <i class="iconfont icon-duanxinyanzheng"></i>
	    	<div>
		      <input placeholder="短信验证码" type="number" v-model.trim="ruleForm.code" v-on:blur="showMsg('1')">
	      	<p v-show="!!isSubmit[1]&&!!codeMsg">{{codeMsg}}</p>
		    </div>
		    <button v-on:click="sendCode">{{yzdTime}}</button>
	    </div>
	    <!--输入密码-->
	    <div class="pwdWrapper">
		    <i class="iconfont icon-password"></i>
	    	<div>
		      <input placeholder="6~12位字母和数字组合" type="password" v-model.trim="ruleForm.password" v-on:blur="showMsg('2')">
	      	<p v-show="!!isSubmit[2]&&!!passwordMsg">{{passwordMsg}}</p>
		    </div>
	    </div>
	    <!--确认密码-->
	    <div class="pwdWrapper confirmpwd">
		    <i class="iconfont icon-password"></i>
	    	<div>
		      <input placeholder="请确认密码" type="password" v-model.trim="ruleForm.confirm" v-on:blur="showMsg('3')">
	      	<p v-show="!!isSubmit[3]&&!!conPasswordMsg">{{conPasswordMsg}}</p>
		    </div>
	    </div>
	  </div>
	  <mt-button class="signinBtn" type="danger" @click.native="register" size="large">注册</mt-button>
    </div>
    </div>
</template>

<script>
  //引入组件
  import Vue from 'vue'
  import { MessageBox,Toast  } from 'mint-ui';
  import {USER_SIGNIN} from 'store/user'
  import axios from 'axios'
  import qs from 'qs'

  //创造构造器
  export default {
    data() {
      return {
        ruleForm: {
          phone: '',
          code: '',
          password:'',
          confirm:''
        },
        yzdTime:'获取验证码',
        isSubmit:[]//默认不显示报错
      }
    },
    // computed property for form validation state
    computed: {
      phoneMsg:{
        get: function() {
          if (!this.ruleForm.phone) {
            return '请输入手机号'
          }else if( this.ruleForm.phone.toString().length != 11){
            return '请输入有效的手机号码'
          }else{
            return false;
          }
        }
      },
      codeMsg:{
        get: function() {
          if (!this.ruleForm.code) {
            return '请输入验证码'
          }else{
            return false;
          }
        }
      },
      passwordMsg:{
        get: function() {
          if (!this.ruleForm.password) {
            return '请输入密码'
          }else if(!/^[A-Za-z0-9]+$/.test(this.ruleForm.password) || this.ruleForm.password.length < 6||this.ruleForm.password.length>12){
            return '密码只能是6~12位的英文和数字组合'
          }else{
            return false;
          }
        }
      },
      conPasswordMsg:{
        get: function() {
          if (!this.ruleForm.confirm) {
            return '请输入密码'
          }else if(!/^[a-zA-Z0-9]*([a-zA-Z][0-9]|[0-9][a-zA-Z])[a-zA-Z0-9]*$/.test(this.ruleForm.confirm) || this.ruleForm.confirm.length < 6||this.ruleForm.confirm.length>12){
            return '密码只能是6~12位的英文和数字组合'
          }else{
            if (this.ruleForm.password != this.ruleForm.confirm) {
              return '两次确认密码不一致'
            }
            return false;
          }
        }
      }
    },
    methods:{
      register(){
        if (!!this.phoneMsg || !!this.codeMsg||!!this.passwordMsg || !!this.conPasswordMsg)  {return}
        var _this=this;
        axios.post('register/saveRegister',qs.stringify({"phone": this.ruleForm.phone,"code":this.ruleForm.code,"password":this.ruleForm.confirm}))
          .then(function(res){
            if(res.data.code==0){
              Toast({
                message: '注册成功',
                iconClass: 'iconfont icon-gou'
              });
              _this.$router.replace({path: '/login'})
            }
          })
          .catch(function(err){
            console.log(err);
          })
      },
      showMsg(the){
        this.isSubmit[the]=true;//打开当前校验显示
        //console.log(the);
      },
      sendCode:function (e) {
        if(!this.ruleForm.phone){
          MessageBox('提示', '请输入手机号');
          return;
        }
        if (!!this.phoneMsg){return}
        e.target.disabled=true;
        this.yzdTime="50s再发送"
        var _this=this;
        var clickTime = new Date().getTime();
        var Timer = setInterval(function(){
          var nowTime = new Date().getTime();
          var second  = Math.ceil(50-(nowTime-clickTime)/1000);
          if(second>0){
            console.log(second)
            _this.yzdTime=second+"s再发送"
          }else{
            clearInterval(Timer);
            _this.yzdTime='获取验证码'
            e.target.disabled=false;
          }
        },1000);
        axios.post('register/getYZM', qs.stringify({"phone": this.ruleForm.phone})).then(function (res) {
          if(res.data.code==0){
            Toast({
              message: '发送成功',
              iconClass: 'iconfont icon-gou'
            });
          }
        });
        // axios.post('register/getYZM', qs.stringify({  "phone": this.ruleForm.phone}));
      }
    }
  }
</script>

<style>

</style>
