<style lang="less" scoped>

</style>
<template>
	<div>
    <div class="box-btn">
      <mt-button type="danger" size='large' @click='submit'>退出登录</mt-button>
    </div>
	</div>
</template>
<script>
    import { mapActions } from 'vuex'
    import { USER_SIGNOUT } from 'store/user'
    import Vue from 'vue';
    import { Button } from 'mint-ui';
    export default {
        methods: {
            ...mapActions([USER_SIGNOUT]),
            submit() {
                this.USER_SIGNOUT()
				this.$router.replace({ path: '/login' })
            }
        }
    }
</script>
