<template>
    <div>
        <sheader :logged="false"/>
        <div id="login">
            <h1 id="form_h">Регистрация аккаунта</h1>
            <form class="reg_form" method="post" action="">
                <div class="mail_container">
                    <label id="email_label" for="email">Электронная почта:</label><br/>
                    <input id="email" type="email" name="login" placeholder="e-mail@domain.com" required="required"/>
                </div>
                <div class="pass_container">
                    <label id="pass_label" for="pass">Пароль:</label><br/>
                    <input id="pass" type="password" name="password" pattern="(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}"
                           title="8-32 латинских буквы(минимум одна заглавная и одна строчная) и цифры"
                           placeholder="qwerty" required="required"/>
                    <img id="visible" src="../assets/visible.svg" alt="visible"/>
                </div>
                <button id="submit" type="submit">Подтвердить!</button>
            </form>
            <p id="errCode"></p>
        </div>
    </div>
</template>

<script>
    import Sheader from "@/components/sheader";
    export default {
        name: "signup",
        components: {Sheader}
    }
</script>

<style scoped>

</style>
