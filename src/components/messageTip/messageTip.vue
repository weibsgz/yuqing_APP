<template>
  <div class="seller">
    this is 消息提醒
    <div class="login-msg" v-if="!user.id">
      <router-link to="/login">你还未登录，请先登录</router-link>
    </div>
    <router-link to="/register">注册</router-link>
    <div class="msg" v-if="user.id">
      <br>
      哈哈，恭喜你已经入坑Vue2-------{{user.id}}
    </div>

    <router-link to="/signout">退出登录</router-link>
    <button v-on:click="share">分享</button>

    <mt-popup class="sharePopup" v-model="popupShareVisible" position="bottom" popup-transition="popup-fade">
      <v-share :option="option"></v-share>
    </mt-popup>
    <v-footerTab></v-footerTab>
  </div>

</template>

<script>
  import Vue from 'vue'
  import { mapState } from 'vuex'
  import { Popup } from 'mint-ui';
  import footerTab from 'components/footerTab/footerTab'
  import share from 'components/share/index'
  import {isAppClient} from 'common/js/common'

  export default {
    data() {
      return {
        popupShareVisible: false,//初始不显示弹出框
        data:{title:'标题信息什么呀',image:'',url:'http://jingji.cctv.com/2017/02/24/ARTIGwwQXS7msE61K6Adr7X3170224.shtml',content:'55份年报透露机构动向买入成四季度主基调\n 股票来源：证券时报网 2017年02月24日 09:56 A-A+\n扫一扫手机阅读'},
        option:{}
      }
    },
    components: {
      'v-footerTab':footerTab,
      'v-share': share,
    },
    methods:{
      share: function () {
        alert(this.$route.params.id)
        this.option.title=data.title;
        this.option.link=data.url;
        this.option.imgUrl=data.image;
        this.option.desc=data.content.toString(30);
        if(!isAppClient){
          this.popupShareVisible = true;
        }else {
          //发起如下格式的伪url:share://title=分享标题&content=分享内容&img=http://123.png&url=http://test.com
          window.location.href="share://title=分享标题&content=分享内容&img=http://123.png&url=http://test.com"
        }

      }
    },
    computed: mapState({ user: state => state.user })
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >

</style>
