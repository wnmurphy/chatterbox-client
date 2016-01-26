//$.ajax("https://api.parse.com/1/classes/chatterbox)");

var app = {
  server: "https://api.parse.com/1/classes/chatterbox",
  friends: [],
  currentUser: 'anonymous',
  messages: [],
  currentRoom: 'default'
};

app.escape = function (str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
};

// Initialize event listeners
app.init = function(){

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
    //e.preventDefault();
    app.currentRoom = $('#roomSelect').val();
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
  //  loop through all local messages for currently-selected room
  for (var i = 0; i < app.messages.length; i++){
    //if the current message is in the selected room
    if (app.messages[i].roomname === app.currentRoom){
      //display message in DOM
      app.addMessage(app.messages[i]);
    }
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
  $('#roomSelect').append('<option>' + roomName + '</option>');
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
