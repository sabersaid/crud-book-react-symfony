import React from 'react';
import { Row, Form, Col, Button } from 'react-bootstrap';


class AddBook extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = {
      id: '',
      name: '',
      price: '',
      author: '',
	  availability: 'empty'
    }

    if(props.product){
      this.state = props.product
    } else {
      this.state = this.initialState;
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onFormSubmit(this.state);
	console.log(this.state);
    this.setState(this.initialState);
  }

  render() {

    let pageTitle;
    if(this.state.id) {
      pageTitle = <h2>Edit Book</h2>
    } else {
      pageTitle = <h2>Add Book</h2>
    }

    return(
      <div>
        {pageTitle}
		
        <Row>
          <Col sm={12}>
            <Form onSubmit={this.handleSubmit}>
		
           name: <input type="text" name="name" value={this.state.name} onChange={this.handleChange}/><br /><br />
           isbn: <input type="text" name="isbn" value={this.state.isbn} onChange={this.handleChange}/><br /><br />
		   price: <input type="text" name="price" value={this.state.price} onChange={this.handleChange}/><br /><br />
		   availability: <select type="text" name="availability" value={this.state.availability} onChange={this.handleChange}>
		     <option value="empty">please select</option>
		     <option value="1">Availble</option>
             <option value="0">Not Availble</option>
             </select>
		   <br /><br />
		   author: <input type="text" name="author" value={this.state.author} onChange={this.handleChange}/><br /><br />
            <input type="submit" value="Submit"/><br /><br />

              
       
            </Form>
          </Col>
        </Row>
      </div>
    )
  }
}

export default AddBook;