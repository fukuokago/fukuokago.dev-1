<template>
  <div>
    <h1 class="logo"><nuxt-link to="/">Fukuoka.go</nuxt-link></h1>
    <section class="event">
      <h2 class="event-title">{{ event.title }}</h2>
      <p class="event-date">{{ event.date }}</p>
      <p class="event-link"><a :href=event.link>{{ event.link }}</a></p>
      <div class="content" v-html="event.content"></div>
    </section>
    <p class="bottom-nav"><nuxt-link to="/" class="button--grey">Home</nuxt-link></p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  async asyncData({ params, $axios }: any) {
    const events = await $axios.$get('/.netlify/functions/events')
    let data = {}
    events.forEach((event: any) => {
      if (event.id === params.id) {
        data = event
      }
    })
    return { event: data }
  }
})
export default class PageEvent extends Vue {}
</script>

<style>
.logo {
  font-family: 'Roboto Slab', serif;
  display: block;
  width: 300px;
  margin: 0 auto 10px;
  font-size: 2em;
  color: #000;
  text-align: center;
  padding: 30px 0 30px 50px;
  background-image: url('/fukuoka-gopher-ramen.png');
  background-repeat: no-repeat;
  background-position: left center;
  background-size: 70px;
}

.logo a {
  border-bottom: none;
}

.event {
  padding: 20px 30px;
  line-height: 1.5;
}

.event-title {
  font-size: 2.8em;
  font-weight: bold;
}

.event-date {
  font-size: .8em;
  font-weight: bold;
  color: #888;
}

.event-link {
  font-size: .8em;
  font-weight: bold;
  color: #888;
  padding-bottom: 20px;
}

.event-link a {
  color: #888;
  border-color: #888;
}

.content {
  font-size: 13px;
  margin-top: 30px;
  line-height: 1.5;
}

.content h1 {
  padding: 20px 0;
}

.content h2 {
  padding: 20px 0;
}

.content h3 {
  padding: 10px 0 15px;
}

.content table {
  margin: 20px 0;
}

.content th {
  border-top: 1px solid #999;
  border-bottom: 1px solid #999;
  padding: 5px 10px;
}

.content td {
  border-bottom: 1px solid #999;
  padding: 5px 10px;
}

.bottom-nav {
  padding-top: 30px;
  padding-bottom: 30px;
  text-align: center;
}
</style>

