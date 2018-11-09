refreshTodoList();

function refreshTodoList() {
  var namesHtml = '';
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          var todos = JSON.parse(this.responseText);
          for (var i = 0; i < todos.length; i++) {
            namesHtml += '<li onclick="flipCompleted(this);" '+ (todos[i]['completed'] ? ' class="completed"' : '') +'><span class="listItemContent" id="'+ todos[i]['id'] +'">' + todos[i]['text'] + '</span><button type="button" name="deleteTodo" onclick="deleteTodo(event, this);">X</button></li>';
          }
          document.getElementById("itemList").innerHTML = namesHtml;
      }
  };
  xhttp.open("GET", "https://api.kraigh.net/todos", true);
  xhttp.setRequestHeader("x-api-key","66d24650014ef29878e637f3b1e42641eee0f334d21ecd8a6aa518ba2c1ce37b");
  xhttp.send();
}

function flipCompleted(ele) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      ele.classList.toggle("completed");
    } else if (this.readyState == 4) { //Error
      console.log(this.responseText);
    }
  };
  xhttp.open("PUT", "https://api.kraigh.net/todos/" + ele.childNodes["0"].id);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.setRequestHeader("x-api-key", "66d24650014ef29878e637f3b1e42641eee0f334d21ecd8a6aa518ba2c1ce37b");
  var data = {completed: (ele.classList.contains("completed") ? false : true)};
  xhttp.send(JSON.stringify(data));
}

function deleteTodo(event, ele) {
  event.stopPropagation(); //Used to prevent li onclick function from running
  event.preventDefault();
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById(ele.previousSibling.id).parentElement.remove();
    } else if (this.readyState == 4) { //Error
      console.log(this.responseText);
    }
  };
  xhttp.open("DELETE", "https://api.kraigh.net/todos/" + ele.previousSibling.id);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.setRequestHeader("x-api-key", "66d24650014ef29878e637f3b1e42641eee0f334d21ecd8a6aa518ba2c1ce37b");
  xhttp.send();
}

function addTodo(event) {
  event.preventDefault();
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var todo = JSON.parse(this.responseText);
      var content = '<li><span class="listItemContent" id="'+ todo['id'] +'" onclick="flipCompleted(this);">' + todo['text'] + '</span><button type="button" name="deleteTodo" onclick="deleteTodo(this);">X</button></li>';
      document.getElementById("itemList").innerHTML += content;
      document.getElementById("todoInput").value = "";
    } else if (this.readyState == 4) { //Error
      console.log(this.responseText);
    }
  };
  var data = {text: document.getElementById("todoInput").value};
  xhttp.open("POST", "https://api.kraigh.net/todos");
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.setRequestHeader("x-api-key", "66d24650014ef29878e637f3b1e42641eee0f334d21ecd8a6aa518ba2c1ce37b");
  xhttp.send(JSON.stringify(data));
}
