import React from 'react'

const WhiteBoxListitem = ({scheduledata}) => {
    return (
        <>
            <li>
                <div className="boxNo">{scheduledata.totalSessions}</div>
                <span>{scheduledata.name}</span>
                <div className="clear"></div>
            </li>
        </>
    )
}

export default WhiteBoxListitem
