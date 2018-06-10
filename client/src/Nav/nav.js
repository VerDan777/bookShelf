import React from 'react';
import { Route} from 'react-router-dom';
import Books from '../components/Books';
import Home from '../components/Home';

const Nav = (props) => {
    return(
        <div>
         <Route exact path="/" component={Home} />
         <Route path="/books" component={Books}/>
        </div>
    )
}

export default Nav;