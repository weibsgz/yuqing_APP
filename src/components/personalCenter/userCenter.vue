<template>
<div class="seller">
	<div class="inforCar box">
		<mt-cell title="过期时间:" value="
		2017-02-10 00:00:00.0"></mt-cell>
		<mt-cell title="主题剩余配额：" value="2"></mt-cell>
		<mt-cell title="手机号码：" value="18500909034"></mt-cell>
		<mt-cell title="登录密码：" >
		<span class='cspan' style="color: green">*******</span>
		<span class='cspan'  style="color: green">修改</span>
		</mt-cell>
	</div>
	<div class="link-box box">
		<mt-cell title="主题管理" value="" is-link @click.native='getThemeList()'></mt-cell>
		<mt-cell title="舆情报送设置" value="" is-link @click.native='getYq()'></mt-cell>
		<mt-cell title="预警日志" value="" is-link  @click.native='getLogs()'></mt-cell>
	</div>
	<div class="box-btn">
		<mt-button type="danger" size='large' @click='showpanel()'>退出登录</mt-button>
	</div>
	<mt-popup v-model="popupVisible" position="right">
		<mt-header title="主题管理">
			<router-link  to='' slot="left">
				<mt-button icon="back" @click='popupVisible=false'></mt-button>
			</router-link>
		</mt-header>
		<div class="formlist">
			<mt-field label="设置主题名称" placeholder='设置主题名称' v-model="formlist.file1"></mt-field>
			<mt-field label="设置关联词"   placeholder='设置关联词' v-model="formlist.file2"></mt-field>
			<mt-field label="设置排除词"  placeholder='设置排除词' v-model="formlist.file3"></mt-field>
		</div>
		<div class="btnbox">
			<mt-button type="primary" @click.native='mgSubmit()'>保存</mt-button>
			<mt-button type="default" @click.native='popupVisible=false'>取消</mt-button>
		</div>
	</mt-popup>
	<mt-popup v-model="popupVisible4" position="right">
		<mt-header title="主题管理">
			<router-link  to='' slot="left">
				<mt-button icon="back" @click='popupVisible4=false'></mt-button>
			</router-link>
		</mt-header>
		<div class="tablelist">
			<table>
				<tr>
					<th>主题名称</th>
					<th>关键词</th>
					<th>操作</th>
				</tr>
				<tr v-for="item in themesList">
					<td>{{item.name}}</td>
					<td class='keyWords'>
						<span v-for='i in item.keyWords'>{{i}}</span>
					</td>
					<td>
						<span @click='edit(item)'>编辑</span>
						<span @click='del()'>删除</span>
					</td>
				</tr >	
			</table>
		</div>
		<div class="btnbox">
			<span @click='edit()'>创建主题<span>
		</div>
	</mt-popup>
	<mt-popup v-model="popupVisible2" position="right">
		<mt-header title="报送设置">
			<router-link  to='' slot="left">
				<mt-button icon="back" @click='popupVisible2=false'></mt-button>
			</router-link>
		</mt-header>
		<div class="formlist">
			<div class="radio-list">
				<span>是否报送：</span>
				<mt-switch v-model="v1"></mt-switch>
			</div>
			<div class="radio-list radio-list2">
				<span>报送主题：</span>
				<ul class='checkbox-ul'>
					<li v-for="item in themes" class="checkbox-li" :class="{'checked':item.checked}" @click='select(item)'>
						<span>{{item.name}}</span>
					</li>
				</ul>
			</div>
			<div class="radio-list radio-list2">
				<span>信息类型：</span>
				<ul class='checkbox-ul'>
					<li v-for="item in msgs" class="checkbox-li" :class="{'checked':item.checked}" @click='select(item)'>
						<span>{{item.name}}</span>
					</li>
				</ul>
			</div>
			<div class="radio-list radio-list2">
				<span>情感类型：</span>
				<ul class='checkbox-ul'>
					<li v-for="item in emotion" class="checkbox-li" :class="{'checked':item.checked}" @click='select(item)'>
						<span>{{item.name}}</span>
					</li>
				</ul>
			</div>
		</div>
		<div class="btnbox">
			<mt-button type="primary" @click='yqSubmit(this)'>保存</mt-button>
		</div>
	</mt-popup>


	<mt-popup v-model="popupVisible3" position="right">
		<mt-header title="预警日志">
			<router-link  to='' slot="left">
				<mt-button icon="back" @click='popupVisible3=false;'></mt-button>
			</router-link>
		</mt-header>
		<div v-infinite-scroll="loadMore" infinite-scroll-disabled=false infinite-scroll-distance="10"infinite-scroll-immediate-check=true class="loadMoreBox" >
			<div class='log-box' v-for="item in logs">
				<div class="date-title">{{item.timeT}}</div>
				<div class="lists" v-for="list in item.lists">
					<div class="time"><span>{{list.time}}</span></div>
					<div class="content">
						<div class="log-title">{{list.title}}</div>
						<div class="log-other">
							<span class="label">
								{{list.label}}
							</span>
							<span class='warning-time'>
								预警时间：{{list.warningTime}}
							</span>
						</div>
					</div>
				</div >
			</div >
		</div>	
	</mt-popup>
	
