import React, {Component} from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import {Link} from 'react-router-dom';
import CircularProgress from 'material-ui/CircularProgress';
import PageCard from '../components/page-card';
import users from '../stores/users';

const UserTitle = styled.div`
  margin: 20px;
  font-weight: 600;
`;

class Details extends Component {
  constructor (props) {
    super();
    this.updateData(props);
  }

  componentWillReceiveProps (props) {
    this.updateData(props);
  }

  updateData = props => {
    if (!props.usersLoaded) {
      props.getUsers();
    }

    const userId = props.match.params.userId;
    if (userId !== props.userDetails.userId) {
      props.getDetails(userId);
    }
  };

  render () {
    const userId = this.props.match.params.userId;
    return (
      <PageCard>
        <Link to='/'>← back to list</Link>
        <UserTitle>{this.props.users[userId]}</UserTitle>
        {!this.props.usersLoaded && <CircularProgress />}
        <List>
          <Subheader>Phones</Subheader>
          {!this.props.userDetails.phonesLoaded && <CircularProgress />}
          {this.props.userDetails.phones.map(phone =>
            <ListItem
              key={phone}
              primaryText={phone}
            />
          )}
        </List>
        <List>
          <Subheader>Deposits</Subheader>
          {!this.props.userDetails.additionalLoaded && <CircularProgress />}
          {this.props.userDetails.additional.map((deposit, index) =>
            <ListItem
              key={index}
              primaryText={`${deposit.date} — ${deposit.depositAmount}`}
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
    userDetails: state.userDetails
  };
};

const mapActions = (dispatch) => {
  return {
    getUsers: () => dispatch(users.actions.getUsers()),
    getDetails: userId => dispatch(users.actions.getDetails(userId))
  };
};

export default connect(mapState, mapActions)(Details);
