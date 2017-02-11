'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require("react");
var merge = require('lodash.merge');
var classnames = require('classnames');
var actions = require("./transitionActions.js");
function transition(WrappedComponent, options) {
  var _class, _temp;

  return _temp = _class = function (_React$Component) {
    _inherits(Transition, _React$Component);

    function Transition(props) {
      _classCallCheck(this, Transition);

      var _this = _possibleConstructorReturn(this, (Transition.__proto__ || Object.getPrototypeOf(Transition)).call(this, props));

      _this.state = {
        willLeave: false,
        willEnter: false,
        key: options.key
      };
      return _this;
    }

    _createClass(Transition, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        this.props.dispatch(actions.registerComponent(this.state.key));
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this.props.dispatch(actions.destroyComponent(this.state.key));
      }
    }, {
      key: 'resetState',
      value: function resetState() {
        this.setState(merge(this.state, {
          willLeave: false,
          willEnter: false
        }));
      }
    }, {
      key: 'doTransition',
      value: function doTransition(callback, optionSlice, willLeave, willEnter) {
        var _this2 = this;

        var _props = this.props,
            transitionState = _props.transitionState,
            dispatch = _props.dispatch;

        if (optionSlice.transitionBegin) {
          optionSlice.transitionBegin(transitionState, dispatch);
        }
        if (willLeave) {
          dispatch(actions.willLeave(this.state.key));
        } else if (willEnter) {
          dispatch(actions.willEnter(this.state.key));
        }
        this.setState(merge(this.state, {
          willLeave: willLeave,
          willEnter: willEnter
        }));
        setTimeout(function () {
          if (optionSlice.transitionComplete) {
            optionSlice.transitionComplete(transitionState, dispatch);
          }
          dispatch(actions.transitionComplete(_this2.state.key));
          _this2.resetState();
          callback();
        }, optionSlice.duration);
      }
    }, {
      key: 'componentWillLeave',
      value: function componentWillLeave(callback) {
        this.doTransition(callback, options.willLeave, true, false);
      }
    }, {
      key: 'componentWillEnter',
      value: function componentWillEnter(callback) {
        this.doTransition(callback, options.willEnter, false, true);
      }
    }, {
      key: 'render',
      value: function render() {

        var willEnterClasses = typeof options.willEnter.classNames === "function" ? options.willEnter.classNames(this.props.transitionState) : options.willEnter.classNames;
        var willLeaveClasses = typeof options.willLeave.classNames === "function" ? options.willLeave.classNames(this.props.transitionState) : options.willLeave.classNames;
        var classes = classnames(_defineProperty({}, willEnterClasses, this.state.willEnter), _defineProperty({}, willLeaveClasses, this.state.willLeave));
        return React.createElement(WrappedComponent, _extends({ animationClasses: classes }, this.props));
      }
    }]);

    return Transition;
  }(React.Component), _class.displayName = 'Transition(' + WrappedComponent.displayName + ')', _temp;
}

module.exports = transition;