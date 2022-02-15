import propTypes from 'prop-types'

const AccountButton = () => {
  return( 
  <button
  className='btn'
  >{"Account"}</button>)
};

AccountButton.defaultProps ={color:"green"}
AccountButton.propTypes = {
  color:propTypes.string
}

export default AccountButton
