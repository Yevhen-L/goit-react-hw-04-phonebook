@@ -1,53 +0,0 @@
import React, { Component } from 'react';
import css from './contactform.module.css';

export class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { name, number } = this.state;
    const { contacts } = this.props;

    if (contacts.some(contact => contact.name === name)) {
      alert(`${name} is already in contacts.`);
    } else {
      this.props.onAddContact(name, number);
      this.setState({ name: '', number: '' });
    }
  };

  render() {
    return (
      <form className={css.form} onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="name"
          value={this.state.name}
          onChange={this.handleChange}
          placeholder="Enter name"
          required
        />
        <input
          type="tel"
          name="number"
          value={this.state.number}
          onChange={this.handleChange}
          placeholder="Enter phone number"
          required
        />
        <button className={css.contactsformtBtn} type="submit">
          Add Contact
        </button>
      </form>
    );
  }
}