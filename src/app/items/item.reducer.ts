export const listReducer = (state = [], action) => {
  switch (action.type) {
    case '[Item] add':
      return [ ...state, { ...action.payload }];
    default:
      return state;
  }
}

export const selectReducer = (state = null, action) => {
  switch(action.type) {
    case '[Item] select':
      return action.payload;
    default:
      return state;
  }
}
