import React from 'react'

const Table6 = ({ details, detail, StartNewActivity }) => {
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
                        <td>{details.studentResult && JSON.parse(details.studentResult).ob1 == 1 ? "True" : JSON.parse(details.studentResult).ob1 == "wrong" ? "False" : "-"}</td>
                        <td>{details.studentResult && JSON.parse(details.studentResult).ob2 == 2 ? "True" : JSON.parse(details.studentResult).ob2 == "wrong" ? "False" : "-"}</td>
                        <td>{details.studentResult && JSON.parse(details.studentResult).ob3 == 3 ? "True" : JSON.parse(details.studentResult).ob3 == "wrong" ? "False" : "-"}</td>
                        <td>{details.studentResult && JSON.parse(details.studentResult).ob4 == 4 ? "True" : JSON.parse(details.studentResult).ob4 == "wrong" ? "False" : "-"}</td>
                        <td>{details.studentResult && JSON.parse(details.studentResult).ob5 == 5 ? "True" : JSON.parse(details.studentResult).ob5 == "wrong" ? "False" : "-"}</td>
                        <td>{details.studentResult && JSON.parse(details.studentResult).ob6 == 6 ? "True" : JSON.parse(details.studentResult).ob6 == "wrong" ? "False" : "-"}</td>
                        <td>{details.studentResult && JSON.parse(details.studentResult).ob7 == 7 ? "True" : JSON.parse(details.studentResult).ob7 == "wrong" ? "False" : "-"}</td>
                        <td>{details.studentResult && JSON.parse(details.studentResult).ob8 == 8 ? "True" : JSON.parse(details.studentResult).ob8 == "wrong" ? "False" : "-"}</td>
                        <td>{details.studentResult && JSON.parse(details.studentResult).ob9 == 9 ? "True" : JSON.parse(details.studentResult).ob9 == "wrong" ? "False" : "-"}</td>
                        <td>{details.studentResult && JSON.parse(details.studentResult).ob10 == 10 ? "True" : JSON.parse(details.studentResult).ob10 == "wrong" ? "False" : "-"}</td>
                        <td>{details.studentResult && JSON.parse(details.studentResult).ob11 == 11 ? "True" : JSON.parse(details.studentResult).ob11 == "wrong" ? "False" : "-"}</td>
                        <td>{details.studentResult && JSON.parse(details.studentResult).ob12 == 12 ? "True" : JSON.parse(details.studentResult).ob12 == "wrong" ? "False" : "-"}</td>
                        <td>{details.studentResult && JSON.parse(details.studentResult).ob13 == 13 ? "True" : JSON.parse(details.studentResult).ob13 == "wrong" ? "False" : "-"}</td>
                        <td>{details.studentResult && JSON.parse(details.studentResult).ob14 == 14 ? "True" : JSON.parse(details.studentResult).ob14 == "wrong" ? "False" : "-"}</td>
                        <td>{details.studentResult && JSON.parse(details.studentResult).ob15 == 15 ? "True" : JSON.parse(details.studentResult).ob15 == "wrong" ? "False" : "-"}</td>
                        <td>{details.studentResult && JSON.parse(details.studentResult).ob16 == 16 ? "True" : JSON.parse(details.studentResult).ob16 == "wrong" ? "False" : "-"}</td>
                        <td>{details.studentResult && JSON.parse(details.studentResult).ob17 == 17 ? "True" : JSON.parse(details.studentResult).ob17 == "wrong" ? "False" : "-"}</td>
                        <td>{details.studentResult && JSON.parse(details.studentResult).ob18 == 18 ? "True" : JSON.parse(details.studentResult).ob18 == "wrong" ? "False" : "-"}</td>
                        <td>{details.studentResult && JSON.parse(details.studentResult).ob19 == 19 ? "True" : JSON.parse(details.studentResult).ob19 == "wrong" ? "False" : "-"}</td>



                    </tr>)
                })}
                </tbody>

            </table>

        </>
    )
}

export default Table6
