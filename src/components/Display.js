import React from 'react'

const Display = ({persons, newFilter, deleteEntry}) => {
	return (
		<div>
			<ul>
			{persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase())).map(filteredPerson => 
			<li>{filteredPerson.name} {filteredPerson.number} <button onClick={() => deleteEntry(filteredPerson.id)}>delete</button></li> )}
			</ul>
		</div>
	)
}
export default Display