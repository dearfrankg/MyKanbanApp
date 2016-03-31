import React from 'react';
import Notes from './Notes'
import { connect } from 'react-redux'
import * as laneActions from '../dux/lanes'
import * as noteActions from '../dux/notes'

@connect((state) => ({}), {
  ...laneActions,
  ...noteActions
})
export default class Lane extends React.Component {

  render() {
    const {lane, createNote, ...props} = this.props

    return (
      <div {...props}>
        <div className="lane-header">
          <div className="lane-add-note">
            <button onClick={this.addNote.bind(this, lane.id)}>+</button>
          </div>
          <div className="lane-name">{lane.name}</div>
        </div>
        <Notes lane={lane}/>
      </div>
    )
  }

  addNote(laneId, e) {
    e.stopPropagation()
    const o = this.props.createNote()
    this.props.attachToLane(laneId, o.note.id)
  }

}
