const { TextField, Paper, RaisedButton } = mui;

SignUp= React.createClass({
  contextTypes:{
    router: React.PropTypes.object.isRequired
  },
  _handleSubmit(event){
    event.preventDefault();
    let userName = this.refs.userName.getValue();
    let password = this.refs.password.getValue();
    Accounts.createUser({
      username:userName,
      password:password
    }, (error) => {
      if (error) {
        console.log(error);
        return;
      }
      this.context.router.push('/account');
    })
  },
  render(){
    let styles = {
      textField: {
        display: 'block',
        width: '100%'
      },
      floatingLabel: {
        fontSize: '20px'
      },
      label: {
        fontWeight: '600',
        fontSize: '20px'
      },
      button: {
        height: '50px',
        width: '200px',
        marginTop: '50px',
        marginBottom: '15px'
      }
    };
    return (
      <div className="signup">
        <Paper className="paper" zDepth={2}>
        <form onSubmit={this._handleSubmit}>
          <TextField
            ref="userName"
            style={styles.textField}
            floatingLabelText="用户名"
            floatingLabelStyle={styles.floatingLabel} />
          <TextField
            ref="password"
            style={styles.textField}
            floatingLabelText="密码"
            floatingLabelStyle={styles.floatingLabel}
            type="password" />
          <RaisedButton
            style={styles.button}
            labelStyle={styles.label}
            label="注册"
            primary={true}
            type="submit" />
        </form>
        </Paper>
      </div>
    );
  }
});
