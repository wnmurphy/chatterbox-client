//$.ajax("https://api.parse.com/1/classes/chatterbox)");

var app = {
  server: "https://api.parse.com/1/classes/chatterbox",
  friends: [],
  currentUser: 'anonymous',
  messages: []
};

app.escape = function (str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
};

app.init = function(){
  // if rebinding needed, rerun at that time
  $('.username').off();
  $('.username').on('click', function(){
    var friend = $(this).text();
    app.addFriend(friend);
  });
  $('.submit').off();
  $('.submit').submit(function(){
    app.handleSubmit();
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
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to retrieve message. Error: ', data);
    }
  });
};


app.clearMessages = function(){
  $('#chats').empty();
};


// Add messages for selected room to DOM
app.addMessage = function(roomName){
  // sort messages array based on selected roomName
  // loop through messages
    // if current room name matches message room name, 
    // app.addMessage to add to DOM 

  $('#chats').append('<div class = "message" id="' + message.objectId + '"></div>');
  $('#' + message.objectId).html('<div class = "messageText">' + message.text + '</div>');
  $('#' + message.objectId).append('<div class = "username">' + message.username + '</div>');
};

app.addRoom = function(roomName){
  $('#roomSelect').append('<div>' + roomName + '</div>');
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
  // run fetch on interval to:
});;


// Display messages retrieved from the parse server.

// Validate input for proper escaping
  // write a validation function
  // call on incoming data in handleSubmit
  // call on outgoing data in handleSubmit

// Allow users to send messages.

// Allow users to enter existing rooms.
  // Drop-down menu of room class
  // room selection 
    // clear messages
    // sort global messages by room
    // repopulate messages by room

// Display all messages sent by friends in bold
  // apply 'friend' class on click

// Complete Backbone introduction repo.
