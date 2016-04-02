import React from 'react';
import Note from './Note'
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
      <ul className={'notes'} >{laneNotes.map(note => (
          <Note className="note" id={note.id} key={note.id}
            onMove={({sourceId, targetId}) =>
              console.log(`source: ${sourceId}, target: ${targetId}`)
          }>
            <Editable
                editing={note.editing}
                value={note.task}
                onValueClick={onValueClick.bind(null, note.id)}
                onUpdate={onUpdate.bind(null, note.id)}
                onDelete={onDelete.bind(null, note.id)} />
          </Note>
      ))}</ul>
    )
  }

}
