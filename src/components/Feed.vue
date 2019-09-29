<template>
  <div>
    <header class="header">БЮРО</header>
    <main>
      <article>
        <section class="section-search-button">
          <el-input
            class="search-input"
            placeholder="Введите имя"
            prefix-icon="el-icon-search"
            v-model="searchText"
          ></el-input>
        </section>
        
        <!-- <section class="section-only-starred-filter">
          <span>Только избранные</span>
          <el-switch class="only-starred-switch" v-model="isOnlyStarred" />
        </section> -->

        <section style="flex-direction: column">
          <el-card class="box-card" v-for="(post, index) in posts" :key="index">
            <div slot="header" class="box-card-header">
              <div class="box-card-header-left">
                <el-avatar :src="post.avatarUrl" size="small"></el-avatar>
                <span class="box-card-header-name">{{post.firstName}} {{post.lastName}}</span>
              </div>
              
              <!-- <i class="el-icon-star-on box-card-header-star" /> -->
            </div>
            <template v-if="(post.text.length > 150 || post.images.length) && !isOpen">
              <div class="text" v-linkified>
                {{post.text.slice(0, 150)}}
                <el-button type="text" @click="isOpen = true">Показать больше</el-button>
              </div>
            </template>

            <template v-if="(post.text.length > 150 || post.images.length) && isOpen">
              <div class="text" v-linkified>
                {{post.text}}
                <el-button type="text" @click="isOpen = false">Скрыть</el-button>
              </div>
              <div>
                <img v-for="(image, index) in post.images" :key="index" :src="image" width="150px"/>
              </div>
            </template>

            <template v-if="post.text.length <= 150 && !post.images.length">
              <div class="text">
                {{post.text}}
              </div>
            </template>
          </el-card>
        </section>
      </article>
    </main>
  </div>
</template>

<script>
// const posts = [{
//   id: 1,
//   firstName: "Ольга",
//   lastName: "Бузова",
//   avatarUrl: "https://sun9-60.userapi.com/c850324/v850324431/1dffa8/EfHhV4TGJHc.jpg?ava=1",
//   text: "Такой потрясающий день🙏🏻 Просто самая лучшая перезарядка🤤🥰 В кругу близких, детишек, на свежем воздухе....природа, устрицы, гребешки 🤤🤤🤤 провожали закат 🌅 Наслаждаюсь каждой секундой 🥰 я люблю тебя жизнь ❤",
//   likes: 2500,
//   postUrl: "https://vk.com/olgabuzova?w=wall32707600_633629",
//   images: ["https://sun9-69.userapi.com/c543105/v543105535/50cb4/Z3KyQg6xooo.jpg",
//   "https://sun9-6.userapi.com/c543105/v543105156/534d6/2seiWnyh7Lo.jpg"
//   ],
// }]
               
import usersApi from '../api/users';
export default {
  data() {
    return { 
      posts: [],
      isOpen: false,
      searchText: '',
      isOnlyStarred: false,
      text: 'Такой потрясающий день🙏🏻 Просто самая лучшая перезарядка🤤🥰 В кругу близких, детишек, на свежем воздухе....природа, устрицы, гребешки 🤤🤤🤤 провожали закат 🌅 Наслаждаюсь каждой секундой 🥰 я люблю тебя жизнь ❤',
      textList: [
        'Такой потрясающий день🙏🏻 Просто самая лучшая перезарядка🤤🥰 В кругу близких, детишек, на свежем воздухе....природа, устрицы, гребешки 🤤🤤🤤 провожали закат 🌅 Наслаждаюсь каждой секундой 🥰 я люблю тебя жизнь ❤',
       'Владивосток 🙏🏻 Родина моей мамочки.... Здесь мой дедушка ходил в океан🚢 познакомился с бабушкой, и здесь же родилась моя мамуля❤ Жили на Косом переулке😙и мама пешком сама в 7 лет шла до 13 школы, где и училась, пока не переехали в Клайпеду ...Я жду вас всех сегодня в Палладе на моем шоу «Принимай меня» 🙌🏻 Новые песни, новая программа...Мы на месте 🚀 Вот она я👸🏻 Кто сегодня с нами? Пишите 🥰', 
        'Мои дорогие, поздравляю вас с великим и светлым праздником Рождества Пресвятой Богородицы🌹🌹🌹Хочу пожелать вам счастья и веры в чудеса☀🤲🏻 Я верю в то, что добро всегда побеждает, что искренняя молитва творит чудеса и что нет ничего невозможного для тех, кто верит... Пусть в вашем сердце царит мир и любовь, и Богородица хранит вас от всего плохого. Она всех слышит и всем помогает! Я благодарна Небесам за всё, что происходит в моей жизни и верю, что самое главное чудо ещё впереди 🙏🏻♾... А у вас случались чудеса? Поделитесь своей историей🙏🏼 Что считаете главным чудом в своей жизни?',
        'Все женщины ведут в туманы...♾ #вот_она_я 🧝‍♀',
        'В это воскресенье на СТС премьера шоу #ФортБоярд с моим участием💪🏻💥'
      ]
    }
  },
  created() {
    usersApi.fetchPosts().then(({data}) => {
      this.posts = data;
    });

  }
}
</script>

<style scoped>
header {
  display: flex;
  justify-content: center;
  margin: 8px 0;
  color: #2c3e50;
  font-size: x-large;
}

main {
  display: flex;
  justify-content: center;
}

article {
  max-width: 700px;
  display: flex;
  flex-direction: column;
}

section {
  display: flex;
  margin: 8px 0;
}

.section-search-button {
  justify-content: center;
}

.only-starred-switch {
  margin: 0 8px;
}

.box-card {
  flex: 1;
  margin-bottom: 10px;
}

.box-card-header {
  display: flex;
  justify-content: space-between;
}

.box-card-header-left {
  display: flex;
  align-items: center;
}

.box-card-header-name {
  padding: 0 10px;
}

.box-card-header-star {
  font-size: 30px;
  cursor: pointer;
  color: #ffcf00ed;
}

.text {
  font-size: 14px;
}
</style>
