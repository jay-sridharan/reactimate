var React = require('react');
var TransitionGroup = require('react-addons-transition-group');
var connect = require('react-redux').connect;

var childFactoryMaker = (transitionState,dispatch) => (child) => (
   React.cloneElement(child, {
    key: (child.props.route.path + "//" + child.type.displayName),
    transitionState: transitionState,
    dispatch: dispatch
  })
)

class TransitionContainer extends React.Component{
  render(){
    let{
      transitionState,
      dispatch,
      children,
      style
    } = this.props
    return(
      <div >
      <TransitionGroup component="div" style={style} childFactory={childFactoryMaker(transitionState,dispatch)}>
      {
        React.Children.map(this.props.children,
            (child) => React.cloneElement(child,
                { key: child.type.displayName}
            )
        )
      }
      </TransitionGroup>
      </div>
    )
  }
}

module.exports = connect(
  (state)=>({transitionState:state.transitions}),
  (dispatch)=>({dispatch:dispatch})
)(TransitionContainer)
