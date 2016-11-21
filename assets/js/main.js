firebase.initializeApp(config);
var path = firebase.database().ref('/marks');

var app = new Vue({
  el: '#app',
  data: {
    data: news,
    marks: [],
    name: '匿名使用者'
  },
  created: function () {
    path.limitToLast(30).once('value').then(function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
	this.marks.push(childSnapshot.val());
      }.bind(this))
      this.drawMark()
    }.bind(this))
  },
  mounted: function () {
      document.getElementById('content-1').addEventListener('mouseup', function () {
	var select = this.getSelection()
	if (select.length < 6) {
	  alert('字詞長度需要大於 5')
	} else {
	  var selectRange = this.getSelectRange(select)
	  var data = {
	    member: this.name,
	    newsId: 1,
	    mark: selectRange
	  }
	  this.marks.push(data)
	  this.pushToFirebase(data)
	  this.drawMark()
	}
      }.bind(this))
      this.drawMark()
  },
  watch: {
    name: function (name) {
      this.name = name
    }
  },
  methods: {
    drawMark: function () {
      content = document.getElementById('content-1').textContent + ''
      newContent = content
      for (var item in this.marks) {
	mark = this.marks[item]
	originText = content.substring(mark.mark[0], mark.mark[1])
	newText = '<mark title="' + mark.member + '">' + originText + '</mark>'
	newContent = newContent.replace(originText, newText)
      }
      document.getElementById('content-1').innerHTML = newContent
    },
    getSelectRange: function (sentence) {
      content = document.getElementById('content-1').textContent + ''
      start = content.indexOf(sentence)
      end = start + sentence.length
      return [start, end]
    },
    getSelection: function () {
      var select = '';
      if (window.getSelection) {
	  select = window.getSelection();
      } else if (document.getSelection) {
          select = document.getSelection();
      } else if (document.selection) {
	  select = document.selection.createRange().text;
      } 

      return select.toString()
    },
    pushToFirebase: function (data) {
      path.push(data);
    }
  }
})
