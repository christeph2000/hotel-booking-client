import React from "react"
import MainHeader from "../layout/HeaderMain"
import HotelService from "../common/HotelServices"
import Parallax from "../common/Parallax"
import RoomCarousel from "../common/RoomCarousel"

const Home = () => {
  return (
    <section>
      <MainHeader />

      <section className="container">
        <RoomCarousel />
        <Parallax />
        <RoomCarousel />
        <HotelService />
        <Parallax />
        <RoomCarousel />
      </section>
    </section>
  )
}

export default Home
