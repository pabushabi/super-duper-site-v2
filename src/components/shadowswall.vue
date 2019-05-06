<template>
    <div class="content">
        <header>
            <span @click="main" class="logo">Shadowswall <small>β</small></span>

            <div class="reg_log">
                <ol class="log"><span id="log" v-if="!logged" @click="auth">Войти</span></ol>
                <ol class="log"><span id="reg" v-if="!logged" @click="authR">Регистрация</span></ol>
                <ol class="log"><span id="pro" v-if="logged" @click="profile">Профиль {{user}}</span></ol>
            </div>
        </header>
        <div id="main" v-if="page === 0">
            <div class="search_bar">
                <form class="search_form" method="post" action="/" name="search">
                    <label id="search_label" for="search_input">Поиск {{searchReq}}</label>
                    <input id="search_input" type="search" name="search_req" autocomplete="off"
                           placeholder="Введите запрос" v-model="searchReq"/>
                    <p id="askingfor">Я ищу:</p>
                    <ul class="radio-ul" type="none">
                        <li class="radio-li">
                            <input class="radio" id="r1" name="radio-type" value="1" type="radio" v-model="checkVac"/>
                            <label class="label_radio" for="r1">Работника</label>
                        </li>
                        <li class="radio-li">
                            <input class="radio" id="r2" name="radio-type" value="2" type="radio" v-model="checkVac"/>
                            <label class="label_radio" for="r2">Работу</label>
                        </li>
                    </ul>
                    <ul type="none">
                        <li>
                            <input class="radio" id="c1" type="checkbox" value="1" name="check_" v-model="checks"/>
                            <label class="label_check" for="c1">Высшее образование</label>
                        </li>
                        <li>
                            <input class="radio" id="c2" type="checkbox" value="2" name="check_" v-model="checks"/>
                            <label class="label_check" for="c2">Полный день</label>
                        </li>
                        <li>
                            <input class="radio" id="c3" type="checkbox" value="3" name="check_" v-model="checks"/>
                            <label class="label_check" for="c3">Стаж больше 10 лет</label>
                        </li>
                        <li>
                            <input class="radio" id="c4" type="checkbox" value="4" name="check_" v-model="checks"/>
                            <label class="label_check" for="c4">З/п больше 30000р</label>
                        </li>
                    </ul>
                </form>
            </div>
            <section id="section">
                <article v-for="(item, index) in items" :key="index" :id=index
                         :class="['art', {resized : currentArt === index}]"
                         @click="currentArt = currentArt === index ? -1 : index">
                    <h2>{{item.first_name + " " + item.second_name}}</h2>
                    <p class="text">{{item.first_name + " " + item.second_name}}, <br> Специализация: <b>{{item.spec}}</b>,
                        <br> Возраст: {{item.age}}, Опыт работы: <b>{{item.experience}}</b>,
                        <br> Высшее образование: {{item.educ}}
                        <br> Предпочитаемый режим работы: {{item.time_mode}},
                        <br> Желаемая заработная плата: <b>{{item.pay_b}}р - {{item.pay_t}}р</b>.
                        <br> Коротко о себе: {{item.about}}</p>
                </article>
            </section>
        </div>
        <login v-if="page === 1" title="Вход в аккаунт"></login>
        <login v-if="page === 2" title="Регистрация"></login>
    </div>
</template>

