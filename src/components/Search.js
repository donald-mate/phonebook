import React from 'react'

const Search = ({newFilter, handleFilterChange}) => {
	return (
		<div>
			filter by name: <input value={newFilter} onChange={handleFilterChange} />
		</div>
	)
}

export default Search