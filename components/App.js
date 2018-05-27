class App extends React.Component {
  constructor() {
    super();
    this.state = {
      searchText: '',
      users: []
    };
  }

  onChangeHandle(event) {
    this.setState({searchText: event.target.value});
  }

  onSubmit(event) {
    event.preventDefault();
    const {searchText} = this.state;
    const url = `https://api.github.com/search/users?q=${searchText}`;
    fetch(url)
      .then(response => response.json())
      .then(responseJson => this.setState({users: responseJson.items}));
  }

  render() {
    const search = {
      margin: "auto",
      fontFamily: "Audiowide",
      fontSize: "18px",
      width: "600px",
      backgroundColor: "#c9c9c9",
      display: "flex",
      flexDirection: "column"
    }

    const searchGit = {
      fontFamily: "Audiowide",
      paddingTop: "50px",
      display: "flex",
      justifyContent: "center",
      backgroundColor: "#808080",
      padding: "25px"
    }

    return (
      <div style={search}>
        <form style={searchGit} onSubmit={event => this.onSubmit(event)}>
          <label htmlFor="searchText">Search by user name</label>
          <input
            type="text"
            id="searchText"
            onChange={event => this.onChangeHandle(event)}
            value={this.state.searchText}/>
        </form>
        <UsersList users={this.state.users}/>
      </div>
    );
  }
}

class UsersList extends React.Component {
  get users() {
    return this.props.users.map(user => <User key={user.id} user={user}/>);
  }

  render() {
    const searchResult = {
      paddingTop: "50px",
      display: "flex",
      justifyContent: "space-between",
      flexDirection: "column",
      backgroundColor: "#CFD2E1"
    }

    return (
      <div style={searchResult}>
        {this.users}
      </div>
    )
  }
}

class User extends React.Component {
  render() {
    const searchUser = {
      display: 'flex',
      flexDirection: 'row',
      paddingLeft: '20%'
    }

    const userAvatar = {
      maxWidth: '100px',
      maxHeight: '100px',
      margin: '15px',
      boxShadow: "1px 1px 1px #808080"
    }

    const userName = {
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none'
    }

    return (
        <div style={searchUser}>
          <img src={this.props.user.avatar_url} style={userAvatar}/>
          <a href={this.props.user.html_url} target="_blank" style={userName}>{this.props.user.login}</a>
        </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
