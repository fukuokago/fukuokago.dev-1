<template>
  <section class="container">
    <div>
      <h1 class="title">Fukuoka.go</h1>
      <p class="subtitle">A 𝝣Gopher Community in Fukuoka </p>
      <h2 class="description">福岡のGolangコミュニティです。初心者から熟練者まで集まってわいわいしましょう</h2>
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

<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-image: url('~/static/fukuoka-gopher-ramen.png');
  background-repeat: no-repeat;
  background-position: center 20px;
  background-size: 20%;
}

.title {
  font-family: 'Roboto Slab', serif;
  display: block;
  font-size: 4em;
  color: #000;
}

.subtitle {
  font-size: 24px;
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

.links {
  padding-top: 15px;
}
</style>

