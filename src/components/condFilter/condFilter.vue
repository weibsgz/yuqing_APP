<!-- 条件筛选 -->
<template>
    <div class="condFilter">
        <div class="filterTop">
          信息条件筛选
          <div class="cancel" @click="closePanel">取消</div>
        </div>
        <div class="filterCont" ref="wrapper" >
            <div class="rollWrapper" style="height:180px;">
               <dl>
              <dt>媒体类型</dt>
              <dd>
                  <ul>
                     <li :class="{'active':messageIndex == index}" v-for="(item,index) in messageTypes" @click = "selectItem(index,'mediaType',item)">
                       {{item.itemValue}}
                     </li>
                  </ul>
              </dd>
            </dl>

            <dl>
              <dt>情感类型</dt>
              <dd>
                  <ul>
                     <li :class="{'active':emotionIndex == index}" v-for="(item,index) in emotionTypes" @click = "selectItem(index,'sentiment',item)">
                       {{item.itemValue}}
                     </li>
                  </ul>
              </dd>
            </dl>

              <dl>
              <dt>时间范围</dt>
              <dd>
                  <ul class="timeArea">
                    <li :class="{'active':timeIndex == index}" v-for="(item,index) in timeAreas" @click = "selectItem(index,'timeType',item)">
                       {{item.itemValue}}
                     </li>

                  </ul>
              </dd>
            </dl>

            <dl>
              <dt>排序</dt>
              <dd>
                  <ul class="timeArea">
                    <li class="widthBig" :class="{'active':sortIndex == index}" v-for="(item,index) in sortTypes" @click = "selectItem(index,'orderBy',item)">
                       {{item.itemValue}}
                     </li>
                  </ul>
              </dd>
            </dl>

            <dl>
              <dt>相似文章</dt>
              <dd>
                  <ul>
                     <li :class="{'active':similar}" @click="similar = !similar">合并</li>
                  </ul>
              </dd>
            </dl>

            <div class="buttonArea">
               <div class="button" @click="submit">确定</div>
            </div>
            </div>
        </div>
    </div>
</template>
<script>
import Vue from 'vue'
import BScroll from "better-scroll";
import axios from 'axios';
import qs from 'qs'

