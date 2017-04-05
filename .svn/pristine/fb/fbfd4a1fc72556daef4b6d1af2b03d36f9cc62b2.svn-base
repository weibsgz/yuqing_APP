<template>
  <div id="app">
  <!-- 	<keep-alive>
  		<router-view></router-view>
  	</keep-alive> -->

  	<keep-alive>	
    	<router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
  	<router-view v-if="!$route.meta.keepAlive"></router-view>

  	<!-- <router-view></router-view> -->
  </div>
</template>

<script>
import header from './components/header/header.vue'


export default {
  name: 'app',
  components: {
    'v-header': header,

  }
}
</script>



<style>
html {
    height: 100%;
}


</style>
