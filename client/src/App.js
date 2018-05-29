import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {

  state = {
    name: '',
    nameAuthor: '',
    ownerID: '',
    review: '',
    rating: '',
    price: ''
  }

  componentWillMount() {
    fetch('http://localhost:3001/api/books')
    .then(res => console.log(res))
    .catch(err => console.log(err))
  }

  postBook = () => {
    const data = {
      name: this.state.name,
      author: this.state.nameAuthor,
      review: this.state.review,
      rating: this.state.rating,
      price: this.state.price,
      ownerID: this.state.ownerID
    };
    const name= data.name;
    const author = data.author;
    const review = data.review;
    const rating = data.rating;
    const price = data.price;
    const ownerID = data.ownerID;

    axios.get(`http://localhost:3001/api/book?name=${name}&author=${author}&review=${review}&rating=${review}&price=${price}&ownerID=${ownerID}&rating=${rating}`)
    .then(res => console.log(res.data))
    .catch(err => console.log(err))
  }

  onChangeValName = (event) => {
    this.setState({
      name: event.target.value
    })
    console.log(this.state)
    
  }

  onChangeValRating = (event) => {
    this.setState({
      rating: event.target.value
    })
    console.log(this.state.rating)
    
  }
  
  onChangeValPrice = (event) => {
    this.setState({
      price: event.target.value
    })
    console.log(this.state.price)
    
  }

  onChangeValOwnerId = (event) => {
    this.setState({
      ownerID: event.target.value,
    })
    console.log(this.state.ownerID)
  }


  onChangeValReview = (event) => {
    this.setState({
      review: event.target.value
    })
    console.log(this.state.review)
    
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
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <form action="" method="GET">

          <label for="name" >
            Имя 
            <input type="text" name="name" id="name" placeholder="Введите имя книги" onChange={this.onChangeValName} className="input"/>
          </label>

          <label for="name" >
           Имя автора 
            <input type="text" name="nameAuthor" id="nameAuthor" placeholder="Введите имя автора" onChange={this.onChangeValNameAuthor} className="input"/>
          </label>

          <label for="name" >
            Обзор 
            <input type="text" name="review" id="review" placeholder="Введите обзор" onChange={this.onChangeValReview} className="input"/>
          </label>

          <label for="name" >
            Рейтинг 
            <input type="text" name="rating" id="rating" placeholder="Введите рейтинг" onChange={this.onChangeValRating} className="input"/>
          </label>

          <label for="name" >
            Цена 
            <input type="text" name="price" id="price" placeholder="Введите цену" onChange={this.onChangeValPrice} className="input"/>
          </label>

          <label for="name" >
            ID владельца 
            <input type="text" name="ownerID" id="ownerID" placeholder="Введите id владельца" onChange={this.onChangeValOwnerId} className="input"/>
          </label>

          <input type="submit" value="submit" onClick={this.postBook}/>
        </form>
      </div>
    );
  }
}

export default App;
