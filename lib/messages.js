Messages = new Mongo.Collection("messages");

Meteor.methods({
  'messagesAdd': function (username, avatar, message) {
    var messages = {
      username: username,
      avatar: avatar,
      message: message,
      createdAt: new Date()
    };
    Messages.insert(messages);
  }
});
