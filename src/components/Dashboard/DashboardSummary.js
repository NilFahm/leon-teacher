import React, { useState } from 'react'
import BlueBoxListItem from './BlueBoxListItem'
import WhiteBoxListitem from './WhiteBoxListitem'

const DashboardSummary = ({ summarydata }) => {
    return (
        <>
            <div className="boxBlue">
                <ul>
                    <BlueBoxListItem cls="" heading="My Students" imgpath="/img/blueIcon1.svg" data={summarydata && summarydata.totalStudents} />
                    <BlueBoxListItem cls="boxMid" heading="My Earnings" imgpath="/img/blueIcon2.svg" data={summarydata && summarydata.totalEarnings} />
                    <BlueBoxListItem cls="" heading="My Sessions" imgpath="/img/blueIcon3.svg" data={summarydata && summarydata.totalSessions} />
                    <div className="clear"></div>
                </ul>
            </div>

            <div className="boxWhite">
                <h6>My Classes</h6>
                <ul>
                    <li>
                        <div className="boxNo">{summarydata && summarydata.totalClasses}</div>
                    </li>
                    {summarydata && summarydata.classes.map((item, index) => {
                        return <WhiteBoxListitem scheduledata={item} key={index} />
                    })}
                </ul>
                <div className="clear"></div>
            </div>
        </>
    )
}

export default DashboardSummary
