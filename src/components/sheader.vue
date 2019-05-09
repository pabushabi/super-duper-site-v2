<template>
    <header>
        <router-link to="/" class="logo">Shadowswall <small>β</small></router-link>

        <div class="reg_log">
            <ol class="log"><router-link id="log" v-if="!logged" to="/signin" >Войти</router-link></ol>
            <ol class="log"><router-link id="reg" v-if="!logged" to="/signup">Регистрация</router-link></ol>
            <ol class="log"><router-link id="pro" v-if="logged" to="/profile">Профиль {{user}}</router-link></ol>
        </div>
    </header>
</template>

<script>
    export default {
        name: "sheader",
        props: { 'logged': Boolean,
                 'user': String }
    }
</script>

<style scoped>

</style>
