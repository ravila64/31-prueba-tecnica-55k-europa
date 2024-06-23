import { useEffect, useState } from 'react'
import './App.css'
import { UsersList } from './components/UsersList.tsx'
//import { type User } from './types/types.d'

function App() {
  const [users, setUsers] = useState([])
  const [showColors, setShowColors] = useState(false)

  const toogleColors = () =>{
    setShowColors(!showColors)
  }

  useEffect(() => {
    fetch('https://randomuser.me/api?results=20')
      .then(res => res.json())
      .then(res => {
        setUsers(res.results)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])
  return (
    <div className="App">
      <h1>Prueba técnica 55k</h1>
      <header>
        <button onClick={toogleColors}>
          Colorear filas
        </button>
      </header>
      <main>
        <UsersList showColors= {showColors} users={users} />
      </main>
      
    </div>
  )
}

export default App
