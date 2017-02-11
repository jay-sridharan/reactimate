var React = require("react");
var merge = require( 'lodash.merge');
var classnames = require( 'classnames');
var actions = require("./transitionActions.js");
function transition(WrappedComponent, options) {
  return class Transition extends React.Component {
    static displayName = `Transition(${(WrappedComponent).displayName})`;
    constructor(props) {
      super(props);
      this.state = {
          willLeave:false,
          willEnter:false,
          key: options.key
      };
    }
    componentWillMount(){
      this.props.dispatch(actions.registerComponent(this.state.key))
    }
    componentWillUnmount(){
      this.props.dispatch(actions.destroyComponent(this.state.key))
    }
    resetState(){
      this.setState(merge(this.state,{
        willLeave: false,
        willEnter: false
      }));
    }
    doTransition(callback,optionSlice,willLeave,willEnter){
      let {transitionState,dispatch} = this.props;
      if(optionSlice.transitionBegin){
        optionSlice.transitionBegin(transitionState,dispatch)
      }
      if(willLeave){
        dispatch(actions.willLeave(this.state.key))
      }
      else if(willEnter){
        dispatch(actions.willEnter(this.state.key))
      }
      this.setState(merge(this.state,{
        willLeave: willLeave,
        willEnter: willEnter
      }));
      setTimeout(()=>{
        if(optionSlice.transitionComplete){
          optionSlice.transitionComplete(transitionState,dispatch);
        }
        dispatch(actions.transitionComplete(this.state.key))
        this.resetState();
        callback();
      },optionSlice.duration);
    }
    componentWillLeave(callback){
      this.doTransition(callback,options.willLeave,true,false)
    }
    componentWillEnter(callback){
      this.doTransition(callback,options.willEnter,false,true)
    }
    render() {

      var willEnterClasses =
        typeof options.willEnter.classNames ==="function" ?
          options.willEnter.classNames(this.props.transitionState) :
          options.willEnter.classNames
      var willLeaveClasses =
        typeof options.willLeave.classNames ==="function" ?
          options.willLeave.classNames(this.props.transitionState) :
          options.willLeave.classNames
      var classes = classnames(
        {[willEnterClasses] : this.state.willEnter},
        {[willLeaveClasses] : this.state.willLeave},
      )
      return <WrappedComponent animationClasses={classes} {...this.props}/>
    }
  }
}


module.exports = transition;
