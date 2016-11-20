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
	mark: [20, 51]
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
	var data = {
	  member: "Cara",
	  newsId: 1,
	  mark: [select.start, select.end]
	};
	this.marks.push(data)
	//this.putToFirebase()
	this.drawMark()
      }.bind(this))
      this.drawMark()
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
    getSelection: function () {
      var select = '';
      if (window.getSelection) {
	  select = window.getSelection();
      } else if (document.getSelection) {
          select = document.getSelection();
      } else if (document.selection) {
	  select = document.selection.createRange().text;
      } 

      //var start = select.baseOffset
      //var end = select.extentOffset
      var start = select.getRangeAt(0).startOffset
      var end = select.getRangeAt(0).endOffset
      if (end < start) {
	var tmp = start
        start = end
	end = tmp
      }

      result = {
	start: start,
	end: end
      }
      return result;
    },
    putToFirebase: function () {
      path.put(this.marks);
    }
  }
})
