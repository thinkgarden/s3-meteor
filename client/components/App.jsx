const { AppBar } = mui;
App = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      currentUser: Meteor.user()
    }
  },

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  componentWillMount() {
    let setNavBarState = function(){
      this.setState({renderNavBar: document.body.clientWidth > 700});
    }.bind(this);
    setNavBarState();
    window.onresize = setNavBarState;
  },

  render(){
    let currentUser = this.data.currentUser;
    return (
       <div className="app-wrap">
        {this.state.renderNavBar ? <NavBar currentUser={currentUser} /> :
          currentUser ? this._getLoginAppBar() : this._getAppBar() }
        <AppLeftNav currentUser={currentUser} ref="leftNav" />
        { this.props.children }
        <Footer />
      </div>
    );
  },
  _getAppBarTitle() {
    return title = this.context.router.isActive('/home') ? 'Home' :
      this.context.router.isActive('/signup') ? 'Sign up' :
      this.context.router.isActive('/login') ? 'Log in' :
      this.context.router.isActive('/account') ? 'Account' :
      this.context.router.isActive('/chat') ? 'Chat' : '';
  },
  _getAppBar(){
    return(
      <AppBar title={this._getAppBarTitle()}
        onLeftIconButtonTouchTap={this._onLeftIconButtonTouchTap} />
    )
  },
  _getLoginAppBar(){
    return(
      <AppBar title={this._getAppBarTitle()}
        iconElementRight ={<LogOutMenu currentUser={this.data.currentUser}/>}
        onLeftIconButtonTouchTap={this._onLeftIconButtonTouchTap} />
    )
  },
  _onLeftIconButtonTouchTap(){
    this.refs.leftNav.handleToggle();
  }
});
