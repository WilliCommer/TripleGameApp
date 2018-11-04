import React from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import FigureSelector from './figure-selector.js';

export default class GamePropForm extends React.Component {

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <InputName value={this.props.data.name} change={this.props.change} />
        <InputDescription value={this.props.data.description} change={this.props.change} />
        <InputSize value={this.props.data.board_size} change={this.props.change} /> 
        <InputInitialCount value={this.props.data.initial_count} change={this.props.change} />
        <InputInitialFigures value={this.props.data.initial_figures} change={this.props.change} />
        <InputNextFigures value={this.props.data.next_figures} change={this.props.change} />
      </Form>
    );
  }
}

//         <InputSize value={this.props.board_size} change={this.props.change} /> 

 
function InputName (props) {
  return (
    <FormGroup>
     <Label>Name</Label>
     <Input type="text" name="name"  value={props.value}  onChange={props.change} placeholder="give it a name" />
   </FormGroup>
  );          
}          
  
function InputDescription (props) {
  return (
    <FormGroup>
      <Label>Description</Label>
      <Input type="textarea" name="description" value={props.value}  onChange={props.change}/>
    </FormGroup>
  );          
}          
  
function InputSize (props) {
  return (
    <FormGroup>
      <Label>Size X Y</Label>
      <div className="form-row">
        <div className="col">
          <Input type="number" name="board_size_x" value={props.value.x} onChange={props.change} min="1" max="9" step="1" />
        </div>  
        <div className="col">
          <Input type="number" name="board_size_y" value={props.value.y} onChange={props.change} min="1" max="9" step="1" />
        </div>  
      </div>
    </FormGroup>
  );
 }          
 
 
function InputInitialCount (props) {
  return (
    <FormGroup>
      <Label>Number of random figures at start</Label>
      <Input type="number" name="initial_count" value={props.value} onChange={props.change} min="0" max="100" step="1" />
    </FormGroup>
  );
}          
 
         
function InputInitialFigures (props) {
  return (
    <FormGroup>
      <Label>Possible figures at start</Label>
      <FigureSelector name="initial_figures" value={props.value} kind="1" onChange={props.change}  />
    </FormGroup>
  );
} 

function InputNextFigures (props) {
  return (
    <FormGroup>
      <Label>Possible figures during game</Label>
      <FigureSelector name="next_figures" value={props.value} kind="2" onChange={props.change}  />
    </FormGroup>
  );
} 

/*
function InputInitialFigures (props) {
  return (
    <FormGroup>
      <Label>Possible figures at start</Label>
      <div id="gamePropInitialFigures" />
    </FormGroup>
  );
}          
*/