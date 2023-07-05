import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../components/layout'
import background from './auth/backgroundImage.jpg'
import { useNavigate } from 'react-router-dom'

function SearchProfileResults() {
  const { searchby, keyword } = useParams()
  const [users, setUsers] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    function getUsers() {
      axios
        .get(`https://af-backend-production.up.railway.app/api/users/search/${searchby}/${keyword}`)
        .then((res) => {
          console.log(res.data)
          setUsers(res.data)
        })
        .catch((err) => {
          alert(err.message)
        })
    }

    getUsers()
  }, [])

  const handleView = () => {
    navigate(`/view-public-profile/${users._id}`)
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
          <br />
          <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left dark:text-gray-400 bg-white" style={{ fontSize: '13px', opacity: 0.8 }}>
              <tr class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <th class="px-6 py-3">Username</th>
                <th class="px-6 py-3">First Name</th>
                <th class="px-6 py-3">Last Name</th>
                <th class="px-6 py-3">Mobile</th>
              </tr>

              <tbody>
                {users.map((user) => (
                  <tr>
                    <td class="px-6 py-4">{user.username}</td>
                    <td class="px-6 py-4">{user.first_name}</td>
                    <td class="px-6 py-4">{user.last_name}</td>
                    <td class="px-6 py-4">{user.mobile}</td>
                    <td>
                      <button
                        class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        onClick={() => {
                          navigate(`/view-public-profile/${user._id}`)
                        }}
                      >
                        View <i class="fa fa-eye" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default SearchProfileResults
