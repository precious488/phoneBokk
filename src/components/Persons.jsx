import React from 'react'

const Persons = ({person}) => {
  return (
    <div>
    <h2>numbers</h2>
             {person.map((p, index) => (
          <li key={index}>{p.name} : {p.number}</li>
        ))}
     
    </div>
  )
}

export default Persons