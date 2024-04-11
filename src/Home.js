import React, { useState, useEffect } from 'react'
import './Home.css'

function App() {
  const [databases, setDatabases] = useState([])
  const [masterDatabase, setMasterDatabase] = useState('')
  const [slaveDatabase, setSlaveDatabase] = useState('')
  const [remainingDatabases, setRemainingDatabases] = useState([])

  useEffect(() => {
    fetch('http://localhost/masterslave/api/databases.php')
      .then((response) => response.json())
      .then((data) => {
        setDatabases(data)
        setRemainingDatabases(data)
      })
      .catch((error) => console.error('Error fetching databases: ', error))
  }, [])

  const handleMasterSelectChange = (event) => {
    const selectedMaster = event.target.value
    setMasterDatabase(selectedMaster)

    setRemainingDatabases(databases.filter((db) => db !== selectedMaster))

    if (selectedMaster === slaveDatabase) {
      setSlaveDatabase('')
    }
  }

  const handleSlaveSelectChange = (event) => {
    setSlaveDatabase(event.target.value)
  }

  const handleReplication = () => {
    fetch(
      `http://localhost/masterslave/api/replication.php?masterDatabase=${masterDatabase}&slaveDatabase=${slaveDatabase}`
    )
      .then((response) => response.text())
      .then((message) => alert(message))
      .catch((error) => console.error('Error copying tables: ', error))

    setMasterDatabase('')
    setSlaveDatabase('')
    setRemainingDatabases([])
  }

  const handleMirroring = () => {
    fetch(
      `http://localhost/masterslave/api/mirroring.php?masterDatabase=${masterDatabase}&slaveDatabase=${slaveDatabase}`
    )
      .then((response) => response.text())
      .then((message) => alert(message))
      .catch((error) => console.error('Error copying tables: ', error))

    setMasterDatabase('')
    setSlaveDatabase('')
    setRemainingDatabases([])
  }

  return (
    <div>
      {/* Database Replication */}
      <div className="container">
        <h1 className="title">Database Replication</h1>
        <div className="select-container">
          <div className="select-box">
            <label htmlFor="masterSelect">Select master database: </label>
            <select
              id="masterSelect"
              value={masterDatabase}
              onChange={handleMasterSelectChange}
            >
              <option value="">Select an option</option>
              {databases.map((database, index) => (
                <option key={index} value={database}>
                  {database}
                </option>
              ))}
            </select>
          </div>
          <div className="select-box">
            <label htmlFor="slaveSelect">Select slave database: </label>
            <select
              id="slaveSelect"
              value={slaveDatabase}
              onChange={handleSlaveSelectChange}
              disabled={!masterDatabase}
            >
              <option value="">Select an option</option>
              {remainingDatabases.map((database, index) => (
                <option key={index} value={database}>
                  {database}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button
          className="submit-btn"
          onClick={handleReplication}
          disabled={!masterDatabase || !slaveDatabase}
        >
          Submit
        </button>
      </div>

      {/* Database Mirroring */}
      <div className="container">
        <h1 className="title">Database Mirroring</h1>
        <div className="select-container">
          <div className="select-box">
            <label htmlFor="masterSelect">Select master database: </label>
            <select
              id="masterSelect"
              value={masterDatabase}
              onChange={handleMasterSelectChange}
            >
              <option value="">Select an option</option>
              {databases.map((database, index) => (
                <option key={index} value={database}>
                  {database}
                </option>
              ))}
            </select>
          </div>
          <div className="select-box">
            <label htmlFor="slaveSelect">Select slave database: </label>
            <select
              id="slaveSelect"
              value={slaveDatabase}
              onChange={handleSlaveSelectChange}
              disabled={!masterDatabase}
            >
              <option value="">Select an option</option>
              {remainingDatabases.map((database, index) => (
                <option key={index} value={database}>
                  {database}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button
          className="submit-btn"
          onClick={handleMirroring}
          disabled={!masterDatabase || !slaveDatabase}
        >
          Submit
        </button>
      </div>
    </div>
  )
}

export default App
