import React from 'react'

const DashboardToppers = ({ toppersdata }) => {
    return (
        <>
            <li>
                <div className="topClassBox">
                    <div className="topImg" >
                        <img src={toppersdata.avatar} style={{width:'100px'}}/>
                    </div>
                    <div className="topTxt1">
                        <strong>{toppersdata.studentName}</strong>
                        <span>{toppersdata.courseType} - {toppersdata.courseName}</span>
                    </div>
                    <div className="clear"></div>
                </div>
            </li>
        </>
    )
}

export default DashboardToppers
