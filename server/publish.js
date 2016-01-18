Meteor.publish("userData", function() {
  return Meteor.users.find(
    { _id: this.userId },
    { fields: { avatar: 1, followers: 1, repos: 1, following: 1 } }
  );
});
