import uuid from 'node-uuid';

//////////////////////////////////
// DUX
// A file that contains constants, action-creators and reducers
//

//////////////////////////////////
// CONSTANTS
//
export const CREATE_LANE = 'CREATE_LANE'
export const ATTACH_TO_LANE = 'ATTACH_TO_LANE'
export const DETACH_FROM_LANE = 'DETACH_FROM_LANE'


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
export const attachToLane = (laneId, noteId) => action(ATTACH_TO_LANE, {laneId, noteId})
export const detachFromLane = (laneId, noteId) => action(DETACH_FROM_LANE, {laneId, noteId})


////////////////////////////////
// REDUCERS
//
export default (state = [], action) => {
  switch(action.type) {
    case CREATE_LANE:
      return [...state, action.lane];

    case ATTACH_TO_LANE:
      return state.map(lane => {
        if(lane.id === action.laneId) {
          if(lane.notes.includes(action.noteId)) {
            console.warn('Already attached note to lane', lanes);
          }
          else {
            return {...lane, notes: [...lane.notes, action.noteId]}
          }
        }

        return lane;
      });

    case DETACH_FROM_LANE:
      return state.map(lane => {
        if(lane.id === action.laneId) {
          lane.notes = lane.notes.filter(note => note !== action.noteId)
        }

        return lane;
      })

    default:
      return state
  }
}
