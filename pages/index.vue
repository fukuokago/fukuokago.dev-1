<template>
  <section class="container">
    <div>
      <h1 class="title">Fukuoka.go</h1>
      <p class="subtitle">A 𝝣Gopher Community in Fukuoka </p>
      <h2 class="description">福岡のGolangコミュニティです。初心者から熟練者まで集まってわいわいしましょう。</h2>
      <ul class="events">
        <li v-for="event in events">
          {{ event.date }} 
          <a :href="event.link" target="_blank"> {{ event.title }} </a>
        </li>
      </ul>
      <div class="links">
        <a
          href="https://fukuokago.connpass.com/"
          target="_blank"
          class="button--grey">Connpass</a>
        <a
          href="https://github.com/fukuokago"
          target="_blank"
          class="button--grey">GitHub</a>
        <a
          href="https://slack.fukuokago.tech"
          target="_blank"
          class="button--grey">Slack</a>
        <a
          href="https://twitter.com/hashtag/fukuokago"
          target="_blank"
          class="button--grey">Twitter</a>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  async asyncData ({ app }) {
    const events = await app.$axios.$get('/api/events')
    return { events: events }
  }
}
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-image: url('/fukuoka-gopher-ramen.png');
  background-repeat: no-repeat;
  background-position: center 30px;
  background-size: 20%;
}

.title {
  font-family: 'Roboto Slab', serif;
  display: block;
  font-size: 4em;
  color: #000;
}

.subtitle {
  font-size: 22px;
  color: #000;
  padding-bottom: 15px;
  letter-spacing: 2px;
}

.description {
  font-size: 17px;
  color: #000;
  padding-top: 30px;
  padding-bottom: 15px;
}

.events {
  list-style-type: none;
  text-align: left;
  padding: 20px 30px 10px;
  line-height: 1.5;
}

.events a {
  color: #000;
}

.links {
  padding-top: 15px;
}

@media screen and (max-width:450px) {
  .container {
    background-position: center 20px;
    background-size: 50%;
  }

  .title {
    font-size: 3em;
  }

  .subtitle {
    font-size: 16px;
    padding-bottom: 15px;
    letter-spacing: 1px;
  }

  .description {
    font-size: 13px;
    padding: 20px 10px 10px;
  }

  .links a {
    margin-bottom: 10px;
  }
}
</style>

