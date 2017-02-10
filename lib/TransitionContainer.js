'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var TransitionGroup = require('react-addons-transition-group');
var connect = require('react-redux').connect;

var childFactoryMaker = function childFactoryMaker(transitionState, dispatch) {
  return function (child) {
    return React.cloneElement(child, {
      key: child.props.route.path + "//" + child.type.displayName,
      transitionState: transitionState,
      dispatch: dispatch
    });
  };
};

var TransitionContainer = function (_React$Component) {
  _inherits(TransitionContainer, _React$Component);

  function TransitionContainer() {
    _classCallCheck(this, TransitionContainer);

    return _possibleConstructorReturn(this, (TransitionContainer.__proto__ || Object.getPrototypeOf(TransitionContainer)).apply(this, arguments));
  }

  _createClass(TransitionContainer, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          transitionState = _props.transitionState,
          dispatch = _props.dispatch,
          children = _props.children,
          style = _props.style;

      return React.createElement(
        'div',
        null,
        React.createElement(
          TransitionGroup,
          { component: 'div', style: style, childFactory: childFactoryMaker(transitionState, dispatch) },
          React.Children.map(this.props.children, function (child) {
            return React.cloneElement(child, { key: child.type.displayName });
          })
        )
      );
    }
  }]);

  return TransitionContainer;
}(React.Component);

module.exports = connect(function (state) {
  return { transitionState: state.transitions };
}, function (dispatch) {
  return { dispatch: dispatch };
})(TransitionContainer);