import React from 'react'

const Table2 = ({details,StartNewActivity}) => {

    return (
        <>
            <table
                className="reslutTable" style={{ width: "100%" }}>
                <thead>
                    <tr>
                        <th> STUDENT NAME</th>
                        <th>View</th>
                        <th>Red1</th>
                        <th>Red2</th>
                        <th>Orange1</th>
                        <th>Orange1</th>
                        <th>Yellow1</th>
                        <th>Yellow2</th>
                        <th>Green1</th>
                        <th>Green2</th>
                        <th>Blue1</th>
                        <th>Blue2</th>
                        <th>Violet1</th>
                        <th>Violet2</th>
                       
                    </tr>
                </thead>
                <tbody>{details && details.map((details) => {
                    return (<tr key={details.studentId} style={{ height: "10%" }}>
                        <td>{details.studentName}</td>
                        <td onClick={(e) => { StartNewActivity(details.studentId) }} style={{  color: "blue", fontSize: "15px",cursor:"pointer" }} ><u>View</u></td>
                        <td>{details.studentResult && JSON.parse(details.studentResult).ob1 == 1 ? "True" : "-"}</td>
                        <td>{details.studentResult && JSON.parse(details.studentResult).ob7 == 7 ? "True" : "-"}</td>
                        <td>{details.studentResult && JSON.parse(details.studentResult).ob2 == 2 ? "True" : "-"}</td>
                        <td>{details.studentResult && JSON.parse(details.studentResult).ob8 == 8 ? "True" : "-"}</td>
                        <td>{details.studentResult && JSON.parse(details.studentResult).ob3 == 3 ? "True" : "-"}</td>
                        <td>{details.studentResult && JSON.parse(details.studentResult).ob9 == 9 ? "True" : "-"}</td>
                        <td>{details.studentResult && JSON.parse(details.studentResult).ob4 == 4 ? "True" : "-"}</td>
                        <td>{details.studentResult && JSON.parse(details.studentResult).ob10 == 10 ? "True" : "-"}</td>
                        <td>{details.studentResult && JSON.parse(details.studentResult).ob5 == 5 ? "True" : "-"}</td>
                        <td>{details.studentResult && JSON.parse(details.studentResult).ob11 == 11 ? "True" : "-"}</td>
                        <td>{details.studentResult && JSON.parse(details.studentResult).ob6 == 6 ? "True" : "-"}</td>
                        <td>{details.studentResult && JSON.parse(details.studentResult).ob12 == 12 ? "True" : "-"}</td>

                        
                    </tr>)
                })}
                </tbody>

            </table>
        </>
    )
}

export default Table2
