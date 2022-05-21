import React,{useEffect,useState} from 'react'

const Table4 = ({ details, StartNewActivity }) => {
    const [state, setstate] = useState(null)
    useEffect(() => {
    }, [])

    function filter(data) {
        var details = JSON.parse(data)
        console.log(details)
        if (details.ob1 == 1 && details.ob2 == 2 && details.ob3 == 3 && details.ob4 == 4 && details.ob5 == 5 && details.ob6 == 6 && details.ob7 == 7 && details.ob8 == 8) {
            return setstate("Completed")
        }
    }

    return (
        <>
            <table
                className="reslutTable" style={{ width: "100%" }}>
                <thead>
                    <tr>
                        <th> STUDENT NAME</th>
                        <th>View</th>
                        <th>filter</th>
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
                        <td>{details.studentResult && state == "Completed" ? "Completed" : "Pending" }</td>
                        <td>{details.studentResult && JSON.parse(details.studentResult).ob1 == 1 ? "True" : "-"}</td>
                        <td>{details.studentResult && JSON.parse(details.studentResult).ob2 == 2 ? "True" : "-"}</td>
                        <td>{details.studentResult && JSON.parse(details.studentResult).ob3 == 3 ? "True" : "-"}</td>
                        <td>{details.studentResult && JSON.parse(details.studentResult).ob4 == 4 ? "True" : "-"}</td>
                        <td>{details.studentResult && JSON.parse(details.studentResult).ob5 == 5 ? "True" : "-"}</td>
                        <td>{details.studentResult && JSON.parse(details.studentResult).ob6 == 6 ? "True" : "-"}</td>
                        <td>{details.studentResult && JSON.parse(details.studentResult).ob7 == 7 ? "True" : "-"}</td>
                        <td>{details.studentResult && JSON.parse(details.studentResult).ob8 == 8 ? "True" : "-"}</td>


                    </tr>)
                })}
                </tbody>

            </table>
        </>
    )
}

export default Table4
