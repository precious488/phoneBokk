import { useState } from 'react'
import Form from './components/Form.jsx'
import Filter from './components/Filter.jsx'
import Persons from './components/Persons.jsx'


function App() {
  const [person, setPerson] = useState([
  { name: 'Arto Hellas', Number: '040-123456', id: 1 },
  { name: 'Ada Lovelace', Number: '39-44-5323523', id: 2 },
  { name: 'Dan Abramov', Number: '12-43-234345', id: 3 },
  { name: 'Mary Poppendieck', Number: '39-23-6423122', id: 4 }
])
  const [newName, setNewName] = useState('')
  const [newNumber, setNumber] = useState('')
   const [filter, setFilter] = useState('')

  const addName=(event)=>{
    event.preventDefault()
    // console.log(event.target)
    const exist = person.some(p=> p.name ===newName)

    if(exist){
      alert(`${newName} already exist`)
      return
    }

    const newperson= {
      name:newName,
      Number:newNumber
    }

    setPerson(person.concat(newperson))
    setNewName('')
    setNumber('')

  }
const handleNameChange = (event) => {
  setNewName(event.target.value)
}

const handleNumberChange = (event) => {
  setNumber(event.target.value)
}



const handleFilter= (event)=>{
  setFilter(event.target.value)

}
const personsToShow = person.filter(p =>
  p.name.toLowerCase().includes(filter.toLowerCase())
)

  return (
    <div>
      <h2>phonebook</h2>
      <Filter changeFilter={handleFilter} filter={filter}/>

      <Form handle={addName} name={newName} number={newNumber} changeName={handleNameChange} changeNumber={handleNumberChange}/>
      <Persons person={personsToShow}/>
     



    </div>
  )
}

export default App
