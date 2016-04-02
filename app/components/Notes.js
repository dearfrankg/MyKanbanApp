import React from 'react';
import Editable from './Editable'
import { connect } from 'react-redux'
import * as noteActions from '../dux/notes'

@connect((state) => ({
  allNotes: state.notes
}), {
  ...noteActions
})
export default class Notes extends React.Component {

  render() {
    const {allNotes, lane, onValueClick, onUpdate, onDelete} = this.props

    const laneNotes = lane.notes
        .map(id => allNotes[ allNotes.findIndex((note) => note.id === id) ])
        .filter(note => note)

    return (
      <ul className={'notes'} >
        {laneNotes.map(note => (
          <li className={'note'} key={note.id} >
            <Editable
                editing={note.editing}
                value={note.task}
                onValueClick={onValueClick.bind(null, note.id)}
                onUpdate={onUpdate.bind(null, note.id)}
                onDelete={onDelete.bind(null, note.id)} />
          </li>
        ))}
      </ul>
    )
  }

}
