<template lang="html">
  <div class="subject-mangement">
    <div class="header">
      <span class='iconfont icon-fanhui back' @click='close()'></span>
      <span class="headerTitle">新增推送</span>
      <!--<span class=""></span>-->
    </div>
    <div class="formlist-wrap">
      <div class="formlist">
        <span>主题名称</span>
        <div>
          <select v-model="selected">
            <option v-for="option in options" v-bind:value="option">
              {{ option.themeName }}
            </option>
          </select>
        </div>
        <div class="formlist">
          <span>推送方式</span>
          <div class="bgl">
            <span v-for="(item,index) in types" :class='{active:item.flag}' @click='typesTab(item,index)'>{{item.name}}</span>
          </div>
        </div>
        <div class="formlist">
          <span>情感类型</span>
          <div class="bgl">
            <span v-for="item in sentimentList" :class='{active:item.active}' @click='qTypeTab(item)'>{{item.itemValue}}</span>
          </div>
        </div>
        <div class="formlist">
          <span>媒体类型</span>
          <div class="bgl">
            <span v-for="item in codeList" :class='{active:item.active}' @click='mTypeTab(item)'  >{{item.itemValue}}</span>
          </div>
        </div>
        <div class="formlist">
          <span>推送时段</span>
          <div>
            <input type="time" v-model='startTime' class="tstime"><input v-model='endTime' type="time" class="tstime fr">
          </div>
          <span class="msgTip">时间相同 则全天提醒</span>
        </div>
        <div class="formlist">
          <span>手机号</span>
          <input type="text" name="typeinput"  v-model='phones' placeholder='不可输入' :value='phones'  id='name' disabled="true">
        </div>
        <div class="formlist">
          <span>邮箱</span>
          <input type="email" name="typeinput" v-model='mails' placeholder='不可输入' :value='mails'  id='keyWords' disabled="true">
        </div>
        <button class="btn"  @click='submit(editem)'>保存</button>
      </div>
    </div>
  </div>
</template>
<script>
  import store from '../../../store'
  import axios from 'axios';
  import qs from 'qs';
  import { Toast } from 'mint-ui';
  export default {
    data() {
      return {
        selected:'',
        sentimentType:'',
        mediaType:'',
        options:'',//主题列表
        codeList:[],//媒体类型
        sentimentList:[],//情感类型
        types:[{//推送方式
          name:'短信',
          flag:false
        },{
          name:'邮件',
          flag:false
        }]
        ,mails:"",
        phones:'',
        freeTime:'',
        startTime:'',
        endTime:''
      }
    },
//    props:['pss','off'],
    methods: {
      init(){
        this.getoptions();//主题菜单
        this.getMastList();//媒体类型,情感类型
      },
//      selectChange(item){
//        this.themeId=item.themeId
//        this.themeName=item.themeName
//      },
      typesTab(item,ind){
        if(!!item.flag){
          item.flag=false
          document.getElementsByName("typeinput")[ind].disabled=true;
          document.getElementsByName("typeinput")[ind].placeholder='不可输入';
        }else {
          item.flag=true
          document.getElementsByName("typeinput")[ind].disabled=false;
          document.getElementsByName("typeinput")[ind].placeholder='请输入';
        }
      },
      mTypeTab(item){
        let _this=this
        this.codeList.forEach(i=>{
          if (i==item) {
          if(!!item.active){
            item.active=false
          }else {
            item.active=true
            _this.mediaType=item.itemCode;
          }
        }else{
          i.active=false
        }
      })
      },
      qTypeTab(item){
        let _this=this
        this.sentimentList.forEach(i=>{
          if (i==item) {
          if(!!item.active){
            item.active=false
          }else {
            item.active=true
            _this.sentimentType=item.itemCode;
          }
        }else{
          i.active=false
        }
      })
      },
      getoptions(){
        var  _this=this
        axios.post('/themeapp/getTheme',qs.stringify({'userId':this.$store.state.user.userId})).then(function (res) {
          if(res.data.code==0){
            _this.options =res.data.themeList
          }
        });
      },
      getMastList(){
        var  _this=this
        axios.post('/userapp/getMastList',qs.stringify({'typeId':'001'})).then(function (res) {
          if(res.data.code==0){
            _this.codeList=res.data.codeList
            _this.codeList.forEach(v=>{
              _this.$set(v,'active',false)
          })}
        });
        axios.post('/userapp/getMastList',qs.stringify({'typeId':'002'})).then(function (res) {
          if(res.data.code==0){
            _this.sentimentList=res.data.codeList
            _this.sentimentList.forEach(v=>{
              _this.$set(v,'active',false)
          })}
        });
      },
      submit() {
        if(this.startTime==''||this.endTime==''){
          Toast({
            message:'请输入推送时间段',
            position: 'middle',
            duration: 1000,
          })
          return false;
        }
        if(this.types[0].flag==true){
          if(!this.phoneValidate(this.phones)){
            Toast({
              message: '手机号码填写不正确！',
              position: 'middle',
              duration: 1000,
            });
            return false
          }
        }
        if(this.types[1].flag==true){
          if(!this.emailValidate(this.mails)){
            Toast({
              message: '邮箱地址填写不正确！',
              position: 'middle',
              duration: 1000,
            });
            return false
          }
        }
        let  _this=this
        let  parms={
          userId:this.$store.state.user.userId,
          themeId:_this.selected.themeId,
          mails:_this.mails,
          phones:_this.phones,
          mediaType:_this.mediaType,
          sentimentType:_this.sentimentType,
          themeName:_this.selected.themeName,
          freeTime:_this.startTime+'-'+_this.endTime
        }
        axios.post('/warnapp/addWarn',qs.stringify(parms)).then(function (res) {
          if(res.data.code==0){
            _this.$emit("fetchTheme",'1');
            _this.close()
            Toast({
              message: '提交成功',
            });
          }
        });
      },
      close() {
        this.selected=""
        //this.selected.themeId=""
        this.mails=""
        this.phones=""
        this.mediaType=""
        this.sentimentType=""
        //this.selected.themeName=""
        this.startTime=""
        this.endTime=""
        this.types[0].flag=false;
        this.types[1].flag=false;
        this.$emit('onChangePss','aa');
      },
      phoneValidate:function(value){
        let re=/^1\d{10}$/;
        if(re.test(value))
          return true
        else
          return false;
      },
      emailValidate:function(value){
        let re=/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
        if(re.test(value))
          return true
        else
          return false;
      },
    },
//    store,
//    mounted:function(){
//      // this.themesList=this.editem;
//    },
//    components:{
//    }
  }
