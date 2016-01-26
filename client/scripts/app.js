//$.ajax("https://api.parse.com/1/classes/chatterbox)");

var app = {
  server: "https://api.parse.com/1/classes/chatterbox",
  friends: [],
  currentUser: 'anonymous',
  messages: [],
  allRooms: [],
  currentRoom: 'default'
};

app.escape = function (str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
};

// Initialize event listeners and get messages from server.
app.init = function(){

  // Get messages from server;
  app.fetch();

  // Listen for click on a username to add friend
  $('.username').off();
  $('.username').on('click', function(){
    var friend = $(this).text();
    app.addFriend(friend);
  });

  // Listen for submission of message text
  $('.submit').off();
  $('.submit').submit(function(e){
    e.preventDefault();
    app.handleSubmit();
  }); 

  // Listen for submission of new room
  $('#newRoom').off();
  $('#newRoom').submit(function(e){
    e.preventDefault();
    var addingRoom = $('#addNewRoom').val();
    app.addRoom(addingRoom);
  }); 

  // Listen for room change
  $('#roomSelect').off();
  $('#roomSelect').change(function(e){
    e.preventDefault();
    app.currentRoom = $('#roomSelect').val();
    app.clearMessages();
    app.displayMessages();
  }); 
   
};

app.send = function(message){
  $.ajax({
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent. Data: ', data);
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message. Error: ', data);
    }
  });
};

// var sampleMessage = {
//     objectId: "sOdhpd1u9z",
//     createdAt: "2015-09-01T17:41:00.580Z",
//     updatedAt: "2015-09-01T17:41:00.580Z",
//     roomname: safeRoomName,
//     username: safeUserName,
//     text: safeText
//   };

app.fetch = function(){
  $.ajax({
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'GET',
    contentType: 'application/json',
    success: function (data) {
      var safeMessage;
      for(var i = 0; i < data.results.length; i++){
        data.results[i].username = app.escape(data.results[i].username);
        data.results[i].text = app.escape(data.results[i].text);
        data.results[i].roomname = app.escape(data.results[i].roomname);
        app.messages.push(data.results[i]);
      }
      app.displayMessages();
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to retrieve message. Error: ', data);
    }
  });
};

// Remove all messages from #chats div
app.clearMessages = function(){
  $('#chats').empty();
};

app.displayMessages = function(){
  // get all room names and add them to drop-down as <option>s


  app.allRooms = [];
  $('#roomSelect').empty();
  for (var i = 0; i < app.messages.length; i++){
    app.allRooms.push(app.messages[i].roomname);
    
    //  loop through all local messages for currently-selected room 
    if (app.messages[i].roomname === app.currentRoom){
      //display message in DOM
      app.addMessage(app.messages[i]);
    }
  }
  // Remove duplicate rooms
  app.allRooms = _.uniq(app.allRooms);
  for (var j = 0; j < app.allRooms.length; j++){
    app.addRoom(app.allRooms[j]);
  }
};

// Add a single message to the DOM
app.addMessage = function(message){
  $('#chats').append('<div class = "message" id="' + message.objectId + '"></div>');
  $('#' + message.objectId).html('<div class = "messageText">' + message.text + '</div>');
  $('#' + message.objectId).append('<div class = "username">' + message.username + '</div>');
};

// Add a user-inputted room to the drop-down
app.addRoom = function(roomName){
  $('#roomSelect').append('<option id="' + roomName + '">' + roomName + '</option>');
};

app.addFriend = function(friend){
  this.friends.push(friend);
};

app.handleSubmit = function(){
  var currentText = $('#send #message').val();
  var currentRoomname = $('#roomSelect').first().text();
  var safeText = app.escape(currentText);
  var safeRoomName = app.escape(currentRoomname);
  var safeUserName = app.escape(app.currentUser);

  var submit = {
    username: safeUserName,
    text: safeText,
    roomname: safeRoomName
  };
  app.send(submit);
};

$(document).ready(function(){
  app.init()
  // Write SetInterval to run app.init every x seconds to check for new messages
});


// Allow users to send messages.

// Display all messages sent by friends in bold
  // apply 'friend' class on click

// Complete Backbone introduction repo.
