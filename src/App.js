import React, { Component } from 'react';
import {
  Container, 
  Jumbotron, 
  Button,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

import {gameConfig} from './sample-data.js';
import GameEdit from './game-edit'
import TripleGame from './game-play.js';
import './set-figure-img.js';



class AppNavBar extends React.Component {
  
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  
  change (page) {
    this.props.change(page);
  }

  gameOptions () {
    let result = [];
    for (let i=0; i < gameConfig.length; i++) {
      result.push( <DropdownItem key={i} onClick={this.change.bind(this,'play,'+i)}>{gameConfig[i].name}</DropdownItem> );
    };
    return result;
  }

  render() {
    return (
      <div>
        <Navbar className="navbar navbar-dark bg-primary" expand="md">
          <NavbarBrand href="#" onClick={this.change.bind(this,'home')}>Triple Game</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Play
                </DropdownToggle>
                <DropdownMenu right>{this.gameOptions()}
                </DropdownMenu>
              </UncontrolledDropdown>
              <NavItem>
                <NavLink href="#" onClick={this.change.bind(this,'story')}>Story</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#" onClick={this.change.bind(this,'options')}>Options</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}



function homePage (props) {
  return (
    <div>
      <Jumbotron>
        <h1 className="display-3">Triple Game</h1>
        <p className="lead">This is a nice board game project, based on a simple game written in <em>javascript</em> it is grown to a full <em>React</em> application.</p>
        <hr className="my-2" />
        <p>Read the storry of this app, or just <a href='#' onClick={props.play}>play</a>.</p>
        <p className="lead">
          <Button color="primary" onClick={props.change}>Read More</Button>
        </p>
      </Jumbotron>
    </div>
  );  
}


class PageContent extends Component {

  render () {
    let page = this.props.page;
    let index = 0;
    let result = '';
    
    // get page index
    let s = page.split(',');
    if (s.length > 1) {
      page  = s[0];
      index = Number.parseInt(s[1]);
    }
    
    switch (page) {
      case 'home': 
        result = homePage(this.props); 
        break;
      case 'options': 
        result = <GameEdit  />;
        break;
      case 'play': 
        result = <TripleGame config={gameConfig[index]} />;
        break;
      case 'story': 
//        result = <ReactMarkdown source={ReadMe}  />;
//        result = <div>{ReadMe}</div>;
        result = 'ReadMe';
        break;
      default: 
        result = 'Oops..';
    }
    
    return  result;
  }
  
};



class App extends Component {

  constructor(props) {
    super(props);
    this.handleNavChange = this.handleNavChange.bind(this);
    this.state = {
      page: 'home'
    };
  }

  handleNavChange (page, index) {
    if (page === 'story') {
      window.location = 'README.html';
      return;
    }
    this.setState({
      page:  page
    });
  }

  render() {
    return (
      <Container>
        <AppNavBar page={this.state.page} change={this.handleNavChange}  />
        <hr/>
        <PageContent page={this.state.page} change={this.handleNavChange.bind(this,'story')} play={this.handleNavChange.bind(this,'play,0')} />        
      </Container>
    );
  }
  
}

export default App;
