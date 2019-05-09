<template>
    <div id="app">
        <img src="./assets/logo.png" id="vue_img" alt="vue logo">
        <router-view/>
    </div>
</template>

<script>
    import shadowswall from './components/shadowswall'


    export default {
        name: 'App',
        components: {
            shadowswall,
        }
    }
</script>

<style>
    #app {
        /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/

        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        /*margin-top: 150px;*/
        padding: 0;
    }

    #vue_img {
        position: fixed;
        width: 50px;
        height: 50px;
        right: 2%;
        bottom: 4px;
        z-index: 11;
    }
</style>
