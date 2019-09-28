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

        <section>
          <el-card class="box-card">
            <div slot="header" class="box-card-header">
              <div class="box-card-header-left">
                <el-avatar icon="el-icon-user-solid" size="small"></el-avatar>
                <span class="box-card-header-name">Оля Бузова</span>
              </div>
              
              <!-- <i class="el-icon-star-on box-card-header-star" /> -->
            </div>
            <div class="text">
              {{text}}
            </div>
          </el-card>
        </section>
      </article>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return { 
      searchText: '',
      isOnlyStarred: false,
      text: 'Такой потрясающий день🙏🏻 Просто самая лучшая перезарядка🤤🥰 В кругу близких, детишек, на свежем воздухе....природа, устрицы, гребешки 🤤🤤🤤 провожали закат 🌅 Наслаждаюсь каждой секундой 🥰 я люблю тебя жизнь ❤'
    }
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
  min-width: 700px;
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
