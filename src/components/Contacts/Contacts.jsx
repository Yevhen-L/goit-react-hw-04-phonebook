import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from '../ContactForm/ContactForm';
import { ContactList } from '../ContactList/ContactList';
import { Filter } from '../Filter/Filter';
import css from './contacts.module.css';

export const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    // зчитування контактів з локального сховища при завантаженні компоненту
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      setContacts(JSON.parse(storedContacts));
    }
  }, []);

  useEffect(() => {
    // збереження/оновлення контактів у локальному сховищіз
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (name, number) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    setContacts(prevContacts => [...prevContacts, contact]);
  };

  const handleFilterChange = e => {
    setFilter(e.target.value);
  };

  const handleDeleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <div className={css.phonebook}>
        <h1 className={css.titlePhone}>Phonebook</h1>
        <ContactForm onAddContact={addContact} contacts={contacts} />
      </div>
      <div className={css.contacts}>
        <h2 className={css.titleContacts}>Contacts</h2>
        <Filter value={filter} onChange={handleFilterChange} />
        <ContactList
          contacts={filteredContacts}
          onDeleteContact={handleDeleteContact}
        />
      </div>
    </div>
  );
};
