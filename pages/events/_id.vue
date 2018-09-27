<template>
  <div>
    <h1 class="logo"><nuxt-link to="/">Fukuoka.go</nuxt-link></h1>
    <section class="event">
      <h2 class="event-title">{{ event.title }}</h2>
      <p class="event-date">{{ event.date }}</p>
      <p class="event-link"><a :href=event.link>{{ event.link }}</a></p>
      <div class="content" v-html="event.content"></div>
    </section>
    <p class="bottom-nav"><nuxt-link to="/">Back</nuxt-link></p>
  </div>
</template>

<script>
export default {
  async asyncData ({ app, params }) {
    const events = await app.$axios.$get('/api/events')
    let data = {}
    events.forEach(event => {
      if (event.id === params.id) {
        data = event
      }
    })
    return { event: data }
  }
}
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

.content {
  font-size: 12px;
  margin-top: 30px;
}

.content h1 {
  padding: 20px 0;
}

.content h2 {
  padding: 20px 0;
}

.bottom-nav {
  padding-top: 30px;
  padding-bottom: 30px;
  text-align: center;
}
</style>

