const initialState = "";

const tokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SAVE_TOKEN":
      return action.payload;
    default:
      return state;
  }
}

export default tokenReducer;