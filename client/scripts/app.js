//$.ajax("https://api.parse.com/1/classes/chatterbox)");

var app = {
  server: "https://api.parse.com/1/classes/chatterbox",
  friends: [],
  currentUser: 'anonymous'
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

app.fetch = function(message){
  $.ajax({
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'GET',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      //call our escape validator
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


app.handleSubmit = function(){
  var currentText = $('#send #message').val();
  var currentRoomname = $('#roomSelect').first().text();
  //console.log(currentRoomname, currentText);
  //call our escape validator
  // if (validated){...}
  var submit = {
    username: app.currentUser,
    text: currentText,
    roomname: currentRoomname
  };
  // console.log(submit);
  app.send(submit);
};

// Get last test to pass in spec

  // Copy structure of spec HTML to get basic elements

  // Display messages retrieved from the parse server.

  // Write SetInterval to run app.init every x seconds to check for new messages

  // Validate input for proper escaping
    // write a validation function
    // call on incoming data in handleSubmit
    // call on outgoing data in handleSubmit

  // Allow users to select a username.
    //input field

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
