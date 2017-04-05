<template>
    <div class="shareBox">
      <div class="shareTit">分享到</div>
      <ul class="shareCont">
        <li @click="sharePYQ" id="isWechatFri">
          <p class="shareImg"><img src="./share_weChat.png"> </p>
          <p class="share-dir">微信朋友圈</p>
        </li>
        <li @click="shareWXFrd" id="isWechat">
          <p class="shareImg"><img src="./share_weChatF.png"> </p>
          <p class="share-dir">微信好友</p>
        </li>
        <li @click="shareQQFrd" id="isQQ">
          <p class="shareImg"><img src="./share_qq.png"> </p>
          <p class="share-dir">QQ好友</p>
        </li>
        <li @click="qqZone" id="isQQzone">
          <p class="shareImg"><img src="./share_qZone.png"> </p>
          <p class="share-dir">QQ空间</p>
        </li>
      </ul>
      <div class="shareBot" @click="closePopup">取消</div>
    </div>
</template>

<script>
  //引入组件
//  import { MessageBox,Toast  } from 'mint-ui';
  import { Indicator } from 'mint-ui';
  import axios from 'axios';
  import qs from 'qs';
  //创造构造器
  export default {
    data(){
      return{
//        isQQ:!!isQQInstall,
//        isWechat:!!global.isWechatInstall
    }
    },
    props:{option:{
      type:Object
    }},
    watch:{
//      isQQInstall:{
//        handler(curVal,oldVal){
//            alert(curVal)
//          conosle.log(curVal,oldVal)
//        },
//        deep:true
//      }
    },
    created(){
//        alert(this.isQQ)
//        alert(global.isQQInstall)
    },
//    components: {
//
//    },
    methods:{
      sharePYQ: function () {
        this.getShareFlg(2);
      },
      shareWXFrd: function () {
        this.getShareFlg(1);
      },
      shareQQFrd:function () {
        this.getShareFlg(3);
      },
      qqZone: function () {
        this.getShareFlg(4);
//        this.$emit('upLoadImg','QZone');
      },
//      isMobile:function () {
//        alert(navigator.userAgent);
//      },
      closePopup:function () {
        this.$emit('closePanel', 'close');
      },
      getShareFlg:function (type) {
        Indicator.open({
          text: '生成报告中...',
          spinnerType: 'fading-circle'
        });
        var _this=this;
//        alert(axios.defaults.headers.post['Origin'])
        axios.post('/shareapp/getShareFlg',qs.stringify({'themeId':this.option.themeId})).then(function (res) {
          //count为1此报告已生成count为0此报告未生成
          if(res.data.count==0){
            _this.$emit('upLoadImg',type,function (params,fag) {
              let theurl='http://'+window.location.host+'/%23/singlePage/'+params.myKey;
              window.location.href="sharetheme://share?themeid="+params.themeId+"&title="+params.title+"&content="+params.describe+"&img="+params.imgurl+"&url="+theurl+"&type="+fag;
            });
            Indicator.close();
          }else {
            _this.sharetheme(res.data,type)
          }})
      },
      sharetheme:function (params,type) {
        let theurl='http://'+window.location.host+'/%23/singlePage/'+params.myKey;
        Indicator.close();
        window.location.href="sharetheme://share?themeid="+this.option.themeId+"&title="+params.title+"&content="+params.describe+"&img="+params.imgurl+"&url="+theurl+"&type="+type;
      },
      sharearticle:function (params) {
        window.location.href="sharearticle://articleid="+params.articleId+"&title="+params.title+"&content="+params.content+"&img="+params.img+"&url="+params.url;
      }
    },
  }
</script>

<style scoped>
.shareBox{position:relative;text-align: center;height:100%;}
.shareTit{font-size:18px;line-height:60px;}
.shareCont{display:inline-block;width:100%;text-align: center;font-size: 0;text-align:center;}
.shareCont li {display: inline-block;font-size: 1rem;text-align: center;overflow: hidden;margin-bottom: 50px}
.shareCont li:first-child:nth-last-child(4),.shareCont li:first-child:nth-last-child(4) ~ li {width: 25%;}
.shareCont li:first-child:nth-last-child(3),.shareCont li:first-child:nth-last-child(3) ~ li {width: 33.33%;}
.shareCont li:first-child:nth-last-child(2),.shareCont li:first-child:nth-last-child(2) ~ li {width: 50%;}
.shareCont li:first-child:nth-last-child(1),.shareCont li:first-child:nth-last-child(1) ~ li {width: 100%;}
.shareCont li p{text-align: center;height:70px;line-height: 70px;margin: 0 auto;}
.shareCont li p > img {vertical-align: middle;}
.shareBot{position:absolute;bottom:0;left:0;font-size:18px;line-height:50px;color:#f33;border-top:1px solid #ccc;width:100%;text-align: center;background:#fafafa;}
.shareImg{width: 70px;height: 70px;font-size: 0;background:#fff;border-radius: 50%;text-align: center;}
.shareImg img{width:60%;height:auto;border-radius:35px;}
.share-dir {
    width: 90%!important;
    text-align: center;
}
</style>
