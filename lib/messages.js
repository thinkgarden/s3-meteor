Messages = new Mongo.Collection("messages");

Meteor.methods({
  'messagesAdd': function (username, avatar, message) {
    var messages = {
      owner: username,
      avatar: avatar,
      content: message,
      createdAt: new Date()
    };
    Messages.insert(messages);
  }
});
