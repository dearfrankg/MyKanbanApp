import uuid from 'node-uuid';

//////////////////////////////////
// DUX
// A file that contains constants, action-creators and reducers
//

//////////////////////////////////
// CONSTANTS
//
export const CREATE_NOTE = 'CREATE_NOTE'
export const UPDATE_NOTE = 'UPDATE_NOTE'
export const DELETE_NOTE = 'DELETE_NOTE'


//////////////////////////////////
// ACTION CREATORS
//
function action(type, payload = {}) {
  return {type, ...payload}
}

export const createNote = () => action(CREATE_NOTE, {note: {id: uuid.v4(), task: 'New Note'}})
export const updateNote = (id, task) => action(UPDATE_NOTE, {id, task})
export const deleteNote = id => action(DELETE_NOTE, {id})


////////////////////////////////
// REDUCERS
//
export default (state = [], action) => {
  switch(action.type) {
    case CREATE_NOTE:
      return [...state, action.note]

    case UPDATE_NOTE:
      return state.map(note => {
        if (note.id === action.id) {
          return {...note, task: action.task}
        }
        return note
      })

    case DELETE_NOTE:
      return state.filter(note => note.id !== action.id)

    default:
      return state
  }
}
