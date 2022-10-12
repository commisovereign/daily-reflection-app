import propTypes from 'prop-types'
import { Link } from 'react-router-dom';
const AccountButton = () => {
  return(
    <Link to ='/AccountPage'>
  <button
  className='btn'
  >{"Account"}</button>
  </Link>
  )
};

AccountButton.defaultProps ={color:"green"}
AccountButton.propTypes = {
  color:propTypes.string
}

export default AccountButton
