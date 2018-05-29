import React, { Component } from 'react';
import ReactDom from 'react-dom';
import Post from './Post';

class PostList extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        data: null
    }

    // componentDidMount() {
    //     fetch('http://localhost:3001/api/books', {
    //         method: "GET",
    //         headers: {
    //           "Accept": "application/json"
    //         },
    //       })
    //       .then(res => res.json())
    //       .then(parsedRes => { 
    //         this.setState({data: parsedRes})
    //         console.log(this.state)
    //       })
    //       .catch(err => console.log(err))
    //   }

    render() {
        return(
            <div>
                {this.props.data.map((post, key) => {
                    return <Post name={post.name} price={post.price} authorName={post.authorName} id={post._id}/>
                })}
            </div>
        )
    }
}

export default PostList;