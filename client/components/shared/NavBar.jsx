const { Tabs, Tab, IconButton } = mui;

NavBar = React.createClass({
  getInitialState() {
    return {tabsIndex:''}
  },
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  componentWillMount() {
    this.setState({
      tabsIndex: this._getSelectedIndex(),
    });
  },
  componentWillReceiveProps(nextProps) {
     this.setState({
      tabsIndex: this._getSelectedIndex(),
    });
  },
  _handleTabsChange(value) {
    this.context.router.push(value)
  },

  _getSelectedIndex() {
    return this.context.router.isActive('/home') ? '/home' :
      this.context.router.isActive('/signup') ? '/signup' :
      this.context.router.isActive('/account') ? '/account' :
      this.context.router.isActive('/login') ? '/login' : '';
  },

  render() {
    let styles = {
      taps:{
        width: '390px',
        position: 'absolute',
        right: '60px',
        textTransform: 'uppercase'
      },
      tap:{
        height: '64px',
        color: '#fff'
      },
      inkBar:{
        height: '4px',
        marginTop: '-4px'
      }
    };
    let currentUser = this.props.currentUser;
    let logOutMenu;
    if(currentUser) {
       logOutMenu = (
        <LogOutMenu currentUser={currentUser} />
      );
    }else {
      logOutMenu = '';
    }

    return (
      <div className="app-header">
        <Tabs
          style={styles.taps}
          tabItemContainerStyle={{ backgroundColor: 'transparent' }}
          inkBarStyle={styles.inkBar}
          value={this.state.tabsIndex}
          onChange={this._handleTabsChange} >
          <Tab
            style={styles.tap}
            value="/home"
            label="home" />
          <Tab
            style={styles.tap}
            label={ currentUser ? 'account' : 'sign up' }
            value={ currentUser ? '/account' : '/signup' } />
          <Tab
            style={styles.tap}
            value="/login"
            label="login" />
        </Tabs>
        { logOutMenu }
      </div>
    );
  }
});
