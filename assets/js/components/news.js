Vue.component('news', {
  props: ['news'],
  template: '<div class="article"><div class="title"><h1>{{ news.title }}</h1> <div class="small"><span class="author">{{ news.author }}</span><span class="time">{{news.time}}</span></div></div><img :src="news.cover"><div class="content"><p :id="news.domId">{{ news.content }}</p></div></div>'
})
