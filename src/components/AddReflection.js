import {useState} from 'react';
const AddReflection = ({onAdd}) => {
  const [dayScore,setDayScore] = useState(0)
  const [productivity, setProductivity] = useState(0)
  const [notes, setNotes] = useState("")
  const onSubmit = (e) => {
    e.preventDefault()
    if (!notes){
      alert("Please insert text.")
      return
    }
    alert(dayScore)
    onAdd({dayScore,productivity,notes})
    setDayScore(0)
    setProductivity(0)
    setNotes("")
  }
  return(
    <form className='add-reflection' onSubmit={onSubmit}>
      <div className='day-score'>
        <label>How was your day?</label>
        <input type ="radio" name = "m"
        value = {0}
        onChange={(e)=> setDayScore(e.currentTarget.value)}
        />
        <input type ="radio" name = "m"
        value = {1}
        onChange={(e)=> setDayScore(e.currentTarget.value)}
        />
        <input type ="radio" name = "m"
        value = {2}
        onChange={(e)=> setDayScore(e.currentTarget.value)}
        />
      </div>
      <div>
        <input type= 'text'
        onChange ={(e)=> setNotes(e.target.value)}/>
      </div>
      <input type='submit' value='Save Day'/>
    </form>
  )
};





export default AddReflection