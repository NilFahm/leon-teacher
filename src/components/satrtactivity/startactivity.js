import React from 'react'

const Startactivity = (getactivitydetails) => {
  useEffect(() => {
    console.log(getactivitydetails.activityname)
  }, [])
  return (
    <>
      <div className="starLink">
        <Link
          to=""
          style={{ cursor: "pointer" }}
          onClick={(e) => StartNewActivity("matching")}
        >
          Matching
        </Link>
        <Link
          to=""
          style={{ cursor: "pointer" }}
          onClick={(e) => StartNewActivity("Observing Ability")}
        >
          Observing Ability
        </Link>
        <Link
          to=""
          style={{ cursor: "pointer" }}
          onClick={(e) => StartNewActivity("Descrimination")}
        >
          Descrimination
        </Link>
        <a href="teacher-className-classification.html">
          Classification
        </a>
        <a href="teacher-className-spelling.html">
          Correct the Spelling
        </a>
        <a href="teacher-className-identify.html">
          Identify the Object
        </a>
        <a href="teacher-className-count.html">
          Count the Numbers
        </a>
      </div>

    </>
  )
}

export default Startactivity
