const { Link } = ReactRouter;
App = React.createClass({
  render(){
    return (
      <div>
        <Link to="/home"> Home </Link>
        <Link to="/signup"> Sign Up</Link>
        <Link to="/login"> Log In </Link>
        <br/>
        { this.props.children }
      </div>
    );
  }
});
