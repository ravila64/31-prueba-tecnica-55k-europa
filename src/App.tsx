import { useEffect, useRef, useState } from 'react'
import './App.css'
import { UsersList } from './components/UsersList.tsx'
import { type User } from './types/types.d'

function App() {
  //                                 array de users
  const [users, setUsers] = useState<User[]>([])
  const [showColors, setShowColors] = useState(false)
  const [sortByCountry, setSortByCountry] = useState(false)
  const [filterCountry, setFilterCountry] = useState<string | null>(null)

  // useRef -> para guardar un valor que queremos que se comparta
  // entre renderizados, pero que al cambiar, no vuelva a renderizar el componente 
  // Implement a feature that allows the user to restore the initial state, 
  // meaning that all deleted rows will be recovered.
  
  const originalUsers = useRef<User[]>([])
  const toggleColors = () => {
    setShowColors(!showColors)
  }
  const toggleSortByCountry = () => {
    // esto se llama callback prevState=>!prevState
    setSortByCountry(prevState => !prevState)
  }
  const handleReset = () => {
    setUsers(originalUsers.current)
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
        originalUsers.current = res.results
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  const filteredUsers = useMemo(() => {
    console.log('calculate filteredUsers')
    return filterCountry != null && filterCountry.length > 0
      ? users.filter(user => {
        return user.location.country.toLowerCase().includes(filterCountry.toLowerCase())
      })
      : users
  }, [users, filterCountry])

  // validacion ternaria
  const sortedUsers = sortByCountry
   // estaba [..users].sort((a,b) =>){}
    ? users.toSorted((a, b) => {    // part true. best option
      // ascendent sort
      return a.location.country.localeCompare(b.location.country)
    })
    : users   // part false

  return (
    <div className="App">
      <h1>Prueba técnica 55k</h1>
      <header>
        <button onClick={toggleColors}>Color rows </button>
        <button onClick={toggleSortByCountry}>
          {sortByCountry ? 'Contry-unSorted' : 'Country-Sorted'}
        </button>
        <button onClick={handleReset}>
          Reset state
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
