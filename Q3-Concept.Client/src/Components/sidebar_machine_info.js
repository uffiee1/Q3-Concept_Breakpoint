import React from 'react'
import './sidebar_machine_info.css'
import PropTypes from 'prop-types'


const sidebar_machine_info = ({machineName}) => {
    return (
        <div>
            <h1> { machineName } </h1> 
        </div>
    )

}

sidebar_machine_info.defaultProps = {
    machineName: 'Machine'
}

export default sidebar_machine_info
