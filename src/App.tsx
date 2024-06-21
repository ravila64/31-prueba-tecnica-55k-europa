import { useEffect, useState } from 'react'
import './App.css'
import { UsersList } from './components/UsersList.tsx'
import { type User } from './types/types.d'

function App() {
  const [users, setUsers] = useState<User[]>([])
 
  useEffect(()=>{
    fetch('https://randomuser.me/api?results=10')
    .then(res=> res.json())
    .then(res=>{
      setUsers(res.results)
    })
    .catch(err =>{
      console.log(err)
    })
  },[])
  return (
    <div className="App">
      <h1>Prueba técnica 55k</h1>
      {
      <UsersList users={users} />
      }      
      </div>
  )
}

export default App
