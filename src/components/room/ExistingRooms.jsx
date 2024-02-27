import React, { useState, useEffect } from "react"
import { deleteRoom, getAllRooms } from "../utils/ApiFunctions"
import RoomFilter from "../common/RoomFilter"
import RoomPaginator from "../common/RoomPaginator"
import { Col, Row } from "react-bootstrap"
import { FaEdit, FaEye, FaPlus, FaTrashAlt } from "react-icons/fa"
import { Link } from "react-router-dom"

export const ExistingRooms = () => {
  const [rooms, setrooms] = useState([])
  const [currentPage, setcurrentPage] = useState(1)
  const [roomsPerPage] = useState(8)
  const [isLoading, setisLoading] = useState(false)
  const [filteredRooms, setfilteredRooms] = useState([])
  const [selectedRoomType, setselectedRoomType] = useState("")
  const [successMessage, setsuccessMessage] = useState("")
  const [errorMessage, seterrorMessage] = useState("")

  useEffect(() => {
    fecthRooms()
  }, [])

  const fecthRooms = async () => {
    setisLoading(true)
    try {
      const results = await getAllRooms()
      setrooms(results)
      setisLoading(false)
    } catch (error) {
      seterrorMessage(error.errorMessage)
    }
  }

  useEffect(() => {
    if (selectedRoomType === "") {
      setfilteredRooms(rooms)
    } else {
      const filtered = rooms.filter(
        (room) => room.roomType === selectedRoomType
      )
      setfilteredRooms(filtered)
    }
    setcurrentPage(1)
  }, [rooms, selectedRoomType])

  const handlePaginationClick = (pageNumber) => {
    setcurrentPage(pageNumber)
  }

  const handleDelete = async (roomId) => {
    try {
      const result = await deleteRoom(roomId)
      if (result === "") {
        setsuccessMessage(`Room no : ${roomId} was deleted`)
        fecthRooms()
      } else {
        console.error(`Error deleting room : ${result.message}`)
      }
    } catch (error) {
      seterrorMessage(error.message)
    }

    setTimeout(() => {
      setsuccessMessage("")
      seterrorMessage("")
    }, 3000)
  }

  const calculateTotalPages = (filteredRooms, roomsPerPage, rooms) => {
    const totalRooms =
      filteredRooms.length > 0 ? filteredRooms.length : rooms.length
    return Math.ceil(totalRooms / roomsPerPage)
  }

  const indexOfLastRoom = currentPage * roomsPerPage
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage
  const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom)

  return (
    <>
      {isLoading ? (
        <p>Loading existing rooms</p>
      ) : (
        <>
          <section className="mt-5 mb-5 container">
            <div className="d-flex justify-content-between mb-3 mt-5">
              <h2>Existing Rooms</h2>
            </div>
            <Row>
              <Col md={6} className="mb-3 mb-md-0">
                <RoomFilter data={rooms} setFilteredData={setfilteredRooms} />
              </Col>

              <Col className="d-flex justify-content-end">
                <Link to={"/add-room"}>
                  <FaPlus />
                  Add Room
                </Link>
              </Col>
            </Row>

            <table className="table table-bordered table-hover">
              <thead>
                <tr className="text-center">
                  <th>ID</th>
                  <th>Room Type</th>
                  <th>Room Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentRooms.map((room) => (
                  <tr key={room.id} className="text-center">
                    <td>{room.id}</td>
                    <td>{room.roomType}</td>
                    <td>{room.roomPrice}</td>
                    <td className="gap-2">
                      <Link to={`/edit-room/${room.id}`}>
                        <span className="btn btn-info btn-sm">
                          <FaEye />
                        </span>
                        <span className="btn btn-warning btn-sm">
                          <FaEdit />
                        </span>
                      </Link>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => {
                          handleDelete(room.id)
                        }}
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <RoomPaginator
              currentPage={currentPage}
              totalPages={calculateTotalPages(
                filteredRooms,
                roomsPerPage,
                rooms
              )}
              onPageChange={handlePaginationClick}
            />
          </section>
        </>
      )}
    </>
  )
}