<script>
    import axios from "axios";
    import Login from "@/components/login";

    export default {
        name: "shadowswell",
        components: {Login},
        data() {
            return {
                currentArt: -1,
                items: [],
                searchReq: '',
                checks: [],
                checkVac: '',
                logged: false,
                user: "",
                page: 0,
            }
        },
        computed: {},
        watch: {
            searchReq: function () {
                this.sendReq()
            },
            checks: function () {
                this.sendReq()
            },
            checkVac: function () {
                this.sendReq()
            }
        },
        mounted() {
            //   // if (xhr.response === "" || xhr.response === undefined || xhr.response === null)
            //     // $("#error-art").css("visibility", "visible");

            axios.post("http://localhost:200/", {type: "articles"})
                .then((res) => {
                    console.log(res);
                    // let {da1, da2} = JSON.parse(res.data);
                    this.items = res.data.da1;
                    console.log(res.data.da1);
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        methods: {
            sendReq() {
                axios.post("http://localhost:200/", {type: "search", search_req: this.searchReq,
                    radio: this.checkVac,
                    check: this.checks})
                    .then((res) => {
                        console.log(res.data);
                        console.log(res)
                    })
                    .catch((err) => {
                        console.log(err)
                    });

                // $(".art").remove();
                // if (xhr.response === "" || xhr.response === undefined || xhr.response === null)
                //   $("#error-art").css("visibility", "visible");
                // let {da1, da2} = JSON.parse(xhr.response);
                // addRes(da1);
                // addVac(da1, da2);
            },
            main() {
                this.page = 0;
            },
            auth() {
                this.page = 1;
            },
            authR() {
                this.page = 2;
            },
            profile() {
                this.page = 3;
            },
        }
    }
</script>

<style>
    * {
        margin: 0;
        padding: 0;
        --mainColor: #f26065;
        /*color: #231f20;*/
        text-align: start;
        font-family: 'Roboto', sans-serif;
    }

    ::selection {
        background-color: rgba(0, 0, 0, 0.1);
    }

    header {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 60px;
        background-color: white;
        border-bottom: 1px rgba(27, 31, 35, 0.1) solid;
        z-index: 10;
    }

    span.logo {
        position: relative;
        top: 17%;
        margin-left: 17%;
        font-weight: bold;
        background: linear-gradient(75deg, var(--mainColor), #6d78ff);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        color: #0B2349;
        font-size: xx-large;
        outline: none;
        cursor: pointer;
    }

    h1 {
        position: fixed;
        top: 170px;
        width: 100%;
        text-align: center;
        color: #231f20;
    }

    input {
        padding-left: 8px;
        padding-right: 8px;
        margin-top: 5px;
        margin-bottom: 5px;
        width: 250px;
        height: 30px;
        border-radius: 2px;
        border: solid rgba(27, 31, 35, 0.45) 1px;
        font-size: 16px;
        outline: 0;
    }

    input::placeholder {
        color: #999999;
    }

    input:focus, .resume-form > label > textarea:focus {
        border-image: linear-gradient(75deg, var(--mainColor), #6d78ff) 1;
    }

    #main {
        margin: 0 auto;
        width: 80%;
    }

    .search_bar {
        position: fixed;
        right: 17%;
        top: 80px;
        width: 220px;
        height: 500px;
        background-color: rgba(0, 0, 0, 0.016);
        border-top: 1px solid rgba(27, 31, 35, 0.15);
    }

    .search_bar:hover {
        box-shadow: 3px 5px 22px rgba(27, 31, 35, 0.1);
    }

    label#search_label {
        margin: 15px;
        position: relative;
        top: 10px;
        font-size: large;
        color: #231f20;
    }

    label.label_check, label.label_radio {
        position: relative;
        bottom: 7px;
        left: 3px;
    }

    input#search_input {
        width: 200px;
        margin: 20px 10px 10px;
    }

    input.radio {
        width: 23px;
        height: 23px;
    }

    p#askingfor {
        margin: 15px 15px 0;
        font-size: large;
        position: relative;
        top: -10px;
    }

    .radio-li {
        padding: 0;
        margin: 0;
    }

    .radio-ul {
        margin-top: 0;
    }

    ul {
        margin: 10px;
    }

    li {
        margin-top: 10px;
    }

    #section {
        display: flex;
        flex-wrap: wrap;
        margin: 0 34% 100px 16.35%;
        top: 80px;
        left: 0;
        position: absolute;
    }

    .art {
        position: static;
        padding: 10px;
        background: #fff;
        flex-direction: row;
        flex: 1 1000px;
        border-top: 1px solid rgba(27, 31, 35, 0.1);
        border-image: none 1;
        cursor: pointer;
        overflow: hidden;
        height: 32px; /*220px*/
        width: 50%; /*700px*/
        min-width: 710px;
        transition: height 0.3s ease-out, box-shadow 0.15s ease-in;
        color: #231f20;
    }

    .resized {
        height: 220px;
        /*border-top: 1px solid rgba(242, 96, 101, .4);*/
        border-image: linear-gradient(75deg, var(--mainColor), #6d78ff) 1;
        background-color: rgba(0, 0, 0, .015);
    }

    .art:hover {
        /*background-color: rgba(0, 0, 0, 0.01);*/
        box-shadow: 3px 5px 22px rgba(27, 31, 35, 0.1);
        z-index: 9;
    }

    h2 {
        width: 90%;
        padding-bottom: 10px;
        color: #231f20;
        font-weight: lighter;
    }

    .reg_log {
        position: fixed;
        top: 0;
        right: 0;
        margin: 20px 17% 20px 20px;
    }

    .log {
        display: inline;
        margin-left: 30px;
        cursor: pointer;
    }

    .log:nth-child(3) {
        margin-left: 0;
    }

    span#log, span#reg, span#pro {
        position: relative;
        top: 1%;
    }

    span#log {
        padding: 7px 10px;
        margin-right: -10px;
        color: #231f20;
        background-color: #f8f8f8;
        border-radius: 3px;
        outline: none;
    }

    span#log:hover {
        background-color: rgba(0, 0, 0, 0.06);
    }

    .reg_form {
        position: fixed;
        margin-top: 250px;
        left: 41%;
        width: 18%;
    }

    #form_h {
        text-align: center;
        width: 100%;
    }

    #email_label, #pass_label {
        font-size: larger;
    }

    button#submit, #submit1 {
        position: relative;
        top: 15px;
        left: 60px;
        width: 150px;
        height: 30px;
        background: linear-gradient(75deg, var(--mainColor), #6d78ff);
        color: white;
        cursor: pointer;
        border-radius: 3px;
        border: 0;
        outline: 0;
        animation-duration: 1s;
        transition: background-color 0.4s;
    }

    button#submit:hover, #submit1:hover {
        box-shadow: 3px 3px 12px rgba(27, 31, 35, 0.15);
        /*background-color: rgba(242, 96, 101, 0.85);*/
        background: linear-gradient(-75deg, var(--mainColor), #6d78ff);
    }
</style>
