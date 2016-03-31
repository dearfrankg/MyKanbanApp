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
      <div>
      Lanes go here
      </div>

    )
  }

}
