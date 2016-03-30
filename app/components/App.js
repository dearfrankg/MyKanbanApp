import React from 'react';
import Note from './Note.js';
import { connect } from 'react-redux'
import * as noteActions from '../dux/notes'
import Notes from './Notes'

@connect((state) => ({}), {
  ...noteActions
})
export default class App extends React.Component {

  render() {
    const {createNote} = this.props

    return (
      <div>
        <button
          className={'add-note'}
          onClick={createNote}
          >+</button>
        <Notes />
      </div>
    )
  }
}
