import React from 'react'

const Persons = ({person, handleDelete}) => {
  return (
    <div>
    <h2>numbers</h2>
             {person.map((p, index) => (
          <li key={index}>{p.name} : {p.number}
          <button onClick={()=>handleDelete(p.id, p.name)}>delete</button>
          </li>
          
        ))}
     
    </div>
  )
}

export default Persons