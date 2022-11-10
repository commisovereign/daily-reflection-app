import React from 'react'

const ReflectionList = ({reflection}) => {
  return (
    <div className='reflection-list'>

        <h3>
            {'Felt: '}{reflection.dayScore}
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
    </div>
  )
}

export default ReflectionList;