import React from 'react'

const Table6 = ({details, detail, StartNewActivity}) => {
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
                        <th>Red3</th>
                        <th>Red4</th>
                        <th>Red5</th>
                        <th>Red6</th>
                        <th>Red7</th>
                        <th>Red8</th>
                        <th>Green1</th>
                        <th>Green2</th>
                        <th>Green3</th>
                        <th>Green4</th>
                        <th>Yellow1</th>
                        <th>Yellow2</th>
                        <th>Yellow3</th>
                        <th>Yellow4</th>
                        <th>Violet1</th>
                        <th>Violet2</th>
                        <th>Violet3</th>

                    </tr>
                </thead>
                <tbody>{details && details.map((details) => {
                    return (<tr key={details.studentId} style={{ height: "10%" }}>
                        <td>{details.studentName}</td>
                        <td onClick={(e) => { StartNewActivity(details.studentId) }} style={{ color: "blue", fontSize: "15px", cursor: "pointer" }} ><u>View</u></td>
                        <td>{details.studentResult && JSON.parse(details.studentResult).ob1 == 1 ? "True" : "-"}</td>
                        <td>{details.studentResult && JSON.parse(details.studentResult).ob2 == 2 ? "True" : "-"}</td>
                        <td>{details.studentResult && JSON.parse(details.studentResult).ob3 == 3 ? "True" : "-"}</td>
                        <td>{details.studentResult && JSON.parse(details.studentResult).ob4 == 4 ? "True" : "-"}</td>
                        <td>{details.studentResult && JSON.parse(details.studentResult).ob5 == 5 ? "True" : "-"}</td>
                        <td>{details.studentResult && JSON.parse(details.studentResult).ob6 == 6 ? "True" : "-"}</td>
                        <td>{details.studentResult && JSON.parse(details.studentResult).ob7 == 7 ? "True" : "-"}</td>
                        <td>{details.studentResult && JSON.parse(details.studentResult).ob8 == 8 ? "True" : "-"}</td>
                        <td>{details.studentResult && JSON.parse(details.studentResult).ob9 == 9 ? "True" : "-"}</td>
                        <td>{details.studentResult && JSON.parse(details.studentResult).ob10 == 10 ? "True" : "-"}</td>
                        <td>{details.studentResult && JSON.parse(details.studentResult).ob11 == 11 ? "True" : "-"}</td>
                        <td>{details.studentResult && JSON.parse(details.studentResult).ob12 == 12 ? "True" : "-"}</td>
                        <td>{details.studentResult && JSON.parse(details.studentResult).ob13 == 13 ? "True" : "-"}</td>
                        <td>{details.studentResult && JSON.parse(details.studentResult).ob14 == 14 ? "True" : "-"}</td>
                        <td>{details.studentResult && JSON.parse(details.studentResult).ob15 == 15 ? "True" : "-"}</td>
                        <td>{details.studentResult && JSON.parse(details.studentResult).ob16 == 16 ? "True" : "-"}</td>
                        <td>{details.studentResult && JSON.parse(details.studentResult).ob17 == 17 ? "True" : "-"}</td>
                        <td>{details.studentResult && JSON.parse(details.studentResult).ob18 == 18 ? "True" : "-"}</td>
                        <td>{details.studentResult && JSON.parse(details.studentResult).ob19 == 19 ? "True" : "-"}</td>



                    </tr>)
                })}
                </tbody>

            </table>

        </>
    )
}

export default Table6
