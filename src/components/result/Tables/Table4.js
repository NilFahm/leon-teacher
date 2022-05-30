import React, { useEffect, useState } from 'react'

const Table4 = ({ details, StartNewActivity }) => {
    const [state, setstate] = useState(null)


    // function filter(data) {
    //     var details = JSON.parse(data)
    //     console.log(details)
    //     if (details.ob1 == 1 && details.ob2 == 2 && details.ob3 == 3 && details.ob4 == 4 && details.ob5 == 5 && details.ob6 == 6 && details.ob7 == 7 && details.ob8 == 8) {
    //         return setstate("Completed")
    //     }
    // }

    return (
        <>
            <table
                className="reslutTable" style={{ width: "100%" }}>
                <thead>
                    <tr>
                        <th> STUDENT NAME</th>
                        <th>View</th>
                        <th>Car1</th>
                        <th>Car2</th>
                        <th>Butterfly1</th>
                        <th>Butterfly2</th>
                        <th>Flower1</th>
                        <th>Flower2</th>
                        <th>Bike1</th>
                        <th>Bike2</th>

                    </tr>
                </thead>
                <tbody>{details && details.map((details) => {
                    return (<tr key={details.studentId} style={{ height: "10%" }}>
                        <td>{details.studentName}</td>
                        <td onClick={(e) => { StartNewActivity(details.studentId) }} style={{ color: "blue", fontSize: "15px", cursor: "pointer" }}><u>View</u></td>
                        <td>{details.studentResult && JSON.parse(details.studentResult).ob1 == 1 ? "True" : JSON.parse(details.studentResult).ob1 == "wrong" ? "False" : "-"}</td>
                        <td>{details.studentResult && JSON.parse(details.studentResult).ob2 == 2 ? "True" : JSON.parse(details.studentResult).ob2 == "wrong" ? "False" : "-"}</td>
                        <td>{details.studentResult && JSON.parse(details.studentResult).ob3 == 3 ? "True" : JSON.parse(details.studentResult).ob3 == "wrong" ? "False" : "-"}</td>
                        <td>{details.studentResult && JSON.parse(details.studentResult).ob4 == 4 ? "True" : JSON.parse(details.studentResult).ob4 == "wrong" ? "False" : "-"}</td>
                        <td>{details.studentResult && JSON.parse(details.studentResult).ob5 == 5 ? "True" : JSON.parse(details.studentResult).ob5 == "wrong" ? "False" : "-"}</td>
                        <td>{details.studentResult && JSON.parse(details.studentResult).ob6 == 6 ? "True" : JSON.parse(details.studentResult).ob6 == "wrong" ? "False" : "-"}</td>
                        <td>{details.studentResult && JSON.parse(details.studentResult).ob7 == 7 ? "True" : JSON.parse(details.studentResult).ob7 == "wrong" ? "False" : "-"}</td>
                        <td>{details.studentResult && JSON.parse(details.studentResult).ob8 == 8 ? "True" : JSON.parse(details.studentResult).ob8 == "wrong" ? "False" : "-"}</td>


                    </tr>)
                })}
                </tbody>

            </table>
        </>
    )
}

export default Table4
