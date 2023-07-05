import { Section } from '../components/common'
import Layout from '../components/layout'
import CardStack from '../components/items/card_carousel/cardStack'
import Search from '../components/items/search/search'
import { debounce } from 'lodash'
import { getAllItems, searchItem } from '../services/items'
import { useEffect, useState } from 'react'

const Items = () => {
  const [itemsRes, setItemsRes] = useState(null)

  const handleSearch = async (term) => {
    try {
      let response;
      if (term.trim() === "") {
        // If the search term is empty, fetch all items
        response = await getAllItems();
      } else {
        // If there is a search term, perform the search
        response = await searchItem(term);
      }
      setItemsRes(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const refresh = debounce(() => {
    getAllItems().then(({ data }) => setItemsRes(data))
  }, 300)

  useEffect(() => {
    refresh()
  }, [])

  return (
    <Layout title="Restaurants and Products">
      {/* <SearchBar onSearch={handleSearch} /> */}
      <div className="w-full relative mb-20">
        <Search onSearch={handleSearch} />
      </div> <br /> <br /> <br /> <br /> <br />
      <div className="bg-white">
        <Section className="max-w-7xl mx-auto">
          <div className=" flex flex-col items-center">
            <h1 className="text-center text-3xl font-bold">Sri Lankan Hotels</h1>
            <p className="text-center w-[70%] text-sm">
              Get your adrenaline pumping with our Sri Lankan adventure tour. Trek through lush rainforests, raft down raging rivers, and climb towering mountains. This tour is perfect for thrill-seekers who want to experience the best of Sri Lanka's natural beauty.
            </p>
          </div>
          <div className="mt-16 h-[30rem]">{itemsRes && <CardStack data={itemsRes.filter((item) => item.category === 'hotel')} />}</div>
        </Section>
      </div>
      <div className="bg-gray-100">
        <Section className="max-w-7xl mx-auto ">
          <div className=" flex flex-col items-center pt-12">
            <h1 className="text-center text-3xl font-bold">Sri Lankan Restaurants</h1>
            <p className="text-center w-[70%] text-sm">
              Get your adrenaline pumping with our Sri Lankan adventure tour. Trek through lush rainforests, raft down raging rivers, and climb towering mountains. This tour is perfect for thrill-seekers who want to experience the best of Sri Lanka's natural beauty.
            </p>
          </div>
          <div className="mt-16 h-[30rem]">{itemsRes && <CardStack data={itemsRes.filter((item) => item.category === 'restaurant')} />}</div>
        </Section>
      </div>
    </Layout>
  )
}

export default Items
