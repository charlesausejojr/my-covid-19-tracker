import React from 'react'
import "./Table.css"
import CountUp from 'react-countup'

function Table({countries}) {
    return (
        <div className="table">
            {countries.map(({country,cases}) => (
                <tr>
                    <td className="table__country">{country}</td>
                    <td className="table__cases"><strong><CountUp start={0} end={cases} duration={1.0} separator=","/></strong></td>
                </tr>
            ))}
        </div>
    )
}

export default Table
