import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from '../ContactForm/ContactForm';
import { ContactList } from '../ContactList/ContactList';
import { Filter } from '../Filter/Filter';
import css from './contacts.module.css';

export class Contacts extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  // зчитуємо контакти з локального сховища
  componentDidMount() {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      this.setState({ contacts: JSON.parse(storedContacts) });
    }
  }

  // збереження/оновлення контактів у локальному сховищі
  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContact = (name, number) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    this.setState(prevState => ({
      contacts: [...prevState.contacts, contact],
    }));
  };

  handleFilterChange = e => {
    this.setState({ filter: e.target.value });
  };

  handleDeleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const { contacts, filter } = this.state;

    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
      <div>
        <div className={css.phonebook}>
          <h1 className={css.titlePhone}>Phonebook</h1>
          <ContactForm onAddContact={this.addContact} contacts={contacts} />
        </div>
        <div className={css.contacts}>
          <h2 className={css.titleContacts}>Contacts</h2>
          <Filter value={filter} onChange={this.handleFilterChange} />
          <ContactList
            contacts={filteredContacts}
            onDeleteContact={this.handleDeleteContact}
          />
        </div>
      </div>
    );
  }
}
