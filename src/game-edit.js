import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { gameConfig } from './sample-data.js';
import GamePropForm from './game-prop-form'
import GameList from './game-list';


// console.log(gameConfig);

class GameEdit extends Component {
  
  constructor(props) {
    super(props);
    let index = 0;
    this.state = {
      data: gameConfig,
      selectedIndex: index,
      selectedData: gameConfig[index]
    };
    this.handleListClick = this.handleListClick.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
  }

 
  handleListClick (index) {
    index = Number.parseInt(index);
    this.setState({
      selectedIndex: index,
      selectedData: gameConfig[index]
    });
  }

  handleFormChange (event) {
//console.log('handleFormChange',event);
    let data = this.state.selectedData;
    let name = event.target.name;
    let value = event.target.value;
    switch (name) {
      case 'board_size_x': data.board_size.x = Number.parseInt(value) || 1; break;
      case 'board_size_y': data.board_size.y = Number.parseInt(value) || 1; break;
      case 'initial_count': data.initial_count = Number.parseInt(value) || 0; break;
      default: data[name] = value; 
    }
//console.log('data',data.initial_figures);
    this.setState({
      selectedData: data,
      data: gameConfig
    });
  }
  

  render() {
    return (
      <Container>
        <Row>
        <Col><h1>Triple Game Editor</h1><hr/></Col>
        </Row>
        <Row>
          <Col xs="4" className="border">
            <GameList data={this.state.data} 
              selectedIndex={this.state.selectedIndex}  
              onChange={this.handleListClick}/>
          </Col>
          <Col xs="8"  className="border">
            <GamePropForm data={this.state.selectedData} change={this.handleFormChange}/>
          </Col>
        </Row>
      </Container>   
    );
  }
  
}

export default GameEdit;

