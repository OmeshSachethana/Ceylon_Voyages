import { Section } from '../components/common'
import Layout from '../components/layout'
import CardStack from '../components/tours/card_carousel/cardStack'
import Search from '../components/tours/search/search'
import Hero from '../components/tours/slider/slider'
import { debounce } from 'lodash'
import { getAllTours } from '../services/tours'
import { useEffect, useState } from 'react'

const Tours = () => {
  const [toursRes, setToursRes] = useState(null)

  const refresh = debounce(() => {
    getAllTours().then(({ data }) => setToursRes(data))
  }, 300)

  useEffect(() => {
    refresh()
  }, [])

  return (
    <Layout title="Tour">
      <div>
        <Hero />
      </div>
      <div className="w-full relative mb-20 md:mb-28">
        <Search />
      </div>
      <div className="bg-white">
        <Section className="px-4 h-full md:px-4 md:max-w-7xl mx-auto">
          <div className=" flex flex-col items-center">
            <h1 className="text-center text-2xl md:text-3xl font-bold">Sri Lankan Cultural Tours</h1>
            <p className="text-center px-8 text-[12px] md:text-sm">
              Get your adrenaline pumping with our Sri Lankan adventure tour. Trek through lush rainforests, raft down raging rivers, and climb towering mountains. This tour is perfect for thrill-seekers who want to experience the best of Sri Lanka's natural beauty.
            </p>
          </div>
          <div className="px-5 mt-10 md:mt-16 h-[30rem] ">{toursRes && <CardStack data={toursRes.filter((tour) => tour.tourType === 'cultural')} />}</div>
        </Section>
      </div>
      <div className="bg-gray-100 ">
        <Section className="px-4 h-full md:px-4 md:max-w-7xl mx-auto">
          <div className=" flex flex-col items-center pt-12">
            <h1 className="text-center text-2xl md:text-3xl font-bold">Sri Lankan Adventure Tours</h1>
            <p className="text-center px-8 text-[12px] md:text-sm">
              Get your adrenaline pumping with our Sri Lankan adventure tour. Trek through lush rainforests, raft down raging rivers, and climb towering mountains. This tour is perfect for thrill-seekers who want to experience the best of Sri Lanka's natural beauty.
            </p>
          </div>
          <div className="px-5 mt-16 h-[30rem] md:h-[30rem]">{toursRes && <CardStack data={toursRes.filter((tour) => tour.tourType === 'adventure')} />}</div>
        </Section>
      </div>
      <div className="bg-white">
        <Section className="px-4 h-full md:px-4 md:max-w-7xl mx-auto">
          <div className=" flex flex-col items-center pt-12">
            <h1 className="text-center text-2xl md:text-3xl font-bold">Sri Lankan Beach Escapes</h1>
            <p className="text-center px-8 text-[12px] md:text-sm">
              Escape to paradise on our Sri Lankan beach tour. Relax on pristine white-sand beaches, swim in crystal-clear waters, and soak up the sun. This tour is perfect for those who want to unwind and enjoy the beauty of Sri Lanka's coastline.
            </p>
          </div>
          <div className="px-5 mt-16 h-[30rem] md:h-[30rem]">{toursRes && <CardStack data={toursRes.filter((tour) => tour.tourType === 'beach')} />}</div>
        </Section>
      </div>
      <div className="bg-gray-100">
        <Section className="px-4 h-full md:px-4 md:max-w-7xl mx-auto">
          <div className=" flex flex-col items-center pt-12">
            <h1 className="text-center text-2xl md:text-3xl font-bold">Sri Lankan Camping Adventures</h1>
            <p className="text-center px-8 text-[12px] md:text-sm">
              Experience the great outdoors on our Sri Lankan camping adventure. Sleep under the stars, hike through stunning wilderness, and enjoy campfire meals. This tour is perfect for those who want to connect with nature and experience Sri Lanka's rugged beauty.
            </p>
          </div>
          <div className="px-5 mt-16 h-[30rem] md:h-[30rem]">{toursRes && <CardStack data={toursRes.filter((tour) => tour.tourType === 'camping')} />}</div>
        </Section>
      </div>
    </Layout>
  )
}

export default Tours
