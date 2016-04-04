import uuid from 'node-uuid'
import update from 'react-addons-update'

//////////////////////////////////
// DUX
// A file that contains constants, action-creators and reducers
//

//////////////////////////////////
// CONSTANTS
//
export const CREATE_LANE = 'CREATE_LANE'
export const UPDATE_LANE = 'UPDATE_LANE'
export const DELETE_LANE = 'DELETE_LANE'
export const ATTACH_TO_LANE = 'ATTACH_TO_LANE'
export const DETACH_FROM_LANE = 'DETACH_FROM_LANE'
export const MOVE = 'MOVE'


//////////////////////////////////
// ACTION CREATORS
//
function action(type, payload = {}) {
  return {type, ...payload}
}

export const createLane = () => action(CREATE_LANE, {
  lane: {
    id: uuid.v4(),
    notes: [],
    name: 'New Lane'
  }
})
export const updateLane = (updatedLane) => action(UPDATE_LANE, {...updatedLane})
export const deleteLane = id => action(DELETE_LANE, {id})
export const attachToLane = (laneId, noteId) => action(ATTACH_TO_LANE, {laneId, noteId})
export const detachFromLane = (laneId, noteId) => action(DETACH_FROM_LANE, {laneId, noteId})
export const move = ({sourceId, targetId}) => action(MOVE, {sourceId, targetId})


////////////////////////////////
// REDUCERS
//
export default (state = [], action) => {
  switch(action.type) {
    case CREATE_LANE:
      return [...state, action.lane]

    case UPDATE_LANE:
      return state.map((lane) => {
        if(lane.id === action.id) {
          return {...lane, ...action}
        }

        return lane
      })

    case DELETE_LANE:
      return state.filter((lane) => lane.id !== action.id)

    case ATTACH_TO_LANE:
      return state.map(lane => {
        if(lane.id === action.laneId) {
          if(lane.notes.includes(action.noteId)) {
            console.warn('Already attached note to lane', lanes)
          }
          else {
            return {...lane, notes: [...lane.notes, action.noteId]}
          }
        }

        return lane
      })

    case DETACH_FROM_LANE:
      return state.map(lane => {
        if(lane.id === action.laneId) {
          lane.notes = lane.notes.filter(note => note !== action.noteId)
        }

        return lane
      })

    case MOVE:
      const {sourceId, targetId} = action
      const lanes = state
      const sourceLane = lanes.filter((lane) => lane.notes.includes(sourceId))[0]
      const targetLane = lanes.filter((lane) => lane.notes.includes(targetId))[0]
      const sourceNoteIndex = sourceLane.notes.indexOf(sourceId)
      const targetNoteIndex = targetLane.notes.indexOf(targetId)

      if(sourceLane === targetLane) {
        return state.map((lane) => {
          return lane.id === sourceLane.id
            ? {...lane,
                notes: update(sourceLane.notes, {
                  $splice: [
                    [sourceNoteIndex, 1],
                    [targetNoteIndex, 0, sourceId]
                  ]
                })
              }
            : lane
        })
      }
      else {
        return state.map((lane) => {

          if (lane === sourceLane) {
            // get rid of the source note
            return {...lane,
              notes: lane.notes.length > 1
                ? lane.notes
                    .slice(0, sourceNoteIndex)
                    .concat(lane.notes.slice(sourceNoteIndex + 1))
                : []
            }
          }

          if (lane === targetLane) {
            // and move it to target
            return {...lane,
              notes: lane.notes
                .slice(0, sourceNoteIndex)
                .concat([sourceId])
                .concat(lane.notes.slice(sourceNoteIndex))
            }
          }

          return lane

        })
      }
      return state

    default:
      return state
  }
}
