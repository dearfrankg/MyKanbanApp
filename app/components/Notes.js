import React from 'react';
import Note from './Note'
import { connect } from 'react-redux'
import * as noteActions from '../dux/notes'

@connect((state) => ({
  allNotes: state.notes
}), {
  ...noteActions
})
export default class Notes extends React.Component {

  render() {
    const {allNotes, lane, updateNote, deleteNote} = this.props

    const laneNotes = lane.notes
        .map(id => allNotes[ allNotes.findIndex((note) => note.id === id) ])
        .filter(note => note)

    return (
      <ul className={'notes'} >
        {laneNotes.map(note => (
          <li className={'note'} key={note.id} >
            <Note
              task={note.task}
              onUpdate={updateNote.bind(null, note.id)}
              onDelete={deleteNote.bind(null, note.id)} />
          </li>
        ))}
      </ul>
    )
  }

}
