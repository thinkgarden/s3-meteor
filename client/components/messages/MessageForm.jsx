const {TextField, Card, RaisedButton} = mui;

MessageForm = React.createClass({
  getInitialState(){
    return {
      inputValue: ''
    }
  },
  _handleChange(){
    this.setState({inputValue:this.refs.message.getValue() });
  },
  _handleSubmit(e){
    e.preventDefault();
    const message = this.refs.message.getValue();
    const currentUser = this.props.currentUser;
    const username = currentUser.username;
    const avatar = currentUser.avatar;
    Meteor.call('messagesAdd', username, avatar, message, (error) => {
      if(error){
        console.log(error);
        return;
      }
      this.setState({inputValue: ''});
    });
  },
  render() {
    const styles ={
      textField: {
        width: '80%',
        height: '45px',
        marginRight: '5px',
        transition: 'none'
      },
      lable: {
        fontSize: '14px',
        padding: '0 12px',
        fontWeight: '600'
      },
      button: {
        minWidth: 0
      }
    }
    return (
      <Card className="message-form">
        <form onSubmit={this._handleSubmit}>
          <TextField
            ref="message"
            value={this.state.inputValue}
            onChange={this._handleChange}
            style={styles.textField}
            hintText="说点什么" />

          <RaisedButton
            style={styles.button}
            labelStyle={styles.label}
            primary={true}
            label="发送"
            type="submit" />
        </form>
      </Card>

    );
  }
});
