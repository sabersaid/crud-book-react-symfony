import React, { Component } from 'react';
import './App.css';
import { Row, Form, Col, Grid, Button, Alert } from 'react-bootstrap';
import Books from './Books';
import AddBook from './AddBook';

import { API_BASE_URL } from './config';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAddBook: false,
      error: null,
      response: {},
      product: {},
      isEditProduct: false
    }
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onCreate() {
    this.setState({ isAddBook: true });
  }

  onFormSubmit(data) {
    let apiUrl;

    if(this.state.isEditProduct){
      apiUrl = API_BASE_URL + '/editbook';
    } else {
      apiUrl = API_BASE_URL + '/createbook';
    }

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
	myHeaders.append('X-Requested-With', 'XMLHttpRequest');
	

    const options = {
      method: 'POST',
      body: JSON.stringify(data),
      myHeaders
    };

    fetch(apiUrl, options)
      .then(res => res.json())
      .then(result => {
        this.setState({
          response: result,
          isAddBook: false,
          isEditProduct: false
        })
      },
      (error) => {
        this.setState({ error });
      }
    )
  }

  editProduct = bookId => {

    const apiUrl = API_BASE_URL + '/book/getbook';
    const formData = new FormData();
    formData.append('bookId', bookId);

    const options = {
      method: 'POST',
      body: formData
    }

    fetch(apiUrl, options)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            product: result,
            isEditProduct: true,
            isAddBook: true
          });
        },
        (error) => {
          this.setState({ error });
        }
      )
  }

  render() {

    let productForm;
    if(this.state.isAddBook || this.state.isEditProduct) {
      productForm = <AddBook onFormSubmit={this.onFormSubmit} product={this.state.product} />
    }

    return (
      <div className="App">
        <Grid>
          <h1 style={{textAlign:'center'}}>React/Symfony Task</h1>
          {!this.state.isAddBook && <Button variant="primary" onClick={() => this.onCreate()}>Add Book</Button>}
          {this.state.response.status === 'success' && <div><br /><Alert variant="info">{this.state.response.message}</Alert></div>}
          {!this.state.isAddBook && <Books editProduct={this.editProduct}/>}
          { productForm }
          {this.state.error && <div>Error: {this.state.error.message}</div>}
        </Grid>
      </div>
    );
  }
}

export default App;
