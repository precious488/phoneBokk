import { useEffect, useState } from 'react'
import Form from './components/Form.jsx'
import Filter from './components/Filter.jsx'
import Persons from './components/Persons.jsx'
import axios from 'axios'
import phoneService from './services/phoneService.jsx'
import NoMessage from './components/NoMessage.jsx'



function App() {
  const [person, setPerson] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNumber] = useState('')
   const [filter, setFilter] = useState('')
   const [notificationMessage, setNotificationMessage] = useState('some notification')

   useEffect(()=>{

    phoneService.getAll().then(initailPerson=> setPerson(initailPerson))
    // axios.get('http://localhost:3000/persons').then(response =>{
    //   setPerson(response.data)
    }, [])
  

  const addName=(event)=>{
    event.preventDefault()
    // console.log(event.target)
    // const exist = person.some(p=> p.name ===newName)
    const exist = person.some(p => p && p.name === newName)

    if(exist){
      alert(`${newName} already exist`)
      return
    }

    const newperson= {
      name:newName,
      number:newNumber,
      id: person.length + 1
    }
    phoneService.create(newperson).then(returnedNote=>{setPerson(person.concat(returnedNote))
      setNotificationMessage(`the name ${newperson.name} with number ${newperson.number} added`)
      setTimeout(()=>{
        setNotificationMessage(null)
      }, 5000)
           
    })
      setNewName('')
      setNumber('')
    // setPerson(person.concat(newperson))
    // setNewName('')
    // setNumber('')

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
const personsToShow = person.filter(
  p => p && p.name && p.name.toLowerCase().includes(filter.toLowerCase())
)


const handleDelete =(id, name)=>{
  const confirm = window.confirm(`Delete ${name}`)
  if(!confirm){
    return
  }

  phoneService.deletePerson(id).then(()=>{
    setPerson(person.filter(p=> p.id !=id))
    setNotificationMessage(`the id ${id} deleted`)
    setTimeout(()=>{
      setNotificationMessage(null)
    }, 2000)
  })

  .catch(error=>{
    alert(`${name} has already beeen deletd`)
    setPerson(person.filter(p=> p.id !=id))


  })

}
  return (
    <div>
      <h2>phonebook</h2>
      <NoMessage message={notificationMessage}/>
      <Filter changeFilter={handleFilter} filter={filter}/>
      <h2>add new number</h2>

      <Form handle={addName} name={newName} number={newNumber} changeName={handleNameChange} changeNumber={handleNumberChange}/>
      <Persons person={personsToShow} handleDelete={handleDelete}/>
     



    </div>
  )
}

export default App
