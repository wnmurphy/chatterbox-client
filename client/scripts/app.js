//$.ajax("https://api.parse.com/1/classes/chatterbox)");

var app = {
  server: "https://api.parse.com/1/classes/chatterbox",
  friends: []
};

app.init = function(){
  // if rebinding needed, rerun at that time
  $('.username').on('click', function(){
    var friend = $(this).text();
    app.addFriend(friend);
  })
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

app.fetch = function(message){
  $.ajax({
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'GET',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      return JSON.parse(data);
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

app.addMessage = function(message){
  $('#chats').append('<div class = "message"></div>');

  $('.message').html('<div class = "messageText">' + message.text + '</div>');
  $('.messageText').append('<div class = "username">' + message.username + '</div>');
};

app.addRoom = function(roomName){
  $('#roomSelect').append("<div>" + roomName + "</div>");
};

app.addFriend = function(friend){
  this.friends.push(friend);
};

app.handleSubmit = function(){};

var message = {
  username: 'shawndrost',
  text: 'trololo',
  roomname: '4chan'
};



  // Display messages retrieved from the parse server.

  // Setup a way to refresh the displayed messages (either automatically or with a button).

  // Use proper escaping on any user input.

  // Allow users to select a username.

  // Allow users to send messages.
  
  // Allow users to create rooms.
    // Defined by the .room property of messages; you'll need to sort them.
  // Allow users to enter existing rooms.
  
  // Allow users to befriend other users by clicking on their username.
  // Display all messages sent by friends in bold (probably apply 'friend' class on click).

  // Complete Backbone introduction repo.

// Specs:
  // should parse correctly and have an object named `app`
  // should have a method called init

  // App behavior
    // should submit a POST request via $.ajax
    // should send the correct message along with the request
    // should have a fetch method
    // should submit a GET request via $.ajax
    
  // Chatroom behavior
    // should be able to clear messages from the DOM
    // should be able to add messages to the DOM
    // should be able to add rooms to the DOM
    // should add a friend upon clicking their username
    // should try to send a message upon clicking submit