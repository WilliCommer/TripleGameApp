import React from 'react';
import { Button, Collapse, ListGroup, ListGroupItem, InputGroup, InputGroupAddon, UncontrolledTooltip } from 'reactstrap';
import {figureList, figureById} from 'triple-game';



class DataItem extends React.Component {
  
  constructor (props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange (e) {
    let m = {
      name: 'probability',
      value: e.target.value,
      key:   this.props.fig.key
    };
    this.props.onChange(m);
    e.preventDefault();
  }
  
  render() {
    let {
      fig,
      probability,
      active
    } = this.props;

    return (
      <ListGroupItem key={fig.key} active={active} >
        <InputGroup>
           <InputGroupAddon addonType="prepend">
             <img src={fig.img} alt={fig.name} style={{width: 32,height:32,marginRight:10}}/>
           </InputGroupAddon>
           <span style={{width: 100}}>
             {fig.name}
           </span>
           <InputGroupAddon addonType="prepend">
             Probability %
           </InputGroupAddon>
           <input type="number" name="probability" value={probability} onChange={this.handleChange} min="0" max="99.9" step="0.1" />
        </InputGroup>
      </ListGroupItem>          
    );
  }

}




class FigureSelectorList extends React.Component {
  
  render() {
    let items = this.props.data.map( (item) => {
      return <DataItem fig={item.fig} probability={item.probability} onChange={this.props.onChange} key={item.fig.key} />;
    });

    return <ListGroup xs="6">{items}</ListGroup>;
  }
  
}
  

export default class FigureSelector extends React.Component {   // name, value, onChange, kind ("1" || "2")
  
  constructor (props) {
    super(props);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = { open: false };
  }
    
  expandData (data) {
    const exclude1 = ['','0','9','25','26','31','40','41'];
    const exclude2 = ['','0','9','50','51'];
    let result = [];
    let exclude = (this.props.kind === "1") ? exclude1 : exclude2;
    figureList.forEach( fig => {
      if (exclude.indexOf(fig.key) >= 0) return;
      let o = {fig: fig, probability: 0};
      let item = data.find( x => ('' + x[0]) === fig.key );
      if (item) o.probability = item[1];
      result.push(o);
    });
    return result;
  }
  
  shortData (data) {
    let result = [], sum = 0;
    data.forEach( item => {
      let fig = figureById(item[0]);
      result.push(
        <span key={fig.key}>      
          <img src={fig.img} alt={fig.name} style={{width: 24,height:24, marginRight:2}}/>
          <small>{item[1]} %</small> &nbsp; 
        </span>
      );
      sum += item[1];
    });
//    result.push(<span key="x"><small>total {Math.round(sum,1)} <small></span>);
    result.push((
      <span href="#" id={this.props.name + '_tip'} key="x">
        <small>total {Math.round(sum,1)} </small>
      </span>
    ));
    result.push((
      <UncontrolledTooltip placement="right" target={this.props.name + '_tip'} key="x2">
        total can not be greater than 100 !
      </UncontrolledTooltip>       
    ));
    
     
       
    return result;
  }
  
  
  handleChange (e) {
    let {key,value} = e;
    let data = this.props.value;
    let item = data.find( x => ('' + x[0]) === key );
    value = parseFloat(value) || 0;
    if (item && value === 0) 
      data = data.filter( x => x !== item );
    if (item && value !== 0) 
      item[1] = value;
    if (!item && value !== 0) 
      data.push([Number.parseInt(key), value]);
    this.props.onChange({target: {name: this.props.name, value: data}});
  }
  
  handleToggle (e) {
    this.setState({ open: !this.state.open });
  }
  
  render() {
      
    return (
      <div>
        <Button size="sm" onClick={this.handleToggle} style={{ marginBottom: '1rem' }}>
          {this.state.open ? 'Close' : 'Open'}
        </Button>
        {this.shortData(this.props.value)}
        <Collapse isOpen={this.state.open}>
          <FigureSelectorList data={this.expandData(this.props.value)} onChange={this.handleChange}/>
        </Collapse>
      </div>    
    );
    
  }
  
}


//    <Button color="primary" onClick={this.handleToggle} style={{ marginBottom: '1rem' }}>
