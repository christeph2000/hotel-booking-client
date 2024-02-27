import React, { useState, useEffect } from "react"
import { getRoomById, updateRoom } from "../utils/ApiFunctions"
import { Link, useParams } from "react-router-dom"

const EditRoom = () => {
  const [room, setroom] = useState({
    photo: "",
    roomType: "",
    roomPrice: "",
  })

  const [imagePreview, setimagePreview] = useState("")
  const [successMessage, setsuccessMessage] = useState("")
  const [errorMessage, seterrorMessage] = useState("")

  const { roomId } = useParams()

  const handleRoomInputChange = (e) => {
    const name = e.target.name
    let value = e.target.value

    setroom({ ...room, [name]: value })
  }

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0]
    setroom({ ...newroom, photo: selectedImage })
    setimagePreview(URL.createObjectURL(selectedImage))
  }

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        console.log(roomId)
        const roomData = await getRoomById(roomId)
        setroom(roomData)
        setimagePreview(roomData.photo)
      } catch (error) {
        console.log(error)
      }
    }
    fetchRoom()
  }, [roomId])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await updateRoom(roomId, room)
      if (response.status === 200) {
        setsuccessMessage("Room updated successfully")
        const updatedRoomData = await getRoomById(roomId)
        setroom(updatedRoomData)
        setimagePreview(updatedRoomData.photo)
        seterrorMessage("")
      } else {
        seterrorMessage("Error updating room")
      }
    } catch (error) {
      console.error(error)
      seterrorMessage(error.message)
    }
  }

  return (
    <>
      <section className="container mt-5 mb-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <h2 className="mt-5 mb-2">Edit Room</h2>

            {successMessage && (
              <div className="alert alert-success fade show">
                {successMessage}
              </div>
            )}

            {errorMessage && (
              <div className="alert alert-danger fade show">{errorMessage}</div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="roomType" className="form-label">
                  Room Type
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="roomType"
                  name="roomType"
                  value={room.roomType}
                  onChange={handleRoomInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="roomPrice" className="form-label">
                  Room Price
                </label>
                <input
                  className="form-control"
                  required
                  id="roomPrice"
                  name="roomPrice"
                  type="number"
                  value={room.roomPrice}
                  onChange={handleRoomInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="photo" className="form-label">
                  Room Photo
                </label>
                <input
                  id="photo"
                  name="photo"
                  type="file"
                  className="form-control"
                  onChange={handleImageChange}
                />
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview Room Photo"
                    style={{ maxWidth: "400px", maxHeight: "400px" }}
                    className="mb-3"
                  />
                )}
              </div>
              <div className="d-grid d-md-flex mt-2">
                <Link
                  to={"/existing-rooms"}
                  className="btn btn-outline-info ml-5"
                >
                  back
                </Link>
                <button type="submit" className="btn btn-outline-warning">
                  Edit Room
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

export default EditRoom
