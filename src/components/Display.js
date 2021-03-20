import React from 'react'

const Display = ({persons, newFilter}) => {
	return (
		<div>
			<ul>
			{persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase())).map(filteredPerson => 
			<li>{filteredPerson.name} {filteredPerson.number}</li> )}
			</ul>
		</div>
	)
}
export default Display