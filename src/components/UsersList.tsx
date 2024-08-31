import { type User } from "../types/types.d"

interface Props{
  deleteUser : (email:string) => void
  showColors: boolean
  users: User[]
}

export function UsersList({ deleteUser, showColors, users }: Props) {
  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <table width='100%'>
      <thead>
      <tr>
         <th>Foto</th>
         <th>Nombre</th>
         <th>Apellido</th>
         <th>Pais</th>
         <th>Acciones</th>
      </tr>
      </thead>
      <tbody>
        {
          users.map((user, index) =>{
            const backgroundColor = index % 2 === 0 ? '#79c2d0' : '#bbe4e9'
            const color= showColors ? backgroundColor : 'transparent'
            { /* user.id.value => porque hay keys null*/} 
            {/* eslint-disable-next-line react/react-in-jsx-scope */}
            return(  
              <tr key={user.email} style={{backgroundColor: color}}>
                <td>
                  <img src={user.picture.thumbnail} />
                </td>
                <td>{user.name.first}</td>
                <td>{user.name.last}</td>
                <td>{user.location.country}</td>
                <td>
                  <button onClick={()=>{
                    {/* deleteUser(user.email) */}
                    deleteUser(user.email);
                  }}>Delete</button> 
                </td> 
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}

// table, thead, tbody <-- son la clave
// tr => row
//   th => header
//   td => data

