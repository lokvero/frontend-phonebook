const Filter = ({filter,handleChange}) => {
  return(
    <>
      filter shown with<input value={filter} onChange={(e)=>handleChange(e.target.value)}/>
    </>
  )
}

export default Filter