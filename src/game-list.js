import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';


function DataItem (props) {
  // console.log('DataItem','id',props.key,'active',props.active);
    let c = {cursor: 'pointer'};
    return (
     <ListGroupItem 
       key={props.key} 
       id={props.key} 
       style={c} 
       active={props.active}  
       onClick={props.onClick} 
       >
       {props.name}
     </ListGroupItem>          
    );
}

export default class GameList extends React.Component {
  
  constructor (props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
    
  handleClick (e) {
    this.props.onChange(e.target.id);
    e.preventDefault();
  }
  
  render() {
    let items = this.props.data.map( (item,key) => {
      let a = Number.parseInt(key) === Number.parseInt(this.props.selectedIndex);
      return DataItem({
          name: item.name, 
          key: key, 
          active: a,
          onClick: this.handleClick
        })
      }
  );
      
    return (
      <ListGroup>{items}</ListGroup>
    );
    
  }
  
}
