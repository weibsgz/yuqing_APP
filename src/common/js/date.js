export function formatDate(date,fmt){
	/*y开头，一个或者多个字符串*/	
	if(/(y+)/.test(fmt)){
		/*将年份yyyy替换成标准的写法并转成字符串 RegExp.$1 代表 y+ 这个正则*/
		/*后面截取字符串是为了如果传入了2个y 比如2016年 就转成 16*/
		fmt = fmt.replace(RegExp.$1,(date.getFullYear()+'').substr(4-RegExp.$1.length));
		let o = {
			'M+':date.getMonth()+1,
			'd+':date.getDate(),
			'h+':date.getHours(),
			'm+':date.getMinutes(),
			's+':date.getSeconds()
		}

		for(let k in o){
			if(new RegExp(`(${k})`).test(fmt)){
				let str = o[k]+'';
				fmt = fmt.replace(RegExp.$1,(RegExp.$1.length === 1)?str:padLeftZero(str))
			}
		}
		return fmt;
	}

	//左边是不是要补充0,如果传入 19 返回19 如果传入 6 返回06
	function padLeftZero(str){
		return ('00'+str).substr(str.length);
	}
}