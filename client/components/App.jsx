const { Link } = ReactRouter;
App = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      currentUser: Meteor.user()
    }
  },
  render(){
    return (
       <div className="app-wrap">
        <NavBar currentUser={this.data.currentUser} />
        { this.props.children }
        <Footer />
      </div>
    );
  }
});
