# reactimate

### A simple React + Redux + React Router HOC

reactimate allows you to define css classes to be applied to an object when entering and when leaving.


### Lets say we have two components:

##### Home.js

```jsx
import React from 'react';

export default class Home extends React.Component{
	render(){
    	return <h1>Home</h1>
    }
}
```

##### Article.js

```jsx
import React from 'react';

export default class Article extends React.Component{
	render(){
    	return <h1>Article</h1>
    }
}
```

##### Router.js

```jsx
import React from 'react';
import {Router, Route, IndexRoute } from 'react-router'

export let Router = (
	<Router>
    	<Route path="/home" component={Home} />
        <Route path="/article" component={Article} />
    </Router>

)
```

### This works, but it's boring.

Every time the route changes, there is a sudden jump in content, from Home to Article. Let's fix that.


### Now, with super cool sliding motion:

##### Home.js

```jsx
import React from 'react';
import {transition} from 'reactimate';

class Home extends React.Component{
	render(){
    	return <h1>Home</h1>
    }
}

export default transition(Home, {
	key: home,
    willEnter: {classNames: "animated fadeInRightBig"},
    willLeave: {classNames: "animated fadeOutRightBig}",
    duration: 1000
});
```

##### Article.js

```jsx
import React from 'react';
import {transition} from 'reactimate';

export default class Article extends React.Component{
	render(){
    	return <h1>Article</h1>
    }
}

export default transition(Article, {
	key: home,
    willEnter: {classNames: "animated fadeInLeftBig"},
    willLeave: {classNames: "animated fadeOutLeftBig"},
    duration: 1000
});

```

##### Router.js

```jsx
import React from 'react';
import {Router, Route, IndexRoute } from 'react-router'
import {TransitionContainer} from 'reactimate';

export let Router = (
	<Router>
    	<Route path="/" component={TransitionContainer}>
        	<Route path="home" component={Home} />
            <Route path="article" component={Article} />
       </Route>
    </Router>

)
```

##### store.js (it works with Redux!)

```jsx
import { createStore, combineReducers} from 'redux'
import { routerReducer} from 'react-router-redux'
import { transitionReducer} from 'reactimate'

export default createStore(
  combineReducers({
    home:homeReducer,
    article: articleReducer,
    routing: routerReducer,
    transitions: transitionReducer
  })
)

```

### Now it's super slidey!
**Animation classes courtesy of animate.css

### Customization

```jsx
\\ Options:
{
	key: String,
    willEnter:{
    	classNames: String or function (transitionState_from_store) => String
        transitionBegin: callback function (transitionState_from_store, dispatch),
        transitionEnd: callback function (transitionState_from_store, dispatch)
    },
    willLeave:{
    	classNames: String or function (transitionState_from_store) => String
        transitionBegin: callback function (transitionState_from_store, dispatch),
        transitionEnd: callback function (transitionState_from_store, dispatch)
    },
}

```
