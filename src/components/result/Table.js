import React, { useEffect, useState } from 'react'
import './result.css'
import Table1 from './Tables/Table1'
import Table2 from './Tables/Table2'
import Table3 from './Tables/Table3'
import Table4 from './Tables/Table4'
import Table5 from './Tables/Table5'
import Table6 from './Tables/Table6'

const Table = ({ details,detail, StartNewActivity }) => {
    const [data, setdata] = useState(0)
    useEffect(() => {
        console.log(detail)
        setdata(detail)
    }, [data])

    return (
        <>

            {data && data == "1" ? <Table1 details={details} detail={detail} StartNewActivity={StartNewActivity} /> : ""}
            {data && data == "2" ? <Table2 details={details} detail={detail} StartNewActivity={StartNewActivity} /> : ""}
            {data && data == "3" ? <Table3 details={details} detail={detail} StartNewActivity={StartNewActivity} /> : ""}
            {data && data == "4" ? <Table4 details={details} detail={detail} StartNewActivity={StartNewActivity} /> : ""}
            {data && data == "5" ? <Table5 details={details} detail={detail} StartNewActivity={StartNewActivity} /> : ""}
            {data && data == "6" ? <Table6 details={details} detail={detail} StartNewActivity={StartNewActivity} /> : ""}

        </>
    )
}

export default Table
