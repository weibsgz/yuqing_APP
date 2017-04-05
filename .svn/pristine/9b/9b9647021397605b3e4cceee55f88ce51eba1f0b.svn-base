<template lang="html">
  	<div class="yuqingdongtai yqdt inwrap" :class="{showCpts:pss,hideCpts:(!this.pss&&off)}">
	  <div class="top">
	  	<span class='iconfont icon-fanhui back' @click='close()'></span>
    	<div class="keyword-wrapper" ref="wrapper">
					<span v-for="(item,index) in tabs" class="spanItem" :class="{'active':testIndex == index}"
		           @click="tabChange(index)">{{item}}
		     </span>
    	</div>
    </div>
		<div class="content">
        <mt-loadmore v-if="loaded" :top-method="loadTop" :bottom-method="loadBottom" :auto-fill="false" ref="loadmore" @top-status-change="handleTopChange" :bottom-all-loaded="allLoaded">
            <ul class="ulNews">
                <li v-for="(item,index) in news" style="">
                    <div class="newstop" @click='openDetail(item)'>
                        <span v-html="item.title"></span>
                        <span class="tag" :class="classMap[item.type-1]">
                    			{{item.sentimentName}}</span>
                    </div>
                    <div class="newsMenu">
                        <span>来源：{{item.source}}</span>
                        <span class="time">{{item.publishTime }}</span>
                    </div>
                </li>
            </ul>
            <div slot="top" class="mint-loadmore-top">
                <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }"><i class='iconfont icon-shalou'></i>松开加载最新数据</span>
                <span v-show="topStatus === 'loading'">加载完毕</span>
            </div>
        </mt-loadmore>
        <ongLoading v-if="!loaded"></ongLoading>
		</div>
    <mt-popup id="mt" v-model="popupVisibleContent" position="right" >
        <!-- <div :detail="detail" class="detail-wrapper">{{detail.detail}}</div> -->
        <!-- <detail :userId="userId"  v-on:closePanel="recieveMessage" ref="detail"></detail> -->
        <!-- <router-view v-on:closePanel="recieveMessage" ref="detail"></router-view> -->
    </mt-popup>
    <v-footerTab></v-footerTab>
	</div>
</div>

</template>
<script>
import {
  fetchLogs
} from '../store/personalCenter';
import Vue from 'vue'
import { mapState } from 'vuex'
import BScroll from 'better-scroll'
import {
    Popup,
    Loadmore,
    Toast
} from 'mint-ui';
import detail from 'components/detail/detail';
import footerTab from 'components/footerTab/footerTab';
import axios from 'axios';
import qs from 'qs'
import store from '../../../store'
import ongLoading from 'components/pageTips/ongLoading/ongLoading';

