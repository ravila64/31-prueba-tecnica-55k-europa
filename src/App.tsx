import { useEffect, useState } from 'react'
import './App.css'
import { UsersList } from './components/UsersList.tsx'
import { type User } from './types/types.d'

function App() {
  //                                 array de users
  const [users, setUsers] = useState<User[]>([])
  const [showColors, setShowColors] = useState(false)
  const [sortByCountry, setSortByCountry] = useState(false)

  const toggleColors = () => {
    setShowColors(!showColors)
  }
  const toggleSortByCounrty = () => {
    // esto se llama callback prevState=>!prevState
    setSortByCountry(prevState => !prevState)
  }

  const handleDelete = (email: string) => {
    // filteredUsers = users.filter((user, userIndex)
    // userIndex !== index
    const filteredUsers = users.filter((user) => user.email !== email)
      setUsers(filteredUsers)
  }

  useEffect(() => {
    fetch('https://randomuser.me/api?results=50')
      .then(res => res.json())
      .then(res => {
        setUsers(res.results)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  // validacion ternaria
  const sortedUsers = sortByCountry
    ? users.toSorted((a, b) => {    // part true. best option
      // ascendent sort
      return a.location.country.localeCompare(b.location.country)
    })
    : users   // part false

  return (
    <div className="App">
      <h1>Prueba técnica 55k</h1>
      <header>
        <button onClick={toggleColors}>
          Color rows
        </button>
        <button onClick={toggleSortByCounrty}>
          {sortByCountry ? 'Contry-unSorted' : 'Coutry-Sorted'}
        </button>
      </header>
      <main>
        <UsersList
          deleteUser={handleDelete}
          showColors={showColors}
          users={sortedUsers}
        />
      </main>

    </div>
  )
}

export default App