</script>

<style lang="css" scoped>
.headerTitle{
	width: 55%;
	display: inline-block;
}
  .subject-mangement{
    width: 100vw;
    height: calc(100vh);
    position: fixed;
    top:0;
    left:0;
    right:0;
    bottom:0;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    background: #fff;
    /*display: none;*/
    margin-bottom: 90px;
  }
  /*.inner{*/
    /*width: 100vw;*/
    /*height: 100%;*/
  /*}*/
  /*div.show{*/
    /*display: block;*/
    /*display: flex;*/
  /*}*/
  .header{
    height: 45px;
    background: #ccc;
    line-height: 45px;
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    background: #1c2532;
    color: #fff;
    font-size: 16px;
  }
  .header .icon-jiahao{
    font-size: 26px;
  }
  .header .back{
    font-size: 20px;
    /*transform: rotate(90deg);*/
    /*display: inline-block;*/
   float: left;
	width: 45%;
  }
  .formlist-wrap{
    /*flex: 1;*/
    padding:20px 30px;
    box-sizing: border-box;
    overflow-y: auto;
    padding-bottom: 80px;
    height:100%;
  }
  .formlist{
    /*display: flex;*/
    flex-direction: column;
    margin-bottom: 30px;
  }
  .formlist span{
    font-size: 15px;
    margin-bottom: 10px;
    color: #000;
    display: inline-block;
  }
  .formlist input{
    height: 40px;
    padding: 0 10px;
    background: #ebebeb;
    border-radius: 5px;
    outline: none;
    width: 93%;
  }
  .formlist select{
    height: 40px;
    width: 100%;
    padding: 0 10px;
    border-radius: 5px;
    background: #fff;
    display: inline-block;
    border:1px solid #999999;
    outline: none;
    color: #000000;
    font-size: 16px;
    margin-bottom: 30px;
  }
  .formlist .tip{
    line-height: 1.2;
    font-size: 12px;
    margin-top: 5px;
    color: #999;
  }
  .btn{
    height: 40px;
    border-radius: 5px;
    color: #fff;
    background: #ff3333;
    display: block;
    border:none;
    width: 100%;
    font-size: 15px;outline: none;
  }
  .bgl>span.active{
    border:1px solid #666666;
    color: #666666;
  }
  .bgl>span{
    line-height: 32px;
    display: inline-block;
    height: 32px;
    padding: 0 20px;
    border-radius: 3px;
    border:1px solid #999999;
    color: #999999;
    margin-right: 5px;
  }
  .bgl>span.active{
    border:1px solid #ff3333;
    color: #ff3333;
    background: url(/static/img/right.png) no-repeat 4px center;
    background-size: 20%;
  }
  .msgTip{
    color: #ff3333 !important;
    text-align: right;
    font-size: 0.8rem !important;
    margin-bottom: 0px !important;
    margin-top: 10px;
  }
  input.tstime[type=time]{
    height:40px;
    line-height: 40px;
    width: 40%;
    background: #fff;
    border:1px solid #999999;
    outline: none;
    color: #000000;
    font-size: 16px;
    text-align: center;
  }
  .fr{
    float: right;
  }
</style>
