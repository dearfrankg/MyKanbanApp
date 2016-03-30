import React from 'react';
import Note from './Note'
import { connect } from 'react-redux'
import * as noteActions from '../dux/notes'

@connect((state) => ({
  notes: state.notes
}), {
  ...noteActions
})
export default class Notes extends React.Component {

  render() {
    const {notes, updateNote, deleteNote} = this.props

    return (
      <ul className={'notes'} >
        {notes.map(note => (
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
