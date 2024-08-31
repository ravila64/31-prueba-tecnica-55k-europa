import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import { UsersList } from './components/UsersList.tsx'
import { type User } from './types/types.d'

function App() {
  //                                 array de users
  const [users, setUsers] = useState<User[]>([])
  const [showColors, setShowColors] = useState(false)
  const [sortByCountry, setSortByCountry] = useState(false)
  const [filterCountry, setFilterCountry] = useState<string | null>(null)
  const originalUsers = useRef<User[]>([])

  //const [originalUsers, setOroginalUsers] = useState<User[]>([]);
  // esra linea anterior no se debe hacer, cerar otro useState
  // useRef -> para guardar un valor que queremos que se comparta
  // entre renderizados, pero que al cambiar, no vuelva a renderizar el componente 
  // Implement a feature that allows the user to restore the initial state, 
  // meaning that all deleted rows will be recovered.

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

  const filteredUsers = typeof filterCountry === 'string' && filterCountry.length > 0
    ? users.filter(user => {
      return user.location.country.toLowerCase().includes(filterCountry.toLowerCase())
    }) : users

  // validacion ternaria
  // estaba [..users].sort((a,b) =>){}
  // se quito users x filteredUsers
  const sortedUsers = useMemo(()=>{
    console.log('sortedUsers');
    return sortByCountry
      ? users.toSorted(
        (a, b) => a.location.country.localeCompare(b.location.country)
      ) : users
  }, [filteredUsers, sortByCountry])

  return (
    <>
      <div className="App">
        <h1>Prueba técnica 55k</h1>
        <header>

          <button onClick={toggleColors}>Color rows
            <onClick />
          </button>

          <button onClick={toggleSortByCountry}>
            {sortByCountry ? 'Contry-unSorted' : 'Country-Sorted'}
          </button>

          <button onClick={handleReset}>
            Reset state
          </button>

          <input onClick='Filtra por pais' onChange={(e) => {
            setFilterCountry(e.target.value)
          }} />

        </header>
        <main>
          <UsersList
            deleteUser={handleDelete}
            showColors={showColors}
            users={sortedUsers} />
        </main>
      </div >
    </>
  )

}

export default App
