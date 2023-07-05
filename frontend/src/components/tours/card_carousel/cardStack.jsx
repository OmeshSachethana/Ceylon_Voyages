import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { FreeMode, Pagination, Autoplay } from 'swiper'

import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/pagination'

import { Card } from '../../common'
SwiperCore.use([Pagination, Autoplay])

const CardStack = ({ data }) => {
  return (
    <Swiper
      modules={[Pagination]}
      freeMode={true}
      spaceBetween={50}
      pagination={{ clickable: true }}
      className="h-full"
      breakpoints={{
        // Modify the values as per your needs
        640: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 3,
        },
        1024: {
          slidesPerView: 4,
        },
      }}
    >
      {data &&
        data.map((tour) => (
          <SwiperSlide key={tour.id}>
            <Card tour={tour} />
          </SwiperSlide>
        ))}
    </Swiper>
  )
}

export default CardStack
