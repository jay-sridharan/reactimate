"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _handlers;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var actions = require("./transitionActions.js");

var initialState = {
  home: actions.TRANSITION_COMPLETE,
  bom: actions.TRANSITION_COMPLETE
};

var handlers = (_handlers = {}, _defineProperty(_handlers, actions.WILL_LEAVE_ACTION, function (state, action) {
  return _defineProperty({}, action.key, actions.WILL_LEAVE);
}), _defineProperty(_handlers, actions.WILL_ENTER_ACTION, function (state, action) {
  return _defineProperty({}, action.key, actions.WILL_ENTER);
}), _defineProperty(_handlers, actions.TRANSITION_COMPLETE_ACTION, function (state, action) {
  return _defineProperty({}, action.key, actions.TRANSITION_COMPLETE);
}), _defineProperty(_handlers, actions.REGISTER_COMPONENT_ACTION, function (state, action) {
  return _defineProperty({}, action.key, actions.TRANSITION_COMPLETE);
}), _defineProperty(_handlers, actions.DESTROY_COMPONENT_ACTION, function (state, action) {
  return _defineProperty({}, action.key, undefined);
}), _handlers);

module.exports = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  var handler = handlers[action.type];
  if (!handler) return state;
  return _extends({}, state, handler(state, action));
};