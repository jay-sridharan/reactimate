var actions = require("./transitionActions.js");

const initialState = {
  home: actions.TRANSITION_COMPLETE,
  bom: actions.TRANSITION_COMPLETE
};

const handlers = {

  [actions.WILL_LEAVE_ACTION]: (state,action) => ({[action.key]: actions.WILL_LEAVE}),
  [actions.WILL_ENTER_ACTION]: (state,action) => ({[action.key]: actions.WILL_ENTER}),
  [actions.TRANSITION_COMPLETE_ACTION]: (state,action) => ({[action.key]: actions.TRANSITION_COMPLETE}),
  [actions.REGISTER_COMPONENT_ACTION]: (state,action) => ({[action.key]:  actions.TRANSITION_COMPLETE}),
  [actions.DESTROY_COMPONENT_ACTION] : (state,action) => ({[action.key]: undefined})
};

module.exports = function (state = initialState, action) {
  let handler = handlers[action.type];
  if (!handler) return state;
  return { ...state, ...handler(state, action) };
};
