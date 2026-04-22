import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import { Persons, PersonForm } from './components/Persons'
import connection from './services/personsService'
import Notification from './components/Notification'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter,setFilter] = useState('')
  const [notification,setNotification] = useState({text:'',isSucces:0})
    
  useEffect(() => {
    connection
      .getAll()
      .then(response => {
        // console.log('Data dumped from server',response)
        setPersons(response)
      })

  }, [])

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={notification} />

      <Filter filter={filter} handleChange={setFilter} />

      <h3>Add a new</h3>

      <PersonForm newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} persons={persons} setPersons={setPersons} setNotification={setNotification}/>    

      <h2>Numbers</h2>

      <Persons persons={persons} filter={filter} setPersons={setPersons} setNotification={setNotification}/>
    </div>
  )
}

export default App