import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Add from './components/Add'
import Display from './components/Display'
import Search from './components/Search'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
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

  const addPerson = (e) => {
    e.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber
    }
    const duplicate = persons.find(person => person.name === personObject.name);
    if (duplicate !== undefined) {
      window.alert(personObject.name + " is already added to the phonebook");
      return;
    }
    setPersons(persons.concat(personObject));
    setNewName('');
    setNewNumber('');
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Search newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h2>New Entry</h2>
      <Add addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} 
        newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Display persons={persons} newFilter={newFilter} />
    </div>
  )
}
export default App