export default {
    name:'condFilter',
    data() {
        return {
          messageIndex:0,
          emotionIndex:0,
          timeIndex:0,
          sortIndex:0,
          similar:true,
          messageTypes:[],
          emotionTypes:[],
          timeAreas:[],
          sortTypes:[],
          sendObj:{
            "userId":"",
            "themeId":"",            
            "page":"1",
            "pageSize":"10",
            "mediaType":"0",
            "sentiment":"9",
            "timeType":"day",
            "orderBy":"scores",
            "flg":"1"
          }
        }
    },
     props: {
            themeId: {
                type: String
            }
     },   

    created(){
      this.$nextTick(function() {      
          this._initScroll()
          //console.log(this.condFilter)
         
      })
    },
    methods:{
      _initScroll:function(){
        this.scroll = new BScroll(this.$refs.wrapper, {
            scrollY: true,
            scrollX: false,
            click: true,
            probeType: 3
        });
      },
      renderCond:function(){
        this.userId=this.$store.state.user.userId;
        var _this = this;
          axios.post('/userapp/getMastList.do?typeId=001')
          .then(function (res) {
            console.log('媒体类型：'+JSON.stringify(res.data.codeList))
            _this.messageTypes = res.data.codeList;
          }).catch(function (error) {
            console.log(error);
          });
          axios.post('/userapp/getMastList.do?typeId=002')
          .then(function (res) {
            console.log('情感类型：'+JSON.stringify(res.data.codeList))
            _this.emotionTypes = res.data.codeList;
          })
          .catch(function (error) {
            console.log(error);
          });
          axios.post('/userapp/getMastList.do?typeId=003')
          .then(function (res) {
            console.log('时间'+JSON.stringify(res.data.codeList))
            _this.timeAreas = res.data.codeList;

          });

          axios.post('/userapp/getMastList.do?typeId=004')
          .then(function (res) {
            console.log('排序'+JSON.stringify(res.data.codeList))
            _this.sortTypes = res.data.codeList;

          })
          

      },
      closePanel:function(){
         this.messageIndex=0;
         this.emotionIndex=0;
         this.timeIndex=0;
         this.sortIndex=0;
         this.similar = true;
        this.$emit('closePanel', 'closeFilter');
      },
      selectItem:function(index,type,item){
        console.log(index)
          switch(type)
          {
          case 'mediaType':
            this.messageIndex = index;           
            break;
          case 'sentiment':
            this.emotionIndex = index;
            this.sendObj.messageType = item.itemCode;
            break;
          case 'timeType':
            this.timeIndex = index;
            break;
          case 'orderBy':
            this.sortIndex = index;
            break;

          default:

          }

           this.sendObj[type] = item.itemCode;
          /*this.condFilter[type].forEach(v=>{
              v.checked = false;
            })
          this.$set(item,'checked',true)*/

      },
      submit:function(){
    /*    let postarry = {
            messageType:"",
            emotionType:""
            similar: this.similar
        };
*/
        /*this.condFilter.messageType.forEach(data=>{
          if (data['checked']) {
            postarry.messageType = data.value
          }
        });

        this.condFilter.emotionType.forEach(data=>{
          if (data['checked']) {
            postarry.emotionType= data.value
          }
        });*/

       /* for(var key in this.condFilter){
          this.condFilter[key].forEach(v=>{

            if (v.checked) {
               //console.log(key+':'+v.value)
               postarry[key] = v.value;
            }
          })
          //如果某菜单没有选 postarry[key] == undefined
          console.log(postarry[key])
          if(typeof postarry[key] === 'undefined'){
             postarry[key] = this.condFilter[key][0].value
          }
        }

        console.log(postarry);*/



        this.sendObj.userId = this.userId;
        this.sendObj.themeId = this.themeId;
        this.sendObj.flg = this.similar?"1":"0";
        console.log('sendObj：'+JSON.stringify(this.sendObj))
       
        //this.closePanel()
        this.$emit('closePanel', 'closeFilter');
        this.$emit('postarry',this.sendObj);
      }

    },

     components:{
      BScroll
    }

}
</script>
<style>
.filterTop{ position:relative; height: 40px; line-height: 40px; background-color: #1c2532; color: #fff;z-index: 999;
text-align: center; font-size: 18px;}

.filterTop .cancel{position: absolute; left: 10px; top: 0; font-size: 14px;}
.filterCont{padding: 15px;}

.filterCont dl dt{height: 40px; line-height: 40px; font-size: 14px}
.filterCont dl dd{}
.filterCont dl dd ul{
    font-size: 0;
    width: 110%;
    display: flex;
 /*   justify-content: space-between;*/
    flex-wrap: wrap
}
.filterCont dl dd ul li{
    width: 20%;
    display: inline-block;
    box-sizing: border-box;
    padding: 0 1em;
    margin-right: 3.5%;
    margin-bottom: 3.5%;
    border: 1px solid #999;
    border-radius: 5px;
    line-height: 35px;
    font-size: 14px;
    text-align: center;
    color: #333;
}

.filterCont dl dd ul li.active{
  color: red;
  border: 1px solid red;
  background:url(gou.png);
  background-repeat: no-repeat;
  background-position: 5px 12px;
}
.filterCont dl dd ul.timeArea li.widthBig{
  width: auto!important;
  padding: 0 15px!important;
}
.filterCont dl dd ul.timeArea li{
  width: 24%
}

/*.filterCont dl dd ul li:nth-child(4n){
  margin-right: 0;
}*/

.buttonArea{width: 80%; margin: 20px auto }
.button{width: 100%; text-align: center; height: 45px; line-height: 45px;
  background-color: #ff3333; color: #fff; border-radius: 5px;}

</style>
