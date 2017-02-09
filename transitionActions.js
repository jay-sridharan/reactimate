module.exports.REGISTER_COMPONENT_ACTION = '@@css-transitions/REGISTER_COMPONENT';
module.exports.DESTROY_COMPONENT_ACTION = '@@css-transitions/DESTROY_COMPONENT';
module.exports.WILL_ENTER = 'WILL_ENTER';
module.exports.WILL_LEAVE = 'WILL_LEAVE';
module.exports.TRANSITION_COMPLETE = 'TRANSITION_COMPLETE';
module.exports.WILL_ENTER_ACTION = '@@css-transitions/WILL_ENTER';
module.exports.WILL_LEAVE_ACTION = '@@css-transitions/WILL_LEAVE';
module.exports.TRANSITION_COMPLETE_ACTION = '@@css-transitions/TRANSITION_COMPLETE';

module.exports.willEnter = (key) => ({type: WILL_ENTER_ACTION, key: key})
module.exports.willLeave = (key) => ({type: WILL_LEAVE_ACTION, key: key})
module.exports.transitionComplete = (key) => ({type: TRANSITION_COMPLETE_ACTION, key: key})
module.exports.registerComponent = (key) => ({type: REGISTER_COMPONENT_ACTION, key: key})
module.exports.destroyComponent = (key) => ({type: DESTROY_COMPONENT_ACTION, key: key})
