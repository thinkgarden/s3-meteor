const {Card, TextField, FlatButton, RaisedButton} = mui;

Account = React.createClass({
  _handleSubmit(e){
    e.preventDefault();
  },
  render() {
    return (
      <div className='account'>
        <Card className="content">
          <form onSubmit={this._handleSubmit}>
            <TextField hintText="Your Github Account"
                       ref="account"/>
            <FlatButton label="Search Github"
                        type="submit"
                        primary={true}/>
          </form>

        </Card>
      </div>
    );
  }
});
