Chat = React.createClass({
  mixins:[ReactMeteorData],
  getMeteorData(){
    return {
      currentUser: Meteor.user()
    }
  },
  render() {
    return (
      <div className="chat-room">
        <MessageForm currentUser={this.data.currentUser} />
      </div>
    );
  }
});
