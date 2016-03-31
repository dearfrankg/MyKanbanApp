import React from 'react';
import { connect } from 'react-redux'
import * as laneActions from '../dux/lanes'
import Lanes from './Lanes'

@connect((state) => ({}), {
  ...laneActions
})
export default class App extends React.Component {

  render() {
    const {createLane} = this.props

    return (
      <div>
        <button
          className={'add-lane'}
          onClick={createLane}
          >+</button>
        <Lanes />
      </div>
    )
  }
}
