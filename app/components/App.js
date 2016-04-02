import React from 'react';
import { connect } from 'react-redux'
import * as laneActions from '../dux/lanes'
import Lanes from './Lanes'
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

@DragDropContext(HTML5Backend)
@connect((state) => ({
  lanes: state.lanes
}), {
  ...laneActions
})
export default class App extends React.Component {

  render() {
    const {lanes, createLane} = this.props

    return (
      <div>
        <button
          className={'add-lane'}
          onClick={createLane}
          >+</button>
        <Lanes lanes={lanes}/>
      </div>
    )
  }
}
