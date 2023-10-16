import React from 'react';
import css from './contactList.module.css';

export const ContactList = ({ contacts, onDeleteContact }) => (
  <ul className={css.contactList}>
    {contacts.map(contact => (
      <li className={css.contactslistItem} key={contact.id}>
        {contact.name}: {contact.number}
        <button
          className={css.contactslistBtn}
          type="button"
          onClick={() => onDeleteContact(contact.id)}
        >
          Delete
        </button>
      </li>
    ))}
  </ul>
);
