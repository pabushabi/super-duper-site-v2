<template>
    <div>
        <sheader :logged="true"/>
        <h1 id="h-prof">Profile</h1>
        <div class="prof-inf"><img src="../assets/account.svg">
            <p id="hello">Привет,</p>
            <p id="yourma">Ваша почта: </p>
        </div>
        <div class="form-res">
            <div id="change_back" @click="resume = !resume">
                <p class="change" v-if="!resume">Вакансия</p>
                <p class="change" v-if="resume">Резюме</p>
            </div>
            <form class="resume-form" action="" method="post" v-if="!resume">
                <label><span>Имя:</span>
                    <input id="i-name" type="text" maxlength="19" required placeholder="Иван" v-model="profile.Name">
                </label><br>
                <label><span>Фамилия:</span>
                    <input id="i-secname" type="text" maxlength="10" required placeholder="Иванов"
                           v-model="profile.Second">
                </label><br>
                <label><span>Дата рождения:</span>
                    <input class="inp-num" id="i-date" type="date" min="1900-01-01" max="" required
                           v-model="profile.Birthdate">
                </label><br>
                <label><span id="bug">Высшее образование</span>
                    <input class="radio" id="i-ed" type="checkbox" v-model="profile.Education">
                </label><br>
                <label><span>Стаж работы:</span>
                    <input class="inp-num" id="i-ex" type="number" min="0" max="50" value="0"
                           required v-model="profile.Experience">
                </label><br>
                <label><span>Специализация:</span>
                    <select id="select-spec" style="width: 150px; height: 33px;" required
                            v-model="profile.Specialization">
                        <option value="Программист">Программист</option>
                        <option value="Инженер">Инженер</option>
                        <option value="Фотограф">Фотограф</option>
                        <option value="Артист">Артист</option>
                        <option value="Учёный">Учёный</option>
                    </select>
                </label><br>
                <label><span>Телефон:</span>
                    <input id="i-tel" type="tel" pattern="\+[0-9]{1,3}\([0-9]{3,4}\)[0-9]{3}-[0-9]{4}"
                           maxlength="19" placeholder="+1(999)999-9999" v-model="profile.Phone">
                </label><br>
                <label><span>Предпочитаемый режим работы:</span>
                    <select id="time-mode" style="width: 200px; height: 33px;" required v-model="profile.Time">
                        <option value="Полный день">Полный день</option>
                        <option value="Частичная занятость">Частичная занятость</option>
                        <option value="Плавающий график">Плавающий график</option>
                        <option value="Удалённая работа">Удалённая работа</option>
                    </select>
                </label><br>
                <label><span>Желаемая зароботная плата:</span>
                    <input class="inp-num" id="i-payb" type="number" min="0" max="9000000" value="0" step="1000"
                           required v-model="profile.Pay_b"><span>-</span>
                    <input class="inp-num" id="i-payt" type="number" min="0" max="9000000" value="0" step="1000"
                           required v-model="profile.Pay_t">
                </label><br>
                <label><span>О себе:</span>
                    <textarea id="i-about" required placeholder="Коротко о себе" v-model="profile.About"></textarea>
                </label><br><span id="error">Все поля должны быть заполнены!</span>
                <button id="submit" type="button" @click.prevent="resume_submit">Сохранить</button>
            </form>

            <form class="vac-form" action="" method="post" v-if="resume">
                <label><span>Название организации:</span>
                    <input id="v-name" type="text" maxlength="40" required placeholder="Рога и копыта"
                           v-model="vacancy.Name">
                </label><br>
                <label><span>Желаемый возраст:</span>
                    <input class="inp-num" id="v-date" type="number" min="15" max="100" required
                           placeholder="25" v-model="vacancy.Age">
                </label><br>
                <label><span id="bug1">Высшее образование</span>
                    <input class="radio" id="v-ed" type="checkbox" v-model="vacancy.Education">
                </label><br>
                <label><span>Желаемый стаж работы:</span>
                    <input class="inp-num" id="v-ex" type="number" min="0" max="70" required
                           placeholder="10" v-model="vacancy.Experience">
                </label><br>
                <label><span>Желаемая специализация:</span>
                    <select id="select-vac" style="width: 150px; height: 33px;" required
                            v-model="vacancy.Specialization">
                        <option value="Программист">Программист</option>
                        <option value="Инженер">Инженер</option>
                        <option value="Фотограф">Фотограф</option>
                        <option value="Артист">Артист</option>
                        <option value="Учёный">Учёный</option>
                    </select>
                </label><br>
                <label><span>Телефон:</span>
                    <input id="v-tel" type="tel" pattern="\+[0-9]{1,3}\([0-9]{3,4}\)[0-9]{3}-[0-9]{4}"
                           maxlength="19" placeholder="+1(999)999-9999" v-model="vacancy.Phone">
                </label><br>
                <label><span>Предпочитаемый режим работы:</span>
                    <select id="time" style="width: 200px; height: 33px;" required v-model="vacancy.Time">
                        <option value="Полный день">Полный день</option>
                        <option value="Частичная занятость">Частичная занятость</option>
                        <option value="Плавающий график">Плавающий график</option>
                        <option value="Удалённая работа">Удалённая работа</option>
                    </select>
                </label><br>
                <label><span>Желаемая зароботная плата:</span>
                    <input class="inp-num" id="v-payb" type="number" min="0" max="9000000" value="0" step="1000"
                           required v-model="vacancy.Pay_b"><span>-</span>
                    <input class="inp-num" id="v-payt" type="number" min="0" max="9000000" value="0" step="1000"
                           required v-model="vacancy.Pay_t">
                </label><br>
                <label><span>Об организации (дополнительные требования):</span>
                    <textarea id="v-about" required placeholder="Коротко об организации" v-model="vacancy.About"></textarea>
                </label><br><span id="error1">Все поля должны быть заполнены!</span>
                <button id="submit1" type="button" @click="vac_submit" :style="Stylys">Сохранить</button>
            </form>
        </div>

    </div>
