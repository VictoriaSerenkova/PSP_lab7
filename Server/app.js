var WebSocketServer = new require('ws');

// подключённые клиенты
var clients = {};
var tableReserve = [3, 7]

// WebSocket-сервер на порту 8081
var webSocketServer = new WebSocketServer.Server({
  port: 8081
});
webSocketServer.on('connection', function(ws) {

  var id = Math.random();
  clients[id] = ws;
  console.log("новое соединение " + id);
  for (var key in clients) {
    clients[key].send(tableReserve.join(" "));
  }

  ws.on('message', function(message) {
    const mess = "" + message
    console.log('получено сообщение ' + mess);
    tableReserve = tableReserve.concat(mess.split(" "))

    for (var key in clients) {
      clients[key].send(tableReserve.join(" "));
    }
  });

  ws.on('close', function() {
    console.log('соединение закрыто ' + id);
    delete clients[id];
  });

});