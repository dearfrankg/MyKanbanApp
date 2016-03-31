import uuid from 'node-uuid';

//////////////////////////////////
// DUX
// A file that contains constants, action-creators and reducers
//

//////////////////////////////////
// CONSTANTS
//
export const CREATE_LANE = 'CREATE_LANE'


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


////////////////////////////////
// REDUCERS
//
export default (state = [], action) => {
  switch(action.type) {
    case CREATE_LANE:
      return [...state, action.lane];

    default:
      return state
  }
}