export default {
    data() {
	    return {
	    		tabs: ["我的推送", "系统推送"],
	        loaded:false,
	        news: [],
	        classMap: ['danger', 'middle', 'safe'],
	        allLoaded: false,
	        testIndex: 0,
	        popupVisibleContent: false,
	        selectedPage: {},
	        topStatus: '',
	        articleId:"123456",
	        articleIditem:"",
	        userId:"",
	        page: 1,
	        pageSize: 10,
            allLoaded:false
	    }
    },
    created() {
        //this.tabChange(0);

        this.$nextTick(function(){
            this.render(0);
        })
//      new BScroll(this.$refs.wrapper, {
//          scrollX: true,
//          scrollY: false,
//          click: true
//      });
    },
    props:['pss','off'],
    methods: {
	      close(){
	        this.$emit('onChangePss','dd');
	      },

          render:function(index){
            console.log(1213123)
            var _this = this; 
            _this.allLoaded = false;
            let changeThemeData = {
                'userId':this.$store.state.user.userId,
                'page':this.page,
                'typeId':this.testIndex+1
            };
            axios.post('/warnapp/getWarns', qs.stringify(changeThemeData))
            .then(function(res) {
                
               _this.news = _this.news.concat(res.data.list);
               for(var i=0; i<res.data.list.length; i++){
                    if(res.data.list[i].sentimentName=='中性'){
                        res.data.list[i].type=2;
                   }else if(res.data.list[i].sentimentName=='负面'){
                        res.data.list[i].type=1
                   }else if(res.data.list[i].sentimentName=='正面'){
                            res.data.list[i].type=3
                   }
               }

               if (_this.page > 1 && parseInt(_this.page) >= parseInt(res.data.pageInfo.allPage) ) {
                            Toast({
                                message: '已加载完成',
                                position: 'middle',
                                duration: 1000,
                                className: 'toast1'
                            });
                            _this.allLoaded = true;

                }
                  _this.loaded = true; 
                _this.$refs.loadmore.onBottomLoaded();

                              
            }).catch(function (error) {
                console.log('错误信息： '+error);
            });
          },

	      tabChange: function(index) {
	        this.testIndex = index;
	        this.loaded = false
	        var _this = this;  
            this.page = 1;         
	        //重新渲染新闻列表
	        let changeThemeData = {
	            'userId':this.$store.state.user.userId,
	            'page':this.page,
	            'typeId':this.testIndex+1
	        };
	        axios.post('/warnapp/getWarns', qs.stringify(changeThemeData))
	        .then(function(res) {
	           _this.news = _this.news.concat(res.data.list);
	           for(var i=0; i<res.data.list.length; i++){
	           		if(res.data.list[i].sentimentName=='中性'){
	           			res.data.list[i].type=2;
	               }else if(res.data.list[i].sentimentName=='负面'){
	               		res.data.list[i].type=1
	               }else if(res.data.list[i].sentimentName=='正面'){
	                   		res.data.list[i].type=3
	               }
	           }
	               _this.loaded = true;
//	               console.log('更换主题后的新闻列表'+JSON.stringify(res.data.list))
	        }).catch(function (error) {
	            console.log('错误信息： '+error);
	        });
        },

        openDetail: function(item) {
            this.popupVisibleContent = true;
            //this.selectedPage = item;
            this.articleId = item.articleId;
            this.articleIditem = item.id;
            //this.$router.push('/detail');
//            console.log(this.$refs.detail)
            this.$router.push({name: 'detail', params: {id: item.articleId,userId:this.userId,title:"推送消息"}});

//            console.log("this.articleId："+this.articleId);

        },
				handleTopChange(status) {
            this.topStatus = status;
        },
        loadTop(id) {
            //刷新列表
            this.page = 1;
            this.news.length = 0;
            this.tabChange(0);
            this.allLoaded = false;
            this.$refs.loadmore.onTopLoaded();
        },
        loadBottom(id) {
            // 加载更多数据

            console.log('正在上拉加载。。')

            this.page++;
            this.render(this.testIndex);

        }
    },
    components: {
        Popup,
        detail,
        ongLoading,
        Toast,
        'v-footerTab': footerTab
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.inwrap{
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0px;
	left: 0;
	background: #fff;
	/*display: none;*/
	z-index: 2000;
}
/*div.showCpts{*/
	/*display: block;*/
/*}*/
/*div.hideCpts{*/
	/*display: block;*/
/*}*/
.back{
	width:12%;
	text-align: center;
	color:#fff;
	float:left;
}
.spanItem{
	width:50%;
	color:#fff;
	text-align: center;
	display: inline-block;
}
/*.yqdt {*/
	/*!*display: none;*!*/
/*}*/
/*.yqdt.show{*/
  /*display: block;*/
/*}*/
/*.mint-loadmore{height:calc(100vh - 110px) }*/
#mt,#mt1,#mt2{height: 100vh; width: 100vw;}
#app{
    display: flex;
}
.content{
    flex: 1;
    overflow-y: auto;
}
.footTab{
    position: static;
}
.yqdt .top {
    /*display: flex;*/
    height: 45px;
    line-height: 43px;
    background-color: #1c2532;
    position: fixed;
    width: 100%;
    z-index: 999;
    overflow: hidden;
}
.content {
   /* padding: 40px 0 60px 0;*/
    height: calc(100vh - 100px);
    padding-top:40px;
}
.yqdt .content ul li {
    padding: 10px;
    box-sizing: border-box;
  	/*height: 100px;*/
    border-bottom: 1px solid #ccc;
}
.yqdt .content ul li .newstop {
    width: 100%;
    margin-bottom: 15px;
    line-height: 24px;
    font-size: 16px;

}
.yqdt .content ul li .newstop .tag {
    border-radius: 3px;
    padding: 2px 5px;
    font-size: 12px;
}
.yqdt .content ul li .newsMenu {
    /*display: flex;*/
   overflow: hidden;
}
.yqdt .content ul li .newsMenu span {
    /*flex: 1;*/
    color: #8a8a8a;
    font-size: 14px;
    float:left;
}
.yqdt .content ul li .newsMenu span.time {
    /*flex: 1;*/
   float:right;
   width: 50%;
}
.tag.middle {
    color: #fff;
    background-color: #55a4e1;

}
.tag.danger {
    color: #fff;
    background-color: #ff6c6c
}
.tag.safe {
    color: #fff;
    background-color: #35c870
}
.icon-caret {
    transition: all 1s;
    margin-top: -1px;
}
.mint-loadmore-top{
    /*margn-top:0;*/
}
.keyword-wrapper {
    /*flex: 1;*/
    /*overflow: hidden;*/
    width: 88%;
    float: left;
}
.scrollWrapper {
    white-space: nowrap;
}
.scrollWrapper span {
    color: #fff;
    font-size: 14px;
    width:50%;
    height: 97%;
    display: inline-block;
    box-sizing: border-box;
}
.keyword-wrapper span.active {
    color: #ff3333;
    border-bottom: 3px solid red
}
</style>
