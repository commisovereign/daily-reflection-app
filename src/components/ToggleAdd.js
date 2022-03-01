import propTypes from 'prop-types'

const ToggleAdd = ({text,onClick}) => {
  return(
    <button
    className='btn'
    onClick = {onClick}>
      {text}
    
    </button>)
};

ToggleAdd.propTypes ={
  text: propTypes.string,
  onClick: propTypes.func
}

export default ToggleAdd;
