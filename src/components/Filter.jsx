import React from 'react'

const Filter = ({changeFilter, filter}) => {
  return (
    <div>
      filter:<input type="text" onChange={changeFilter} value={filter} />

    </div>
  )
}

export default Filter