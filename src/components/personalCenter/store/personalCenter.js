import axios from 'axios';
// const HOST = 'http://192.168.20.97:9996/';
const HOST = 'http://localhost:9996/';


export function fetch(url) {
  return new Promise((resolve, reject)=> {
    axios.get(HOST + url)
        .then(response => {
          resolve(response.data);

        })
  })
}
// 获取预警日志

export function fetchLogs() {
	return fetch('static/data/logs.json')
}

// 获取主题list：
export function fetchThemeList() {
  return fetch('static/data/themeList.json')
}
// 获取报送主题：
export function fetchThemes() {
	return fetch('static/data/themes.json')
}
// 获取信息类型
export function fetchMsgs() {
	return fetch('static/data/msgs.json')
}
// 获取情感类型
export function fetchEmotion() {
	return fetch('static/data/emotion.json')
}
