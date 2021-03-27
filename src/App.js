import React, { useState, useEffect } from 'react'
import './index.css'
import Add from './components/Add'
import Display from './components/Display'
import Notification from './components/Notification'
import Search from './components/Search'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('');
  const [ notificationMessage, setNotificationMessage ] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  }
  
  const handleFilterChange = (e) => {
    setNewFilter(e.target.value);
    const display = persons.filter(person => person.name.toLowerCase().includes (newFilter.toLowerCase()));
    console.log(display);
  }


  const deleteEntry = id => {
    personService
      .deletePerson(id)
      .then(
        personService
          .getAll()
          .then(updatedPersons => {
            setPersons(updatedPersons)
        })
      )
  }

  const addPerson = (e) => {
    e.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber
    }
    const duplicate = persons.find(person => person.name === personObject.name);
    if (duplicate !== undefined) {
      if (window.confirm(personObject.name + " is already added to the phonebook, replace the old number with a new one?")) {
        personService
          .update(duplicate, personObject)
          .then(updatedPerson => {
            setPersons(persons.map(person => person.id !== duplicate.id ? person : updatedPerson))
            setNewName('');
            setNewNumber('');
          })
          .catch(error => {
            setNotificationMessage(`Information of ${personObject.name} was already removed from the server`)
            setTimeout(() => {
              setNotificationMessage(null)
            }, 3000)
            setPersons(persons.filter(person => person.id !== duplicate.id))
          })
        return;
      } else {
        return;
      }
    }
    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('');
        setNewNumber('');
        setNotificationMessage(`${returnedPerson.name} was added`)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 3000)
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Search newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h2>New Entry</h2>
      <Notification message={notificationMessage} />
      <Add addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} 
        newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Display persons={persons} newFilter={newFilter} deleteEntry={deleteEntry} />
    </div>
  )
}
export default App