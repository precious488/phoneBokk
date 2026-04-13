const Persons = ({ persons, handleDelete }) => {
  return (
    <div>
      <h2>numbers</h2>
      {persons.map((p, index) => (
        <li key={index}>
          {p.name} : {p.number}
          <button onClick={() => handleDelete(p.id, p.name)}>delete</button>
        </li>
      ))}
    </div>
  )
}

export default Persons
