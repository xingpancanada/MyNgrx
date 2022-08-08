export const orderListReducer = (state = [], action) => {
  switch (action.type) {
    case '[Order] add':
      return [ ...state, { ...action.payload }];
    default:
      return state;
  }
}

export const orderSelectReducer = (state = null, action) => {
  switch(action.type) {
    case '[Order] select':
      return action.payload;
    default:
      return state;
  }
}
