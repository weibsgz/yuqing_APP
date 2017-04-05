<template>
  <div class="inwrap">
    <div class="change-wrapper">
      <div class="title">
      	<i class="iconfont icon-fanhui" @click="closeChangePwdPanel()"></i>
      	修改密码
      </div>
      <div class="content">
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
				    <div id="v-modal" class="v-modal" style="z-index: 1018; display: none;"></div>
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
		  	<mt-button class="signinBtn" type="danger" @click.native="changePwd" size="large">确认修改</mt-button>
      </div>
    </div>
  </div>

</template>
<script>
  import Vue from 'vue'
  import {USER_SIGNIN} from 'store/user'
  import { MessageBox,Toast  } from 'mint-ui'
  import axios from 'axios'
  import qs from 'qs'

  export default {
    name: 'ChangePwd',
    data() {
      return {
				mYflag:this.flag,
        yzdTime:'获取验证码',
				ruleForm: {
          phone: '',
          code: '',
          password:'',
          confirm:''
        },
        isSubmit:[]//默认不显示报错
      }
    },
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
            if (this.ruleForm.password !== this.ruleForm.confirm) {
              return '两次确认密码不一致'
            }
            return false;
          }
        }
      }
    },
    props:['flag'],
    watch: {
	   	flag(val) {
      	this.mYflag = val;
	    },
	    mYflag(val){
	      this.$emit("closeChangePwdPanel",val)
	    }
  	},
    methods: {
      closeChangePwdPanel(){
//        this.mYflag=!this.mYflag
        this.$emit('onChangePss','ee');
    	},
    	changePwd(){
        if (!!this.phoneMsg || !!this.codeMsg||!!this.passwordMsg || !!this.conPasswordMsg)  {return}
        var _this=this;
        axios.post('register/getPwd',qs.stringify({"phone": this.ruleForm.phone,"code":this.ruleForm.code,"password":this.ruleForm.confirm}))
          .then(function(res){
            if(res.data.code==0){
              Toast({
                message: '密码修改成功',
                iconClass: 'iconfont icon-gou'
              });
              _this.$router.replace({path: '/login'})
            }
          })
//          .catch(function(err){
//            console.log(err);
//          })
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
<style scoped>
  .inwrap{
    /*position: fixed;*/
    /*top: 0;*/
    /*right: 0;*/
    /*!*bottom: 0px;*!*/
    /*left: 0;*/
    /*background: #fff;*/
    /*z-index: 2000;*/
  }

  .change-wrapper{
    /*width: 100vw;*/
    /*height: 100%;*/
  }
  .title {
    height: 45px;
    line-height: 45px;
    text-align: center;
    color: #FFF;
    position: relative;
    background: #1c2532;
    font-size: 16px;
  }
	.icon-fanhui{
	  position: absolute;
	  left: 10px;
	  width: 20px;
	  height: 42px;
	  font-size: 22px;
	  line-height: 42px;
	}
  .content {
    width: 80%;
    margin: 0 auto;
    margin-top: 3rem;
  }
	.infoBox{
		margin-bottom:3.5rem;
	}
	.phoneWrapper,.msgWrapper,.pwdWrapper{
		border-bottom:1px solid #ccc;
		height:4rem;
		overflow: hidden;
	}
	.phoneWrapper input,.msgWrapper input,.pwdWrapper input{
		background: transparent;
		outline: none;
		color: #666;
		font-size: 1rem;
		height:1.5rem;
		border:none;
		margin-top: 1.2rem;
		/*padding-left: 1.4rem;*/
	}
	input::-webkit-input-placeholder{
		color:#ccc;
		font-family: "微软雅黑";
	}
	.icon-password,.icon-duanxinyanzheng,.icon-shouji1{
		float: left;
		width:4rem;
		text-align: center;
		font-size: 1.3rem;
		margin-top:1.3rem;
		color:#666;
		/*margin-left:1rem;*/
		border-right:1px solid #Fff;
	}
	.phoneWrapper div,.msgWrapper div,.pwdWrapper div{
		color:#Fff;
		font-size: 0.6rem;
		float:left;
	}
	.phoneWrapper p,.msgWrapper p,.pwdWrapper p{
		/*margin-left:1.4rem;*/
		margin-top:0.2rem;
		color:#ff3333;
	}
	.msgWrapper{position: relative;}
	.msgWrapper button{
		font-family: "微软雅黑";
		position: absolute;
		height:1.8rem;
		width:5rem;
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
		color:#fff;
		background-color:#ff3333;
		width: 100%;
		border-radius:2px;
		margin-bottom:1rem;
	}
.mint-msgbox{
	font-family: "微软雅黑";
	border:1px solid #666;
}
</style>
