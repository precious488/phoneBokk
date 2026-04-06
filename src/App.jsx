import { useEffect, useState } from 'react'
import Form from './components/Form.jsx'
import Filter from './components/Filter.jsx'
import Persons from './components/Persons.jsx'
import axios from 'axios'


function App() {
  const [person, setPerson] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNumber] = useState('')
   const [filter, setFilter] = useState('')

   useEffect(()=>{
    axios.get('http://localhost:3000/persons').then(response =>{
      setPerson(response.data)
    })
   }, [])

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
      number:newNumber,
      id: person.length + 1
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
