<template>
  <section class="page">
    <div>
      <h1 class="title"><nuxt-link to="/">Fukuoka.go</nuxt-link></h1>
      <p class="subtitle">A 𝝣Gopher Community in Fukuoka </p>
      <p class="description">福岡のGolangコミュニティです。初心者から熟練者まで集まってわいわいしましょう。</p>

      <div class="container">
        <div class="events item">
          <h2>Events</h2>
          <p>４ヶ月に１度のペースでイベントを開催しています。イベント参加は<a href="https://fukuokago.connpass.com/" target="_blank">Connpass</a>からお申し込みください。</p>
          <ul>
            <li v-for="event in events">
                {{ event.date }}  -- <nuxt-link :to="`/events/${event.id}`"> {{ event.title }} </nuxt-link>
            </li>
          </ul>
        </div>

        <div v-for="tweet in tweets" class="tweet item">
          <blockquote class="twitter-tweet" data-lang="en" data-link-color="#666" width="350"><a :href=tweet.link></a></blockquote>
        </div>
        <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
      </div>

      <div class="links">
        <a href="https://github.com/fukuokago" target="_blank" class="button--grey">GitHub</a>
        <a href="https://slack.fukuokago.tech" target="_blank" class="button--grey">Slack</a>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  async asyncData ({ app }) {
    const events = await app.$axios.$get('/events')
    const tweets = await app.$axios.$get('/tweets')
    return { events: events, tweets: tweets }
  }
}
</script>

<style>
.page {
  align-items: center;
  text-align: center;
  background-image: url('/fukuoka-gopher-ramen.png');
  background-repeat: no-repeat;
  background-position: center 30px;
  background-size: 20%;
  padding-top: 17%;
  padding-bottom: 30px;
}

.title {
  font-family: 'Roboto Slab', serif;
  display: block;
  font-size: 4em;
  color: #000;
}

.title a {
  border-bottom: none;
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
  padding-bottom: 40px;
}

.container {
  margin: auto;
  overflow: hidden;
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(328px, 1fr));
  padding: 0 30px 30px;
}

.events {
  text-align: left;
  width: 328px;
  border-radius: 5px;
  padding: 18px;
  border: 1px solid #000;
  margin: 10px auto 20px;
}

.events h2 {
  font-weight: bold;
  padding: 0 0 18px;
}

.events p {
  font-size: 12px;
  line-height: 1.5;
  padding-bottom: 20px;
}

.events ul {
  list-style-type: none;
  padding: 0;
  padding-right: 20px;
  padding-bottom: 10px;
  line-height: 1.7;
}

.tweet {
  width: 350px;
  margin: 0 auto;
  padding-right: 20px;
  padding-bottom: 20px;
}

.links {
  padding-top: 15px;
}

@media screen and (max-width:450px) {
  .page {
    background-position: center 20px;
    background-size: 50%;
    padding-top: 40%;
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

  .container {
    margin: 0;
    display: block;
  }

  .tweet {
    width: 100%;
    float: none;
    margin: 0 auto;
    padding-right: 0;
  }

  .links a {
    margin-bottom: 10px;
  }
}
</style>

