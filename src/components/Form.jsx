const Form = ({ handle, name, number, changeName, changeNumber }) => {
  return (
    <div>
      <form onSubmit={handle}>
        <div>
          name: <input type='text' value={name} onChange={changeName} />
        </div>
        <div>
          number: <input type='tel' value={number} onChange={changeNumber} />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
    </div>
  )
}

export default Form
