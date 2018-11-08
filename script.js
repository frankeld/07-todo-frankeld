var namesHtml = '';
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var todos = JSON.parse(this.responseText);
        for (var i = 0; i < todos.length; i++) {
          namesHtml += '<li'+ (todos[i]['completed'] ? ' class="completed"' : '') +'><span class="listItemContent" id="'+ todos[i]['id'] +'" onclick="flipCompleted(this);">' + todos[i]['text'] + '</span><button type="button" name="deleteTodo">X</button></li>';
        }
        document.getElementById("itemList").innerHTML = namesHtml;
    }
};
xhttp.open("GET", "https://api.kraigh.net/todos", true);
xhttp.setRequestHeader("x-api-key","66d24650014ef29878e637f3b1e42641eee0f334d21ecd8a6aa518ba2c1ce37b");
xhttp.send();
function flipCompleted(ele) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById(ele.id).parentElement.classList.toggle("completed");
    } else if (this.readyState == 4) { //Error
      console.log(this.responseText);
    }
  };
  xhttp.open("PUT", "https://api.kraigh.net/todos/" + ele.id);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.setRequestHeader("x-api-key", "66d24650014ef29878e637f3b1e42641eee0f334d21ecd8a6aa518ba2c1ce37b");
  var data = {completed: (document.getElementById(ele.id).parentElement.classList.contains("completed") ? false : true)};
  xhttp.send(JSON.stringify(data));
}
// var xhttp = new XMLHttpRequest();
// xhttp.onreadystatechange = function() {
//   if (this.readyState == 4 && this.status == 200) {
//     var todo = JSON.parse(this.responseText);
//     var itemList =document.getElementById("itemList");
//     itemList.appendChild(document.createTextNode("bar"));
//   } else if (this.readyState == 4) { //Error
//     console.log(this.responseText);
//   }
// };
//
// xhttp.open("POST", "https://api.kraigh.net/todos", true);
// xhttp.setRequestHeader("Content-type", "application/json");
// xhttp.setRequestHeader("x-api-key", "66d24650014ef29878e637f3b1e42641eee0f334d21ecd8a6aa518ba2c1ce37b");
// xhttp.send(JSON.stringify(data));
