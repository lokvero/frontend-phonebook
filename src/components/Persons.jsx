import connection from '../services/personsService'

export const Persons = ({persons,filter,setPersons,setNotification}) => {
  const handleclick = (e) => {
    e.preventDefault()
    const persona = persons.filter(persona=>persona.id == e.target.parentElement.id)[0]

    if(confirm(`Are you sure to delete ${persona.name}`)){
        connection.deletePerson(persona.id)
        .then(response => {
          if(response){
            console.log(`${persona.name} was deleted`)
            setNotification({
                text:`${persona.name} was deleted with success`,
                isSuccess:1
            })
            setTimeout(()=>{
                setNotification({text:'', isSuccess:0})
            },5000)
            setPersons(persons.filter(persona=>persona.id != e.target.parentElement.id))
          }
        })
        .catch( (error) => {
            console.log("Error deleting",error) 
            setNotification({
                text:`Unexpected error while deleting`,
                isSuccess:0
            })
            setTimeout(()=>{
                setNotification({text:'', isSuccess:0})
            },5000)
            setPersons(persons.filter(persona=>persona.id !== e.target.parentElement.id))
        })
    }
  }

  return (
    <div>
      {persons.filter((person)=>person.name.toLowerCase().includes(filter.toLowerCase())).map(person=>{
        // console.log(person)
        return(
          <li key={person.id} id={person.id} className='person'>
            {person.name}&ensp;{person.number}&nbsp;
            <button onClick={handleclick}>delete</button>
          </li>
        )})}
    </div>
  )
}
export const PersonForm = ({newName,setNewName,newNumber,setNewNumber,persons,setPersons,setNotification}) => {
  const handleSubmit = (e) => {
    e.preventDefault()
    const persona = { name: newName , number: newNumber }
    const personExists = persons.filter((person)=>person.name.toLowerCase()===newName.toLowerCase())

    if(personExists.length){
        if(confirm(`${newName} is already added to phonebook,\ndo you want to replace the number?`)){
                connection
                  .update(personExists[0].id,{...personExists[0],number:newNumber})
                  .then((response)=>{
                    if(response.status === 200){
                        console.log(`${response.data.name} was updated with success`)
                        setNotification({
                            text:`${response.data.name} was updated with success`,
                            isSuccess:1
                        })
                        setTimeout(() => {
                            setNotification({text:'', isSuccess:0})
                        }, 5000)
                        setPersons(persons.map(persona=>persona.name.toLowerCase()===newName.toLowerCase()
                            ?{...persona, number:newNumber}
                            :persona
                        ))
                        setNewName('')
                        setNewNumber('')
                    }
                  })
                  .catch((err)=>{
                    console.log(`Error ocurred during update `,err)
                    setNotification({
                      text:`${err.response.data.error }`,
                      isSuccess:0
                    })
                    setTimeout(() => {
                        setNotification({text:'', isSuccess:0})
                    }, 5000)
                    setNewName('')
                    setNewNumber('')
                  })
            }
    }
    else{ // person doesn't exists
      connection
        .create(persona)
          .then(response=>{
            if (response.status === 200){
              console.log(`${response.data.name} was added with success`)
              setNotification({
                      text:`${response.data.name} was added with success`,
                      isSuccess:1
              })
              setTimeout(() => {
                setNotification({text:'', isSuccess:0})
              }, 5000)
              setPersons([...persons, {...persona,id: response.data.id}])
              setNewName('')
              setNewNumber('')
            }
            else console.log('Oops! Somethings goes wrong! status->',response.status)
          })
          .catch(err=>{
            console.log(`Error creating entry`,err.response)
            if (err.response.statusText)
            setNotification({
              text:`Error:${err.response.data.error}`,
              isSuccess:0
            })
            setTimeout(() => {
              setNotification({text:'',isSuccess:0})
            }, 5000)
          })
    }
  }
  return(
    <form onSubmit={handleSubmit}>
      <div>
        name: <input value={newName} onChange={ (e)=>{ setNewName(e.target.value) } } />
      </div>
      <div>
        number: <input value={newNumber} onChange={ (e)=>{ setNewNumber(e.target.value) } } />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}