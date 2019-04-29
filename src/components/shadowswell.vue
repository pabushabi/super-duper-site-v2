<template>
  <div class="content">
    <header>
      <a href="/" class="logo">Shadowswell</a>
    </header>
    <div id="main">
      <div class="search_bar">
        <form class="search_form" method="post" action="/" name="search">
          <label id="search_label" for="search_input">Поиск {{searchReq}}</label>
          <input id="search_input" type="search" name="search_req" autocomplete="off" placeholder="Введите запрос" v-model="searchReq"/>
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
    </div>
    <section id="section">
      <article  v-for="(item, index) in items" :key="index" :id=index ref="art" :class="['art', {resized : currentArt === index}]"
      @click="currentArt = currentArt === index ? -1 : index">
        <h2>{{item}}</h2>
        <p class="text">{{text}}</p>
      </article>

    </section>
  </div>
</template>

<script>
  export default {
    name: "shadowswell",
    data() {
      return {
        currentArt: -1,
        title: "test",
        text: "lorem ipsum dolor sit amet",
        // isResized: false,
        items: [
          "Колосс Ростовский, Программист",
          "Якоб Орещкин, Инжинер",
          "Вася Пупкин, Программист",
          "Артур Булочкин, Фотограф",
          "Акакий Акакьев, Программист",
          "Петр Левый, Программист",
          "Антон Чехов, Фотограф"
        ],
        searchReq: '',
        checks: [],
        checkVac: '',
      }
    },
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
      let xhr = new XMLHttpRequest();
      xhr.open("POST", "/", true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      let data = JSON.stringify({type: "articles"});
      xhr.send(data);
      xhr.addEventListener("load", () => {
        // if (xhr.response === "" || xhr.response === undefined || xhr.response === null)
          // $("#error-art").css("visibility", "visible");
        console.log(xhr.response);
        // let {da1, da2} = JSON.parse(xhr.response);
        // addRes(da1);
        // addVac(da1, da2);
      });
    },
    methods: {
      // createAnim(index) {
        // if (!this.$refs.art[index].class === "art")
        //   this.$refs.art[index].className += ' resized';
        // else this.$refs.art[index].className = 'art';
        // this.isResized = !this.isResized;
      // },
      sendReq() {
        let req = JSON.stringify({type: "search", search_req: this.searchReq, radio: this.checkVac, check: this.checks});
        console.log(req);
        // let promise = fetch('http://127.0.0.1:200/', {
        //   method: "POST",
        //   body: req,
        // })
        //   .then((res) => {
        //     console.log(res)
        //   })
        //   .catch((err) => {
        //     console.log(err)
        //   });
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "localhost:200/", true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(req);
        // xhr.addEventListener("load", () => {
          // $(".art").remove();
          // if (xhr.response === "" || xhr.response === undefined || xhr.response === null)
          //   $("#error-art").css("visibility", "visible");
          // let {da1, da2} = JSON.parse(xhr.response);
          // addRes(da1);
          //
          // addVac(da1, da2);
        // });
      }
    }
  }
</script>

<style scoped>
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
    width: 100%;
    height: 60px;
    background-color: white;
    border-bottom: 1px rgba(27, 31, 35, 0.1) solid;
    z-index: 10;
  }

  a.logo {
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
    border-top: 1px solid var(--mainColor);
    /*border-image: linear-gradient(75deg, var(--mainColor), #6d78ff);*/
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
</style>
