import React from 'react'

const Table3 = ({ details, StartNewActivity }) => {

    return (
        <>
            <table
                className="reslutTable" style={{ width: "100%" }}>
                <thead>
                    <tr>
                        <th> STUDENT NAME</th>
                        <th>View</th>
                        <th>Crab</th>
                        <th>Fish</th>
                        <th>Lobster</th>

                    </tr>
                </thead>
                <tbody>{details && details.map((details) => {
                    return (<tr key={details.studentId} style={{ height: "10%" }}>
                        <td>{details.studentName}</td>
                        <td onClick={(e) => { StartNewActivity(details.studentId) }} style={{ color: "blue", fontSize: "15px", cursor: "pointer" }} ><u>View</u></td>
                        <td>{details.studentResult && JSON.parse(details.studentResult).ob1 == 1 ? "True" : JSON.parse(details.studentResult).ob1 == "wrong" ? "False" :"-"}</td>
                        <td>{details.studentResult && JSON.parse(details.studentResult).ob2 == 2 ? "True" : JSON.parse(details.studentResult).ob2 == "wrong" ? "False" :"-"}</td>
                        <td>{details.studentResult && JSON.parse(details.studentResult).ob3 == 3 ? "True" : JSON.parse(details.studentResult).ob3 == "wrong" ? "False" :"-"}</td>

                    </tr>)
                })}
                </tbody>

            </table>
        </>
    )
}

export default Table3
