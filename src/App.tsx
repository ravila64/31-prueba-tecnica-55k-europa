import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import { UsersList } from './components/UsersList.tsx'
import { SortBy, type User } from './types/types.d'

function App() {
  //                                 array de users
  const [users, setUsers] = useState<User[]>([])
  const [showColors, setShowColors] = useState(false)
  //const [sortByCountry, setSortByCountry] = useState(false)
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)
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
    const newSortingValue = (sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE)
    setSorting(newSortingValue)
    // setSortByCountry(prevState => !prevState)
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

  const handleChangeSort = (sort: SortBy) =>{
    setSorting(sort)
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

  // tambien puede ser: const filteredUsers=filterCountry !== nul && filterCountry.length > 0
  const filteredUsers = useMemo(() => {
    console.log('calculate filteredUsers');
    return typeof filterCountry === 'string' && filterCountry.length > 0
      ? users.filter(user => {
        return user.location.country.toLowerCase().includes(filterCountry.toLowerCase())
      }) : users
  }, [users, filterCountry])


  // validacion ternaria
  // estaba [..users].sort((a,b) =>){}
  // se quito users x filteredUsers
  const sortedUsers = useMemo(() => {
    console.log('calculate sortedUsers');
    if(sorting===SortBy.NONE) return filteredUsers

    const compareProperties: Record<string, (user:User) => any> ={
      [SortBy.COUNTRY]: user=> user.location.country,
      [SortBy.NAME]: user=> user.name.first,
      [SortBy.LAST]: user=> user.name.last
    }
    return filteredUsers.toSorted((a, b) => {
      const extractProperty = compareProperties[sorting] 
      return extractProperty(a).localeCompare(extractProperty(b))
    })
  }, [filteredUsers, sorting])

  return (
    <div className="App">
      <h1>Prueba técnica 55k</h1>
      <header>

        <button onClick={toggleColors}>Color rows
          <onClick />
        </button>

        <button onClick={toggleSortByCountry}>
          {sorting === SortBy.COUNTRY ? 'unSorted-Contry' : 'sorted-Country'}
        </button>

        <button onClick={handleReset}>
          Reset state
        </button>

        <input placeholder='Filtra por pais' onChange={(e) => {
          setFilterCountry(e.target.value)
        }} />

      </header>
      <main>
        <UsersList
          changeSorting={handleChangeSort}
          deleteUser={handleDelete}
          showColors={showColors}
          users={sortedUsers} />
      </main>
    </div >
  )
}

export default App
