import React from 'react';
import Editable from './Editable'
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
    const {lane, createNote, updateNote, updateLane, deleteLane, ...props} = this.props

    return (
      <div {...props}>
        <div
          className="lane-header"
          onClick={() => !!!lane.editing && updateLane({id: lane.id, editing: true})}>

          <div className="lane-add-note">
            <button onClick={this.addNote.bind(this, lane.id)}>+</button>
          </div>

          <Editable
            className="lane-name"
            editing={lane.editing}
            value={lane.name}
            onUpdate={name => updateLane({id: lane.id, name, editing: false})} />

          <div className="lane-delete">
            <button onClick={() => deleteLane(lane.id)}>x</button>
          </div>
        </div>
        <Notes
          lane={lane}
          onValueClick={id => updateNote({id, editing: true})}
          onUpdate={(id, task) => updateNote({id, task, editing: false})}
          onDelete={id => this.deleteNote(lane.id, id)} />
      </div>
    )
  }

  addNote(laneId, e) {
    e.stopPropagation()
    const o = this.props.createNote()
    this.props.attachToLane(laneId, o.note.id)
  }

  deleteNote(laneId, noteId) {
    this.props.detachFromLane(laneId, noteId);
    this.props.deleteNote(noteId);
  }

}
