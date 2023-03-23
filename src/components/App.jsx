import {useState, useEffect} from 'react'
import { nanoid } from 'nanoid';
import { Form } from 'components/Form/Form'
import { ContactList } from 'components/Contacts/Contacts'
import { Filter } from 'components/Filter/Filter'
import css from 'components/App.module.css'

// !!!!!! Вариант написания собственного хука (который потом в папку hooks идет) - для случаев с повторяющимся кодом (например у нас несколько useState используют local storage и несколько useEffect соответственно).
// const useLocalStorage = (key, defaultValue) => {
//   const [state, setState] = useState(() => {
//     return JSON.parse(window.localStorage.getItem(key)) ?? defaultValue
//   })
//   useEffect(() => {
//     window.localStorage.setItem(key, JSON.stringify(state))
//   }, [key, state]);

//   return [state, setState]
// }


export const App = () => {
  // Таким образом записывать при использовании примера собственного хука выше
// const [contacts, setContacts] = useLocalStorage('contacts', []); 

const [contacts, setContacts] = useState(JSON.parse(window.localStorage.getItem('contacts')) ?? []);
    const [filter, setFilter] = useState('');

 
   useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts))
  }, [contacts]);


  
    const onFilterChange = filter => {
    setFilter(filter);
  };

  const deleteContact = (contactId) => {
    setContacts(contacts.filter(
        (contact) => contact.id !== contactId
      ));
  };

  const addContact = ({ name, number }) => {
    
    const newContact = { id: nanoid(), name, number };
    const checkUser = contacts.find(
      (contact) => contact.name === newContact.name
    );

    checkUser
      ? alert(`${name} is already in the contacts`)
      : setContacts([newContact, ...contacts]);
        };
  // };

  const getVisibleContacts = () => {
    
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };


  
    
   
    return (
      <div className={css.container}>
        <h1>Phonebook</h1>
        <Form submit={addContact} />
        
        <h2>Contacts</h2>
        <Filter filter={filter} onFilterChange={onFilterChange} />
        <ContactList
           contacts={getVisibleContacts()}
          onDeleteContact={deleteContact}/>
      </div>
      )
  

  
};


