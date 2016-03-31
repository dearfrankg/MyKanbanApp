import React from 'react';
import { connect } from 'react-redux'
import * as laneActions from '../dux/lanes'
import Lanes from './Lanes'

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