</template>

<script>
    import Sheader from "@/components/sheader";

    export default {
        name: "profile",
        components: {Sheader},
        data() {
            return {
                resume: false,
                Stylys: {
                    color: "green"
                },
                profile: {
                    Name: "",
                    Second: "",
                    Birthdate: "",
                    Education: false,
                    Experience: 0,
                    Specialization: "",
                    Phone: "",
                    Time: "",
                    Pay_b: 0,
                    Pay_t: 0,
                    About: ""
                },
                vacancy: {
                    Name: "",
                    Age: 0,
                    Education: false,
                    Experience: 0,
                    Specialization: "",
                    Phone: "",
                    Time: "",
                    Pay_b: 0,
                    Pay_t: 0,
                    About: ""
                },

            }
        },
        methods: {
            resume_submit() {

            },
            vac_submit() {

            }
        }
    }
</script>

<style scoped>
    .form-res {
        width: 700px;
        position: absolute;
        top: 130px;
        right: 17%;
        margin-bottom: 50px;
        padding: 10px;
        background-color: rgba(0, 0, 0, 0.016);
        border-top: 1px solid #BFBFBF;
    }
    #change_back {
        cursor: pointer;
        padding: 10px;
        position: absolute;
        right: 2%;
        top: 1%;
        border-radius: 4px;
    }

    .change {
        font-size: large;
        background: linear-gradient(75deg, var(--mainColor), #6d78ff);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    #change_back:hover {
        background-color: rgba(0, 0, 0, .025);
    }
    .resume-form > label > span, .vac-form > label > span {
        padding: 10px;
    }

    .resume-form > label > textarea, .vac-form > label > textarea {
        width: 650px;
        height: 250px;
        border-radius: 3px;
        margin: 10px;
        font-size: 16px;
        outline: 0;
        padding: 8px;
        resize: none;
    }

    .resume-form > #submit, .vac-form > #submit1 {
        margin: 0;
        position: relative;
        top: -3px;
        left: 500px;
    }

    .vac-form {
        /*display: none;*/
    }
    .prof-inf {
        padding: 10px;
        position: fixed;
        top: 130px;
        left: 17%;
        background-color: rgba(0, 0, 0, 0.016);
        border-top: 1px solid #BFBFBF;
    }

    .prof-inf > p {
        margin-bottom: 20px;
    }

    .prof-inf > img {
        position: relative;
        top: 0;
        left: 0;
        width: 180px;
        height: 180px;
        z-index: 10;
        border-radius: 3px;
    }
    .inp-num {
        width: 150px;
    }

    select {
        padding-left: 8px;
        padding-right: 8px;
        margin-top: 5px;
        margin-bottom: 5px;
        width: 150px;
        height: 30px;
        border-radius: 2px;
        font-size: 16px;
        outline: 0;
    }

    select:focus {
        /*border-color: var(--mainColor);*/
        border-image: linear-gradient(75deg, var(--mainColor), #6d78ff) 1;
    }

    select :nth-child(2n) {
        background-color: #f2f2f2;
    }
    #h-prof {
        top: 80px;
        position: absolute;
    }

    #bug, #bug1 {
        position: relative;
        top: -7px;
    }
    #error, #error1 {
        color: red;
        position: absolute;
        left: 15vw;
        display: none;
    }
</style>
