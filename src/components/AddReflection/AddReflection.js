import {useState} from 'react';
import Radio from './Radio';

const AddReflection = ({onAdd}) => {
  const [productivity, setProductivity] = useState(0)
  const [notes, setNotes] = useState("")

  const onSubmit = (e) => {
    e.preventDefault()
    if (!notes){
      alert("Please insert comment.")
      return
    }
    
    onAdd({notes,productivity})


    setProductivity(0)
    setNotes("")
  
  }
  return(
    <form className='add-reflection' onSubmit={onSubmit}>
      <Radio/>
      <div>
        <input type= 'text'
        placeholder='comments:'
        onChange ={(e)=> setNotes(e.target.value)}/>
      </div>
      <input type='submit' value='Save Day'/>
    </form> 

  )
};


export default AddReflection