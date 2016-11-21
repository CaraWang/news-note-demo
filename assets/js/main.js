firebase.initializeApp(config);
var path = firebase.database().ref('/marks');

var app = new Vue({
  el: '#app',
  data: {
    data: news,
    marks: [
      {
	member: "啦速燙",
	newsId: 1,
	mark: "我可以確定的是，未來 30 年我們仍會專注在實體積木的本業上。"
      }
    ]
  },
  created: function () {
/*
    path.limitToLast(30).once('value').then(function(snapshot) {
      this.marks.push(snapshot);
      this.drawMark()
    }.bind(this))
*/
  },
  mounted: function () {
      document.getElementById('content-1').addEventListener('mouseup', function () {
	var select = this.getSelection()
	if (select.length < 6) {
	  alert('字詞長度需要大於 5')
	} else {
	  var data = {
	    member: "Cara",
	    newsId: 1,
	    mark: select
	  }
	  this.marks.push(data)
	  //this.putToFirebase()
	  this.drawMark()
	}
      }.bind(this))
      this.drawMark()
  },
  methods: {
    drawMark: function () {
      content = document.getElementById('content-1').textContent + ''
      newContent = content
      for (var item in this.marks) {
	mark = this.marks[item]
	newText = '<mark title="' + mark.member + '">' + mark.mark + '</mark>'
	newContent = newContent.replace(mark.mark, newText)
      }
      document.getElementById('content-1').innerHTML = newContent
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
    putToFirebase: function () {
      path.put(this.marks);
    }
  }
})
