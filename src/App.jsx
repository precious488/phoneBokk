import { useEffect, useState } from 'react'
import Form from './components/Form.jsx'
import Filter from './components/Filter.jsx'
import Persons from './components/Persons.jsx'
import phoneService from './services/phoneService.jsx'
import NoMessage from './components/NoMessage.jsx'

function App() {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notificationMessage, setNotificationMessage] =
    useState('some notification')

  useEffect(() => {
    phoneService.getAll().then((initialPerson) => setPersons(initialPerson))
  }, [])

  const addName = (event) => {
    event.preventDefault()

    const exist = persons.some(
      (person) => person.name.toLowerCase() === newName.toLowerCase(),
    )

    if (exist) {
      alert(`${newName} already exist`)
      return
    }

    const newperson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }

    phoneService
      .create(newperson)
      .then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson))
        setNotificationMessage(
          `the name ${newperson.name} with number ${newperson.number} added`,
        )
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
        setNewName('')
        setNewNumber('')
      })
      .catch((error) => {
        console.log(error.response.data.error)
        setNotificationMessage(error.response.data.error)
      })
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  const personsToShow =
    filter === ''
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(filter.toLowerCase()),
        )

  const handleDelete = (id, name) => {
    const confirm = window.confirm(`Delete ${name}`)
    if (!confirm) {
      return
    }

    phoneService
      .deletePerson(id)
      .then(() => {
        setPersons(persons.filter((p) => p.id != id))
        setNotificationMessage(`the id ${id} deleted`)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 2000)
      })

      .catch((error) => {
        alert(`${name} has already beeen deletd`)
        setPersons(persons.filter((p) => p.id != id))
      })
  }

  return (
    <div>
      <h2>phonebook</h2>
      <NoMessage message={notificationMessage} />
      <Filter changeFilter={handleFilter} filter={filter} />
      <h2>add new number</h2>

      <Form
        handle={addName}
        name={newName}
        number={newNumber}
        changeName={handleNameChange}
        changeNumber={handleNumberChange}
      />
      <Persons persons={personsToShow} handleDelete={handleDelete} />
    </div>
  )
}

export default App
