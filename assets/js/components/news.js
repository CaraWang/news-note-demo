Vue.component('news', {
  props: ['news'],
  template: '<div class="article"><h1>{{ news.title }} <small>{{ news.author }} {{news.time}}</small></h1><p :id="news.domId">{{ news.content }}</p></div>'
})
