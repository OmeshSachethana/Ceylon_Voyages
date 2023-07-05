import axios from 'axios'
import { useEffect, useState } from 'react'
import Layout from '../components/layout'
import background from './auth/backgroundImage.jpg'
import { useNavigate } from 'react-router-dom'

function SearchProfile() {
  const [searchby, setSearchBy] = useState('num')
  const [keyword, setKeyword] = useState('')

  const navigate = useNavigate()

  const searchProfile = (e) => {
    e.preventDefault()
    navigate(`/find-profile/${searchby}/${keyword}`)
  }

  return (
    <>
      <Layout>
        <div
          style={{
            backgroundImage: `url(${background})`,
            height: '900px',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <br></br>
          <center>
            <br />
            <form role="search" onSubmit={(e) => searchProfile(e)}>
              <div>
                <div>
                  <input
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    onChange={(e) => {
                      setKeyword(e.target.value)
                    }}
                    required
                  />
                  &nbsp;&nbsp;&nbsp;
                  <button onClick={(e) => searchProfile(e)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" type="submit">
                    Search
                  </button>
                </div>
              </div>
              <br></br>
              <div>
                <div>
                  <b>Search By</b> &nbsp;&nbsp;&nbsp;
                  <input
                    type="radio"
                    name="searchby"
                    id="flexRadioDefault1"
                    value="username"
                    onClick={(e) => {
                      setSearchBy(e.target.value)
                    }}
                    required
                  />{' '}
                  &nbsp;
                  <label for="flexRadioDefault1">Username</label> &nbsp;&nbsp;&nbsp;
                  <input
                    type="radio"
                    name="searchby"
                    id="flexRadioDefault2"
                    value="firstname"
                    onClick={(e) => {
                      setSearchBy(e.target.value)
                    }}
                    required
                  />{' '}
                  &nbsp;
                  <label for="flexRadioDefault2">First Name</label>
                </div>
              </div>
            </form>
          </center>

          <br></br>
        </div>
      </Layout>
    </>
  )
}

export default SearchProfile
