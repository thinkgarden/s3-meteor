const {CircularProgress} = mui;
MessageList = React.createClass({
  componentDidMount() {
    $(".loader").delay(800).fadeOut('slow',function () {
      $("#messages").fadeIn('slow');
      let height = $('#message-list')[0].scrollHeight;
       $('#message-list').scrollTop(height);
    });
  },
  componentDidUpdate() {
    let height = $('#message-list')[0].scrollHeight;
    $('#message-list').scrollTop(height);
  },
  render() {
    const allMessages = _.map(this.props.messages, (message, key) => {
        return (
          <Message avatar={message.avatar}
            owner={message.owner}
            createdAt={message.createdAt}
            content={message.content}
            key={key} />
          );
    });
    let styles = {
      circle: {
        margin: '0 auto',
        paddingTop: '100px',
        display: 'block'
      }
    };
    return (
      <div id="message-list">
        <CircularProgress className="loader"
          mode="indeterminate" style={styles.circle} />
        <div id="messages"> { allMessages } </div>
      </div>
    );
  }
});