</div>
</template>
<script>
import {fetchLogs,fetchThemes,fetchMsgs,fetchEmotion,fetchThemeList} from'./store/personalCenter';
export default {
	name:'personalCenter',
	data (){
		return {
			v1:true,
			v2:[1,2,3],
			formlist:{
				file1:'',
				file2:'',
				file3:'',
			},
			popupVisible:false,
			popupVisible2:false,
			popupVisible3:false,
			popupVisible4:false,
			wrapperHeight:'',
			themesList:[],
			themes:[],
			msgs:[],
			emotion:[],
			logs:[]
		}
	},
	popupVisible:false,
	components:[
	],
	methods:{
		select(item){
			if (typeof item.checked =='undefined') {
				this.$set(item,'checked',true)
			}else{
				item.checked = !item.checked
			}
		},
		getThemeList(){
			this.popupVisible4=true
			fetchThemeList().then(data=>{
				this.themesList=eval(data)
			})
		},
		edit(i){
			console.log(i)
			this.popupVisible=true;
			if (i) {
				// this.formlist.file1
			}
		},
		getYq(){
			this.popupVisible2=true;
			fetchThemes().then(data=>{
				this.themes=eval(data)
			})
			fetchMsgs().then(data=>{
				this.msgs=eval(data)
			})
			fetchEmotion().then(data=>{
				this.emotion=eval(data)
			})
		},
		mgSubmit(){
			alert(this.formlist)
			this.popupVisible=false
		},
		yqSubmit(){
			let postarry={
				ts:this.v1,
				themes:[],
				msgs:[],
				emotion:[]
			}
			this.themes.forEach(value=>{
				if (value['checked']) {
					postarry.themes.push(value.name)
				}
			});
			this.msgs.forEach(value=>{
				if (value['checked']) {
					postarry.msgs.push(value.name)
				}
			});
			this.emotion.forEach(value=>{
				if (value['checked']) {
					postarry.emotion.push(value.name)
				}
			});
			alert(postarry)
			this.popupVisible2=false
		},
		getLogs(){
			this.popupVisible3=true;
			fetchLogs().then(data=>{
				this.logs=eval(data)
			})
		},
		loadMore() {
			this.loading = true;
			fetchLogs().then(data=>{
				this.logs.push(...eval(data))
				this.loading = false;
				
			})
			
			
		}
	},
	mounted:function(){
		document.querySelector(".loadMoreBox").style.height=document.documentElement.clientHeight-40+'px'
	}

}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box{
	box-sizing: border-box;
	margin: 20px 10px;
	/*padding: 10px;*/
	box-shadow: 1px 5px 5px #ccc;
	border:1px solid #eee;
	border-width:0 1px;
}
.box-btn{
	margin:20px 10px;
}
.inforCar .mint-cell-title{width: 140px;}
.inforcar .cspan{
	flex: 1;
}
.mint-popup{
	width: 100vw;
	height: 100%;
}
.btnbox{
	text-align: center;
	margin:30px 0;
}
.radio-list{
	display: flex;
	align-items: center;
	padding: 10px;
	border-bottom: 1px solid #eee;
	margin:0 10px;
}
.radio-list span.title{
	width: 140px;
}
.radio-list ul{
	flex: 1;
	display: flex;
	flex-wrap: wrap;
}
.radio-list ul li{
	display: inline-block;
	background: #eee;
	border:1px solid #eee;
	border-radius: 5px;
	padding:5px 10px;
	margin: 5px 10px;
}
.radio-list ul li.checked{
	border-color:green;
}
.log-box {
	display: flex;
	flex-direction: column;
}
.log-box .date-title{
	line-height: 30px;
	background: #ccc;
	padding:0 10px;
}
.log-box .lists{
	display: flex;
	align-items: center;
	padding-bottom: 10px;
	overflow: hidden;
}
.log-box .lists .time{
	width: 90px;
	display: flex;
	justify-content: center;
	position: relative;
}
.log-box .lists .time:before{
	content:'';
	height: 1000px;
	border-right:1px solid #ccc;
	position: absolute;
	top:-100px;
	z-index: -1;
}
.log-box .lists .time span{
	position: relative;
	z-index: 100;
	background: #fff;
	padding: 5px;
}
.log-box .content{
	flex:1;
	padding-right: 10px;
	box-sizing: border-box;
}
.log-box .lists .log-title {
	font-size: 18px;
	line-height: 1.2;
	margin: 5px 0;
}
.log-box .lists .label {
	border:1px solid #f90;
	color: #f90;
	border-radius: 5px;
	padding: 5px;
	line-height: 1.5;
	margin-right: 10px;
}
.loadMoreBox{
	height:calc(100vh-40px);
	overflow-y: auto;
}


.tablelist{
	width: 100vw;

}.tablelist table{
	width: 100%;

}
.tablelist th{
	line-height: 40px;
	background: #efefef;
}
.tablelist td{
	line-height: 40px;
	text-align: center;
	border-bottom: 1px solid #ccc;
}
.tablelist td span{
	margin:0 5px;
}
.tablelist td span{
	margin:0 5px;
	color: #342;
}

</style>