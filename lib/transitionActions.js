'use strict';

module.exports.REGISTER_COMPONENT_ACTION = '@@reactimate/REGISTER_COMPONENT';
module.exports.DESTROY_COMPONENT_ACTION = '@@reactimate/DESTROY_COMPONENT';
module.exports.WILL_ENTER = 'WILL_ENTER';
module.exports.WILL_LEAVE = 'WILL_LEAVE';
module.exports.TRANSITION_COMPLETE = 'TRANSITION_COMPLETE';
module.exports.WILL_ENTER_ACTION = '@@reactimate/WILL_ENTER';
module.exports.WILL_LEAVE_ACTION = '@@reactimate/WILL_LEAVE';
module.exports.TRANSITION_COMPLETE_ACTION = '@@reactimate/TRANSITION_COMPLETE';

module.exports.willEnter = function (key) {
  return { type: WILL_ENTER_ACTION, key: key };
};
module.exports.willLeave = function (key) {
  return { type: WILL_LEAVE_ACTION, key: key };
};
module.exports.transitionComplete = function (key) {
  return { type: TRANSITION_COMPLETE_ACTION, key: key };
};
module.exports.registerComponent = function (key) {
  return { type: REGISTER_COMPONENT_ACTION, key: key };
};
module.exports.destroyComponent = function (key) {
  return { type: DESTROY_COMPONENT_ACTION, key: key };
};