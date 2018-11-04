import React from 'react';
import { Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {figureById} from 'triple-game';


/**
 * @props {Button} button
 * @props {Shop} shop
 * @props {function} onBuy callback(Shop)
 */
export default class GameShop extends React.Component {
    
  constructor (props) {
    super(props);
    this.state = { 
      modal: false
    };
    this.toggle = this.toggle.bind(this);
  }
    
  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
    
  handleClickAndBuy (key) {
    let shop = this.props.shop;
    let item = shop.items.find( x => (''+x.fig) === key );
    --item.stock;
    shop.gold -= item.cost;
    shop.cart = key;
    this.props.onBuy(shop);
  }

  handleClick (key) {
    this.toggle();
    this.props.onBuy(key);
  }

  shopItems () {
    let shop = this.props.shop;
    let result = [];
    for (let i=0; i < shop.items.length; i++) {
      let item = shop.items[i];
      let fig = figureById(item.fig);
      let disabled = (item.stock <= 0) || (shop.gold < item.cost);
      let cl = disabled ? 'text-muted' : 'text-primary';
      let click = disabled ? null : this.handleClick.bind(this,fig.key);
      let style = disabled ? {} : {cursor: "pointer"};
      result.push(
        <Col className={cl} key={fig.key} onClick={click} style={style}>      
        <Row>
          <Col><img src={fig.img} alt={fig.name} style={{width: 32,height:32,marginRight:10}}/></Col>
          <Col ><h4>{item.stock}</h4></Col>
          <Col ><strong>{fig.name}</strong><br/>
            {item.cost}&nbsp;gold
          </Col>
        </Row>
        </Col>
      );
    }
    return (<Row>{result}</Row>);
  }

  render () {
    let button = this.props.button;
    if (!button) button = (<Button onClick={this.toggle} className="btn-success">Shop</Button>);
    let gold = this.props.shop.gold;
    if (!gold) gold = 'no';
    return (
      <div>
        {button}
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
        <ModalHeader toggle={this.toggle}>Shop</ModalHeader>
          <ModalBody>
            {this.shopItems()}
            <hr/>
            <Row><Col><h5>You own {gold} gold</h5></Col></Row>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
    
}
  
    


