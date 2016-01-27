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
  app.currentUser = window.location.search.substr(10);
  // Get messages from server;
  app.fetch();

  // Listen for click on a username to add friend
  $('.username').off();
  $('.username').on('click', function(){
    var friend = $(this).text();
    app.addFriend(friend);
  });

  // Listen for submission of message text
  $('.messageSubmit').off();
  $('.messageSubmit').on('click', function(e){
    e.preventDefault();
    app.handleSubmit();
  }); 

  // Listen for submission of new room
  $('#newRoom').off();
  $('#newRoom').on('click', function(e){
    e.preventDefault();
    var addingRoom = $('#addNewRoom').val();
    app.addRoom(addingRoom);
  }); 

  // Listen for room change
  $('#roomSelect').off();
  $('#roomSelect').change(function(e){
    e.preventDefault();
   
    app.currentRoom = $('#roomSelect').val();
   
    // set roomSelect.selection to currentRo
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
      console.log(message);
      console.log('chatterbox: Message sent. Data: ', data);
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message. Error: ', data);
    }
  });
};


app.fetch = function(){
  $.ajax({
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'GET',
    data: {order: '-createdAt'},
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


// Get all new messages and update room list.
app.displayMessages = function(){
  // get all room names and add them to drop-down as <option>s
  
  for (var i = 0; i < app.messages.length; i++){
    if (!(_.contains(app.allRooms, app.messages[i].roomname))){
      app.allRooms.push(app.messages[i].roomname);
      app.addRoom(app.messages[i].roomname);
    }
    
    //  loop through all local messages for currently-selected room 
    if (app.messages[i].roomname === app.currentRoom){
      //display message in DOM
      app.addMessage(app.messages[i]);
    }
  }
  $('#roomSelect').val(app.currentRoom);
};


// Add a single message to the DOM
app.addMessage = function(message){
  $('#chats').prepend('<div class = "message" id="' + message.objectId + '"></div>');
  $('#' + message.objectId).html('<div class = "messageText">' + message.text + '</div>');
  if(app.friends.indexOf(message.username) > -1){
    $('div.message').addClass('friend');
  }
  $('#' + message.objectId).append('<div class = "username">' + '-' + message.username + '</div>');
};


// Add a user-inputted room to the drop-down
app.addRoom = function(roomName){
  $('#roomSelect').append('<option id="' + roomName + '">' + roomName + '</option>');
};


app.addFriend = function(friend){
  this.friends.push(friend);
};


app.handleSubmit = function(){
  var currentText = $('#message').val();
  var safeText = app.escape(currentText);
  var safeRoomName = app.escape(app.currentRoom);
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
  setInterval(app.init, 10000);
});

// Allow users to 'befriend' other users by clicking on their username.
//   On click
//     Add the username to app.friends array.
    
//   In displayMessage, 
//     if username is in app.friends array, then add class 'friend' to message text
//     Add CSS to put message in bold

// Left to do (worst-case time estimate):
// 4. Add username, text, roomname to a message object and send message to server. (1 hour)

// 5. Add friend: CSS so addFriend adds a friend class and displays messages from friends in bold. (1 hour)

// 6. Finish Backbone intro (looks short). (20min)