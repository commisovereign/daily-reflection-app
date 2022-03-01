import {useState} from 'react';
import DatePicker from 'react-date-picker';

const AddReflection = ({onAdd}) => {
  const [value,onChange] = useState(new Date())
  const [productivity, setProductivity] = useState(0)
  const [notes, setNotes] = useState('')
  const [dayScore,setDayScore] = useState(0)

  const onSubmit = (e) => {
    e.preventDefault()
    if (!notes){
      alert("Please insert comment.")
      return
    }
    
    onAdd({dayScore,productivity,notes})


    setProductivity(0)
    setNotes('')
    setDayScore(1)
  
  }
  return(
    <form className='add-reflection' onSubmit={onSubmit}>
      <DatePicker onChange={onChange} value ={value} maxDate= {new Date()}/>
      <div>
      How did you feel today (1-5)?
      <select value={dayScore} onChange={(e)=> setDayScore(e.target.value)}>
        <option value = {1}>1</option>
        <option value = {2}>2</option>
        <option value = {3}>3</option>
        <option value = {4}>4</option>
        <option value = {5}>5</option>
      </select>
      </div>
      <br/>
      <div>
      How Productive were you (1-5)?
      <select value={productivity} onChange={(e)=> setProductivity(e.target.value)}>
        <option value = {1}>1</option>
        <option value = {2}>2</option>
        <option value = {3}>3</option>
        <option value = {4}>4</option>
        <option value = {5}>5</option>
      </select>
      </div>
      <div>
        <input type= 'text'
        placeholder='comments:'
        value={notes}
        onChange ={(e)=> setNotes(e.target.value)}/>
      </div>
      <input type='submit' value='Save Day'/>
    </form> 

  )
};


export default AddReflection