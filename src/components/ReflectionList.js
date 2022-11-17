import React from 'react'
import { FaTimes } from 'react-icons/fa';

const ReflectionList = ({reflection,onDelete}) => {
  return (
    <div className='reflection-list'>

        <h3>
            {'Felt: '}{reflection.dayScore}{' '}
            <FaTimes style={
              { color:'red',cursor:'pointer'}
            }
            onClick ={()=>onDelete(reflection.idreflections)}
            />
        </h3>
        <h3>
            {'Productivity: '}
            {reflection.productivityScore}
        </h3>
        <p>
            {'Notes: '}
            {reflection.notes}
        </p>
        <p>
          {reflection.dates}
        </p>
        <p>
          {'ID: '}
          {reflection.idreflections}
        </p>
    </div>
  )
}

export default ReflectionList;