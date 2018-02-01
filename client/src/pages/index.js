import React, {Component} from 'react';
import { connect } from 'react-redux';
import {List, ListItem} from 'material-ui/List';
import CircularProgress from 'material-ui/CircularProgress';
import TextField from 'material-ui/TextField';
import Subheader from 'material-ui/Subheader';
import PageCard from '../components/page-card';
import users from '../stores/users';

class Index extends Component {
  constructor (props) {
    super();
    this.updateData(props);
  }

  updateData = (props) => {
    if (!props.usersLoaded) {
      props.getUsers();
    }
  };

  render () {
    const {usersLoaded, searchData, users} = this.props;
    const userList = searchData.active
      ? searchData.results
      : Object.keys(users);

    return (
      <PageCard>
        <TextField hintText='Type here to search' onChange={event => this.props.search(event.target.value)} />
        <List>
          <Subheader>Users</Subheader>
          {(!usersLoaded || (searchData.active && !searchData.loaded)) && <CircularProgress />}
          {userList.map(userId =>
            <ListItem
              key={userId}
              primaryText={users[userId]}
              onClick={() => this.props.history.push(`/user/${userId}`)}
            />
          )}
        </List>
      </PageCard>
    );
  }
}

const mapState = (state) => {
  return {
    users: state.users,
    usersLoaded: state.usersLoaded,
    searchData: state.search
  };
};

const mapActions = (dispatch) => {
  return {
    getUsers: () => dispatch(users.actions.getUsers()),
    search: text => dispatch(users.actions.search(text))
  };
};

export default connect(mapState, mapActions)(Index);
