import React from 'react';
import { Table, Button, Alert } from 'react-bootstrap';
import { API_BASE_URL } from './config'

class Books extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      products: [],
      response: {}
    }
  }

  componentDidMount() {
    const apiUrl = API_BASE_URL + '/books';

    fetch(apiUrl)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            products: result
          });
        },
        (error) => {
          this.setState({ error });
        }
      )
  }

  deleteProduct(bookId) {
    const { products } = this.state;

    const apiUrl = API_BASE_URL + '/book/delete';
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
            response: result,
            products: products.filter(product => product.id !== bookId)
          });
        },
        (error) => {
          this.setState({ error });
        }
      )
  }

  render() {
    const { error, products} = this.state;

    if(error) {
      return (
        <div>Error: {error.message}</div>
      )
    } else {
      return(
        <div>
          <h2>Book List</h2>
          {this.state.response.message && <Alert variant="info">{this.state.response.message}</Alert>}
          <Table>
            <thead>
              <tr>
                <th>#ID</th>
                <th>Name</th>
                <th>Author</th>
                <th>Price</th>
				<th>isbn</th>
				<th>availability</th>
				
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.author}</td>
                  <td>{product.price}</td>
				  <td>{product.isbn}</td>
				  <td>{product.availability ? 'available' : 'not available' }</td>
                  <td>
                    <Button variant="info" onClick={() => this.props.editProduct(product.id)}>Edit</Button>
                    &nbsp;<Button variant="danger" onClick={() => this.deleteProduct(product.id)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )
    }
  }
}

export default Books;