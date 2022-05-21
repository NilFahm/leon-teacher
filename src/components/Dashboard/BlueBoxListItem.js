import React from 'react'

const BlueBoxListItem = ({ cls, heading, imgpath, data }) => {
    return (
        <>
            <li className={cls ? cls : ""}>
                <span className="blueBoxSm">{heading}</span>
                <div className="blueBoxHead">
                    <span>
                        <img src={imgpath} />
                    </span>
                    {data}
                </div>
            </li>
        </>
    )
}

export default BlueBoxListItem
