/* 
 * Copyright (C) 2018 wcs <wcs at willicommer.de>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import React from 'react';
import {figureImgUrl,Pos, Game} from 'triple-game';
import {Shop} from './sample-data.js';
import {Container, Row, Col, Button} from 'reactstrap';
import GameShop from './game-shop.js';



const gameGridStyle = {
   backgroundColor: "green",
   border: 0,
   borderSpacing: 0
};

const gameImg64Style = {
   margin: 0,
   border: 0,
   paddingLeft: 4,
   verticalAlign: "baseline",  
   width: 64, height: 64
};

const cellOkStyle = {cursor: "pointer"};
const cellKoStyle = {cursor: "default"};

/*
function imgCursor(fig) { 
  return {cursor: "url(" + figureImgUrl(fig) + "16 16, auto"};
}  
*/
  
function LabelText (txt) { 
  return (<h4 className="text-primary"  key="lab1">{txt}</h4>);
};

function LabelTextMuted (txt) { 
  return (<h4 className="text-success" key="lab2">{txt}</h4>);
};


function FigImg (fig) {
  return (
    <img src={figureImgUrl(fig)} alt={'img'+fig} style={gameImg64Style} key="img"/> 
  );
};

function FigImgLab (props) {
  let fig = props.fig === 0 ? 'none' : props.fig;
  return (
    <div onClick={props.onClick}  style={{cursor: "pointer"}} >      
      {LabelTextMuted(props.label)}
      {FigImg(fig)}
    </div>
  );
};

function Score (label, value) {
   if (value === 0) value = '';
   return [LabelTextMuted(label), LabelText(value)];
};


 
  
class ControlPanel extends React.Component {
  
  render () {
    let cn = 'btn-success';
    let cn2 = this.props.undoDisable ? cn + ' disabled' : cn;
    return (
      <Row>
        <Col key="undo">
          <Button className={cn2} onClick={this.props.undoClick}>Undo</Button>
        </Col>
        <Col key="shop">
          <GameShop shop={this.props.shop} onBuy={this.props.shopClick} />
        </Col>
        <Col key="new">
          <Button className={cn} onClick={this.props.newgameClick}>New Game</Button>
        </Col>
      </Row>
    );
   }  
};
  
          
  
/**
 * props
 *   game
 *   boardclick function(pos)
 */
class GameBoard extends React.Component {
  
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  
   handleClick(pos) {
    this.props.boardClick(pos);
  }
  
  render () {
    let rows = [];
    let game = this.props.game;
    let board = this.props.game.board;
    if (!board) return 'Empty Board';
//console.log(board);    
    for (let y=0; y < board.rows; y++) {
      let cells = [];
      for (let x=0; x < board.rows; x++) {
        let fig = board.get(x,y);
        let pos = new Pos(x,y);
        let legal = game.isLegalMove(pos);
        let cell;
        if (legal) {
          cell = (
            <td key={pos.key}>
              <div style={cellOkStyle} onClick={(e) => this.handleClick(pos,e)}>
              {FigImg(fig)}
              </div>
            </td>
          );      
        } else {
          cell = (
            <td key={pos.key}>
              <div style={cellKoStyle}>
              {FigImg(fig)}
              </div>
            </td>
          );     
       }
       cells.push(cell);
      };
      let row = <tr key={y}>{cells}</tr>;
      rows.push(row);
    };
   
    return (
      <table style={gameGridStyle}>
        <tbody>{rows}</tbody>
      </table>
    );
  }
};


/**
 * props
 *   config 
 * state
 *   game
 *   gameState  
 */
export default class TripleGame extends React.Component {   // props: config
  
  constructor(props) {
    super(props);
    let g = new Game(props.config);
    g.shop = new Shop();
    g.setState({gold: g.shop.gold});
    loadGame(g);
    this.state = {
      game: g,
      gameState: g.getState()
    };
    this.boardClick = this.boardClick.bind(this);
    this.reserveClick = this.reserveClick.bind(this);
    this.undoClick = this.undoClick.bind(this);
    this.newgameClick = this.newgameClick.bind(this);
    this.shopClick = this.shopClick.bind(this);
  }

  updateState () {
    let state = this.state.game.getState();
    let shop = this.state.game.shop;
    shop.gold = state.gold;
    this.setState({
      gameState: state
    });
    saveGame(this.state.game);
  }
  
  boardClick (pos) {
    this.state.game.turn(pos);
    this.updateState();
  }
  
  reserveClick () {
    this.state.game.swapReserve();
    this.updateState();
  }

  undoClick () {
    this.state.game.undoMove();
    this.updateState();
  }
  
  newgameClick () {
    let game = this.state.game;
    let gold  = game.getState().gold;
    if (!gold) gold = 1000;
    game.newGame();
    game.setState({gold: gold});
    game.shop = new Shop();
    game.shop.gold = gold;
    this.updateState();
  }

  shopClick (fig) {
    let shop = this.state.game.shop;
    shop.buy(fig);
    this.state.game.addFigure(fig);
    this.state.game.setState({gold: shop.gold});
    this.updateState();
  }


  render() {
    let game = this.state.game;
    let gameState = this.state.gameState;
    let undoDisable = !gameState.undo_enable;
    return (
      <Container>    
        <Row>
          <Col className="border" size="4" >
            <GameBoard game={game} boardClick={this.boardClick}/>
          </Col>
          
          <Col size="auto">
            <Row>
              <Col className="border">
                <FigImgLab label="Place" fig={gameState.next} onClick={this.reserveClick}/>
              </Col>
              <Col className="border">
                <FigImgLab label="Reserve" fig={gameState.reserve} onClick={this.reserveClick}/>
              </Col>
            </Row>
            <Row>
              <Col className="border">
                {Score("Score", gameState.score)}
              </Col>
              <Col className="border">
                {Score("Gold", gameState.gold)}
              </Col>
            </Row>
            <Row>
              <Col className="border">
                {Score("Moves", gameState.move_count)}
              </Col>
            </Row>
            <Row><Col><hr/></Col></Row>
            <ControlPanel game={game} undoClick={this.undoClick} newgameClick={this.newgameClick} shopClick={this.shopClick} undoDisable={undoDisable} shop={this.state.game.shop} />
          </Col>
          
          <Col size="1" ></Col>
        </Row>
      </Container>
    );
  }
 
  
};


  
var saveGameKey = 'TripleGame';
var logActions  = false;
/** save game to strorage */

function saveGame( game ) {
  if (typeof(Storage) === "undefined") return;
  let status = game.getState();
  status.shop = game.shop.getState();
  if (logActions) console.log('save game status:',status);
  status = JSON.stringify(status);
  localStorage[saveGameKey] = status;
}

/** reload game from strorage */

function loadGame( game ) {

  if (typeof(Storage) === "undefined") {
    console.warn('Storage not suported');
    return;
  }
  
  var status = localStorage[saveGameKey];
  if (logActions) console.log('load game status:',status);
  try {
    status = JSON.parse(status);
    if (!status || !status.board) return;
    if (status) game.setState(status);
    if (status && status.shop) game.shop.setState(status.shop);
  } catch (e) {
    localStorage.savedGame = null;
    if (logActions) console.log('loadGame error',e);
  }

}

