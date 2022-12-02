// создать подключение
var socket = new WebSocket("ws://localhost:8081");

let children = "";

let tables = document.getElementById("tables")

for(i = 0; i < 20; i++) {
    let table = document.createElement("div");
    table.className = "table";
    table.innerText = i+1
    table.id = i+1;
    table.onclick = function() {
        if(!table.classList.contains("reserve")) table.classList.toggle('select')
    }
    tables.append(table);
}

// обработчик входящих сообщений
socket.onmessage = function(event) {
  var incomingMessage = event.data;
  const ids = incomingMessage.length? incomingMessage.split(" ") : [];
  ids.forEach(element => {
    if(!document.getElementById(element).classList.contains("reserve")) {
      document.getElementById(element).classList.remove("select")
      document.getElementById(element).classList.add("reserve")
    }
  });
};


function reserve() {
    const selected = Array.from(document.getElementsByClassName("select"));
    //const isAbleToSelect = selected.every(table => !table.classList.contains("reserve"))
    //if(isAbleToSelect) {
        const ids = selected.map(elem => elem.id)
        return socket.send(ids.join(" "))
    //}
    //return false;
}