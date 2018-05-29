import React, { Component } from 'react';
import ReactDom from 'react-dom';
import Button from '@material-ui/core/Button';
import "../styles.css";

class Post extends Component {
    constructor(props) {
        super(props);
        this.Delete = this.Delete.bind(this)
    }
    state = {
        id: ''
    }

    Delete() {
        let id = this.props.id;
        const data = {
            id
        }
        const json  = JSON.stringify(data)
        console.log(json);

        fetch(`http://localhost:3001/api/deleteBook`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "text/plain"
            },
            body: json
        })
        .then(res => res.text())
        .then(parsedRes => console.log(parsedRes))
        .catch(err => console.log(err))
    }

    render() {
      const {name} = this.props;
        console.log(this.props)
        return(
            <article className="PostContainer">
                <div className="innerContainer">
                <header className="header">
                    <h1>{name}</h1>
                    <sub>{this.props.authorName}</sub>
                    <p>{this.props.price}</p>
                    <p>{this.props.id}</p>
                </header>
                <div>
                    <p>{this.props.description}</p>    
                </div> 
                <Button variant="raised" color="primary" onClick={this.Delete}>
                    Delete
                </Button> 
                </div>          
            </article>
        )
    }
}

export default Post;