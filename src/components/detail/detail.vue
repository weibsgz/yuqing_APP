<!-- 文章详情页 -->
<template>
  <div class="detail-wrapper">
    <!--   {{selectedItem.title}}
     {{selectedItem.detail}} -->
    <div class="detailTop">
      <p class="title" v-html="detailObj.title"></p>
      <div class="bars">
        <span>{{detailObj.threadStarter}}</span>
        <span>{{detailObj.publishTime}}</span>
        <span class="sourceToLink"><a v-bind:href="detailObj.url">原文链接</a></span>
      </div>
    </div>
    <div class="detail-content" v-html="detailObj.content">

    </div>
    <div class="detail-footer" v-show="this.$store.state.user.userId">
          <span class="back" @click='closePanel'>
             <i class="iconfont icon-fanhui"></i>
          </span>
      <!--<template  v-if="isAppClient">-->
          <span class="share" @click="shareFun" v-show="isAppClient">
              <i class="iconfont icon-fenxiang"></i>
          </span>
      <!--</template>-->
          <span class="warn" @click="showbottomWarnTip">
             <i class="iconfont icon-icons64x6479"></i>
          </span>

          <span class="fav" @click="toFav">
             <i class="iconfont" :class="{'icon-ttpodicon':!fav,'icon-hongxin-copy':fav}"></i>
          </span>
    </div>


    <mt-popup id="_mtp" v-model="popupVisibleDetailTip" popup-transition="popup-fade"
              position="bottom" :modal=false>
      <div class="warnTip">
        <div class="warnCont">
          <dl>
            <dt>推送级别:</dt>
            <dd>
              <span v-for="(item,index) in tab.tuisong" :class="{'active':index === tuisongIndex}" @click="chooseTab(index,item)">{{item.name}}</span>
            </dd>
          </dl>

          <dl>
            <dt>发送类型:</dt>
            <dd>
              <span v-for="(item,index) in tab.type" :class="{'active':index === typeIndex}" @click="changeType(index,item)">{{item.name}}</span>

              <input v-show="typeIndex === 0" v-model="phoneNumber" class="sendInput" placeholder="手机号码" />
              <input v-show="typeIndex === 1" v-model="email" class="sendInput" placeholder="电子邮件" />
            </dd>
          </dl>

          <dl>
            <dt>推送内容:</dt>
            <dd>
              <textarea class="sendTextarea" v-model="sendTitle"></textarea>
            </dd>
          </dl>
        </div>
        <div class="warnTipBottom">
          <span @click="sendWarn" class="sendBtn">推送</span>
          <span @click='popupVisibleDetailTip = false'>取消</span>

        </div>
      </div>
    </mt-popup>

    <div class="mengceng" v-show="popupVisibleDetailTip" transition name="fade"></div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import {formatDate} from 'common/js/date'
  import {Popup,Radio,Toast } from 'mint-ui';
  import axios from 'axios';
  import qs from 'qs'
  import {isAppClient} from 'common/js/common'
  export default {
    name:'detail',
    data() {
      return {
        isAppClient:!!isAppClient,
        popupVisibleDetailTip:false,
        picked:'yellow',
        pickedType:'sms',
        warnTxt:"",
        tuisongIndex:0,
        typeIndex:0,
        phoneNumber:"",
        email:"",
        sendTitle:"",
        fav:false,
        articleIdItem:this.articleId,
        detailObj:{},
        articleDet:'',//分享用到的查详情
        sendUrl:"",
        sendContent:"",
        tab:{
          "tuisong":[
            {"name":"黄色级别","value":"1"},
            {"name":"红色级别","value":"3"},
            {"name":"橙色级别","value":"2"}
          ],
          "type":[
            {"name":"手机号码","value":"1","phoneNumber":""},
            {"name":"电子邮件","value":"2","email":""},
          ]
        }
      }
    },
    created(){
      this.renderDetail();
      //console.log("created articleId:"+this.$route.params.id);
    },
//    watch: {
//      '$route' (to, from) {
//        console.log("111111")
//        console.log(from)
//        console.log(this.articleId)
//        console.log('articleId:'+this.$route.params.id)
//        console.log('userId:'+this.$route.params.userId)
//        //this.articleId = this.$route.params.id
//        // this.renderDetail();
//      }
//    },
//    computed:{
//      //v-model绑定一个_sendTitle作为中间状态  不能直接绑定data里的title 否则无限循环
//      /* _sendTitle: {
//       // getter
//       get: function () {
//       // return '【九次方舆情推送】'+this.selectedItem.title;
//       },
//       // setter
//       set: function (newValue) {
//       console.log(this.sendTitle)
//
//       this.sendTitle = newValue
//       }
//       }*/
//    },
    methods:{
      renderDetail:function(articleId){
//        console.log('是否收藏'+this.fav);
        this.fav = false;
        var _this = this;
        let url = "";
        //如果是从APP点击的 有userID,如果从外部进来的没有userID
        if(this.$store.state.user.userId){
          //console.log("AAAAA");
          url = '/themeapp/getArticleDetail';
        }
        else
        {
          //console.log("BBB")
          url = '/warnapp/detail';
        }
        // url = '/themeapp/getArticleDetail'
        // this.articleId = articleId;
        return axios.post(url, qs.stringify({
          'userId': this.$store.state.user.userId,
          'articleId':this.$route.params.id
        })).then(function(res) {
          _this.detailObj =res.data.article;
          console.log('文章详情 '+JSON.stringify(_this.detailObj));
        }).catch(function (error) {
          console.log('错误信息： '+error);
        });
      },
      closePanel:function(){
        console.log(this.$route.params.title)
        if(this.$route.params.title=="搜索结果"){
          let searchKeys=this.$route.params.searchKeys;
          this.$router.push({name: 'advancedSearch',params:{searchKeys:searchKeys}});
        }
        else if(this.$route.params.title=="收藏夹"){
          this.$router.push({name: 'personalCenter',params:{searchKeys:"anything"}});
        }
        else if(this.$route.params.title=="更多相似文章"){
          this.$router.push({name: 'yuqingdongtai'});
        /*  let newSendObj = this.$route.params.item;
          let themeId = this.$route.params.themeId;
          let testIndex = this.$route.params.testIndex;
          let dupId = this.$route.params.dupId;
          console.log("详情页返回的数据：" + JSON.stringify(newSendObj))
          this.$router.push({name: 'yuqingdongtai',
            params:{
                searchKeys:"moreSim",
                item:newSendObj,
                themeId:themeId,
                testIndex:testIndex,
                dupId:dupId
          }});*/
         
          
        }
        else if(this.$route.params.title=="推送消息"){
           this.$router.push({name: 'personalCenter',params:{searchKeys:"tuisongxiaoxi"}});
        }
        else{
            this.$router.push({name: 'yuqingdongtai'});
          }
        //selectedItem.popupVisibleContent=false
      },
      showbottomWarnTip:function(){
        this.popupVisibleDetailTip = true;
        var _this = this;
        return axios.post('/warnapp/detail', qs.stringify({
          'articleId':this.$route.params.id
        })).then(function(res) {
//          console.log(JSON.stringify(res.data.article))
          _this.sendUrl = res.data.article.url;
          _this.sendContent = res.data.article.content;
          _this.sendTitle = "【九次方舆情推送】"+
          (res.data.article.title).replace(/\s/g, "");
        }).catch(function (error) {
          console.log('错误信息： '+error);
        });
      },
      toFav:function(){
        var _this = this;
        return axios.post('/themeapp/saveFavoritesArticles', qs.stringify({
          'userId': this.$store.state.user.userId,
          'articleId':this.$route.params.id
        })).then(function(res) {
//          console.log('收藏 '+JSON.stringify(res));
          if(res.data.code === "0"){
            Toast({
              message: '收藏成功',
              position: 'middle',
              duration: 1000,
              className:'toast1'
            });
            _this.fav = true;
          }
          else if(res.data.code === "1"){
            Toast({
              message: '已收藏过该文章',
              position: 'middle',
              duration: 1000,
              className:'toast1'
            });
            _this.fav = true;
          }
        }).catch(function (error) {
          console.log('错误信息： '+error);
        });
      },
      chooseTab:function(index,item){
        this.tuisongIndex = index;
        this.tab['tuisong'].forEach(v=>{
          v.checked = false;
      })
        Vue.set(item,'checked',true)
        console.log("item"+JSON.stringify(item))
      },
      changeType:function(index,item){
        this.typeIndex = index;
        this.tab['type'].forEach(v=>{
          v.checked = false;
      })
        Vue.set(item,'checked',true)
        this.phoneNumber = "";
        this.email = "";
      },
      sendWarn:function(){
        var sendObj = {
          "userId":this.$store.state.user.userId,
          "articleId":this.$route.params.id,
          "warnType":"1",
          "account":"",
          "warnLevel":"1",
          "content":""+this.sendTitle + this.sendUrl
          /* "tuisong":"",
           "type":{},
           "sendTitle":""*/
        };
        //推送级别
        this.tab['tuisong'].forEach((v,i)=>{
          if (v.checked) {
          sendObj['warnLevel'] = v.value;
        }
      })
        //发送类型
        this.tab['type'].forEach((v,i)=>{
          if (v.checked) {
          sendObj['warnType'] = v.value;
          //sendObj['account']['name'] = v.value;
          /*if(v.name === "手机号码"){
           sendObj["type"]['value'] = this.phoneNumber;
           }
           else{
           sendObj["type"]['value'] = this.email;
           }     */
        }
        //没有选
        /*else{
         sendObj['type'] = {};
         sendObj['type']['name'] = '手机号码';
         sendObj["type"]['value'] = this.phoneNumber;
         }  */
      })
        if(sendObj.content.length > 330){
          Toast({
            message: '发送内容过长',
            position: 'middle',
            duration: 1000,
            className:'toast1'
          });
          return
        }
        console.log(sendObj.content)
        if(!((sendObj.content).indexOf(" ")== -1)){       
          Toast({
            message: '发送内容不能有空格',
            position: 'middle',
            duration: 1000,
            className:'toast1'
          });
          return
        }



        if(this.email === ""){
          sendObj['account'] = this.phoneNumber;
          if(this.phoneValidate(this.phoneNumber)){
            //this.sendSuccess();
          }
          else{
            Toast({
              message: '手机号码填写不正确！',
              position: 'middle',
              duration: 1000,
              className:'toast1'
            });
            return false
          }
        }
        else if(this.phoneNumber === ""){
          sendObj['account'] = this.email;
          if(this.emailValidate(this.email)){
            //this.sendSuccess();
          }
          else{
            Toast({
              message: '邮箱地址填写不正确！',
              position: 'middle',
              duration: 1000,
              className:'toast1'
            });
            return false
          }
        }
//        console.log(sendObj.content.length)
//        console.log("sendObj: " + JSON.stringify(sendObj))
        var _this = this;
        return axios.post('/warnapp/saveWarn', qs.stringify(sendObj)).then(function(res) {
          console.log(JSON.stringify(res))
          if(res.data.code === "0"){
            _this.sendSuccess();
          }}).catch(function (error) {
          console.log('错误信息： '+error);
        });
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
      sendSuccess:function(){
        Toast({
          message: '预警成功',
          position: 'middle',
          duration: 1000,
          className:'toast1'
        });
        this.popupVisibleDetailTip = false;
      },
      shareFun:function(){
        this.getDetail(function(params){
          console.log(params.content)
          window.location.href="sharearticle://share?articleid="+params.articleId+"&title="+params.title+"&content="+params.content.substring(0,30)+"&img="+params.image+"&url="+params.url;
        });
      },
      getDetail:function (callback) {
        var _this=this;
        axios.post('/warnapp/detail', qs.stringify({
          'articleId':this.$route.params.id
        })).then(function(res) {
          res.data.article.articleId=_this.$route.params.id;
          callback(res.data.article);
        }).catch(function (error) {
          console.log('错误信息： '+error);
        });
      }
    },
    filters:{
      /*在js/data.js中创建方法*/
      formatDate(time){
        let date = new Date(time)
        return formatDate(date,'yyyy-MM-dd hh:mm')
      }
    },
    components:{
      formatDate,Popup,Radio,Toast
    }
  }
</script>
<style>
  .detail-wrapper{
    padding: 15px;
    padding-top: 0;
  }
  .detailTop .title{font-size: 20px;line-height: 24px; margin-top: 5px;}
  .bars{margin-top: 10px; border-bottom: 1px solid #ccc; padding-bottom: 10px; overflow: hidden;}
  .bars span{margin-right: 20px; color: #8a8a8a; float: left;}
  .bars span.sourceToLink{float: right; color: #ff3333; margin-right: 0;}
  .bars span.sourceToLink a{ color: #ff3333;}
  .detail-content{padding-top: 15px; font-size: 16px; line-height: 30px; padding-bottom: 60px;}
  .detail-footer{
    width: 100%;
    height: 50px;
    line-height: 50px;
    background: #fafafa;
    position: fixed;
    bottom: 0;
    left: 0;
    color: #666;
  }
  .detail-footer .back{ font-size: 20px; margin-left: 15px; float: left; }
  .detail-footer .warn, .detail-footer .share, .detail-footer .fav{float: right; margin-right: 15px;}
  .detail-footer span i{font-size: 24px;}
  .mint-popup-bottom {
    top: auto;
    right: auto;
    bottom: 0;
    left: 50%;
    -webkit-transform: translate3d(-50%,0,0);
    transform: translate3d(-50%,0,0);
  }

  .mengceng{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0.5;
    background: #000;}

  #_mtp{
    width: 100%!important;
    height: 70%!important;
    overflow: auto;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-active {
    opacity: 0
  }
  .warnTip{position: relative; height: 100%; box-sizing: border-box; padding: 20px; padding-top: 0}
  .warnTipBottom{

    height: 80px;
    width: 100%;
    box-sizing: border-box;
    padding-bottom: 10px;
  }

  .warnTipBottom span{width:100%; display:block; height: 40px; line-height: 40px;
    background-color: blue; text-align: center; color: #fff; margin: 0 auto; padding: 0 20px;
    box-sizing: border-box; margin-top: 15px; border-radius: 3px; background-color: #fafafa;
    color: #ff3333;}

  .warnTipBottom span.sendBtn{background-color: #ff3333 ; color: #fff;}

  .warnCont dl{ margin-top: 15px }
  .warnCont dl dt{ line-height: 35px; font-size: 15px;  }
  .warnCont dl dd{  }
  .warnCont dl dd span{ display: inline-block; width: 80px; height: 30px; line-height: 30px; 
    border-radius: 3px; background-color: #efefef; color: #666;text-align: center;
    margin-right: 11px; }

  .warnCont dl dd span.active{background-color: #ff3333; color: #fff;}
  .sendInput{width: 100%; height: 40px; line-height: 40px; background-color: #ebebeb; margin-top: 10px; padding-left: 15px; box-sizing: border-box;}

  .sendTextarea{width: 100%; height: 60px; line-height: 24px; background-color: #ebebeb; margin-top: 10px; padding-left: 15px; box-sizing: border-box; border: none;}


  /*.warnCont dl dd input, .warnCont dl dd label{display: inline-block;}
  .warnCont dl dd input{margin-right: 10px;}
  .warnTxt{width: 95%;height: 80px;}*/

  .toast1{z-index: 999999!important}
  .mint-toast{z-index: 99999!important}
</style>
