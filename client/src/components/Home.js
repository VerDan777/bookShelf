import React, { Component } from 'react';
import ReactDom from 'react-dom';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
// import PostList from './components/PostList';
import { TextField } from '@material-ui/core';


const classes = {
    marginTop: 10
}


class App extends Component {

  state = {
    name: '',
    nameAuthor: '',
    price: '',
    data: [],
    pressed: false
  }

  componentDidMount() {
    fetch('http://localhost:3001/api/books', {
        method: "GET",
        headers: {
          "Accept": "application/json"
        },
      })
      .then(res => res.json())
      .then(parsedRes => { 
        this.setState({data: parsedRes})
        console.log(this.state.data)
      })
      .catch(err => console.log(err))
  }

  getImmendiatly = () => {
    if(this.state.pressed) {
      fetch('http://localhost:3001/api/books', {
        method: "GET",
        headers: {
          "Accept": "application/json"
        },
      })
      .then(res => res.json())
      .then(parsedRes => { 
        this.setState({data: parsedRes})
        console.log(this.state.data)
      })
      .catch(err => console.log(err))
    }
  }

  postBook = () => {
    const data = {
      name: this.state.name,
      author: this.state.nameAuthor,
      price: this.state.price,
    };
    const name= data.name;
    const author = data.author;
    const price = data.price;

    // axios.get(`http://localhost:3001/api/book?name=${name}&authorName=${author}&price=${price}`)
    // .then(res => {
    //   this.setState({
    //     pressed: true
    //   })
    //   this.getImmendiatly();
    // })
    // .catch(err => console.log(err))
  }

  onChangeValName = (event) => {
    this.setState({
      name: event.target.value
    })
    console.log(this.state)
    
  }
  
  onChangeValPrice = (event) => {
    this.setState({
      price: event.target.value
    })
    console.log(this.state.price)
    
  }

  onChangeValNameAuthor = (event) => {
    this.setState({
      nameAuthor: event.target.value
    })
    console.log(this.state.nameAuthor)
  }


  render() {
    return (
        <div className="App">
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography variant="title" color="inherit">
              BookShelf
            </Typography>
          </Toolbar>
        </AppBar>
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className={classes.root}>
      </div>
      <div>
            <div className="mainForm">
            <TextField
              id="name"
              label="Имя"
              className="field"
              value={this.state.name}
              onChange={this.onChangeValName}
              margin="normal"
             />
              <TextField
              id="name"
              label="Имя автора"
              className="field"
              value={this.state.nameAuthor}
              onChange={this.onChangeValNameAuthor}
              margin="normal"
             />
              <TextField
                id="name"
                label="Прайс"
                className="field"
                value={this.state.price}
                onChange={this.onChangeValPrice}
                margin="normal"
              />
                <Button color="primary" variant="raised" onClick={this.postBook}>Отправить</Button>
              </div>
          </div>
      </div>
    );
  }
}

export default App;