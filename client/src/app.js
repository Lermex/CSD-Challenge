import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import { Provider } from 'react-redux';
import styled from 'styled-components';
import AppBar from 'material-ui/AppBar';
import initStore from './stores';
import Index from './pages/index';
import Details from './pages/details';

const AppContainer = styled.div`
  max-width: 800px;
  margin: 40px auto;
  
  a, a:visited {
    color: #333; 
    text-decoration: none;
  }
`;

export default class App extends Component {
  render () {
    return (
      <Provider store={initStore()}>
        <Router>
          <div>
            <AppBar showMenuIconButton={false} title='CSD Challenge' />
            <AppContainer>
              <Route exact path='/' component={Index} />
              <Route path='/user/:userId' component={Details} />
            </AppContainer>
          </div>
        </Router>
      </Provider>
    );
  }
}
