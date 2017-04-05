export default {
    state: {
      flag:false,
      flag2:false,
      flag3:false,
      themesList:[]
    },
    mutations: {
          flagInit(state){
            state.flag=false,
            state.flag2=false,
            state.flag3=false
          },
          increment (state,item) {//主题编辑
            state.flag=!state.flag
          },
          increment1 (state,item) {
            state.flag=!state.flag
          },
          increment2(state) {//主题管理
            state.flag2=!state.flag2
          },
          increment3(state) {//收藏夹
            state.flag3=!state.flag3
          }
          ,pushthemesList(state,list){
            state.themesList.push(list)
          }
          ,fetchthemesList(state,list){
            state.themesList=list
          }
    },
    actions: {

    }
}
