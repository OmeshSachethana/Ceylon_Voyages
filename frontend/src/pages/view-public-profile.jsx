import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Layout from '../components/layout'
import { getUser } from '../services/users'
import background from './auth/backgroundImage.jpg'

export function ViewPublicProfile() {
  const [username, setUsername] = useState('')
  const [validUsername, setValidUsername] = useState(false)
  const [password, setPassword] = useState('')
  const [validPassword, setValidPassword] = useState(false)
  const [roles, setRoles] = useState('Client')
  const [first_name, setFirstName] = useState('')
  const [last_name, setLastName] = useState('')
  const [mobile, setMobile] = useState('')
  const [validMobile, setValidMobile] = useState(false)
  const [dob, setDOB] = useState('')
  const [gender, setGender] = useState('')
  const [usernameError, setUsernameError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [mobileError, setMobileError] = useState('')
  const [active, setActive] = useState('')
  const [image_link, setImageLink] = useState('')
  const [about, setAbout] = useState('')

  const { id } = useParams()

  const navigate = useNavigate()

  // const id = localStorage.getItem('id');
  // const uid = localStorage.getItem('uid')

  useEffect(() => {
    // .get(`http://localhost:3500/api/users/${id}`)
    getUser(id)
      .then((res) => {
        console.log(res.users)
        setUsername(res.users.username)
        setFirstName(res.users.first_name)
        setLastName(res.users.last_name)
        setMobile(res.users.mobile)
        setDOB(res.users.dob)
        setRoles(res.users.roles)
        setActive(res.users.active)
        setGender(res.users.gender)
        setImageLink(res.users.image_link)
        setAbout(res.users.about)
      })
      .catch((err) => {})
  }, [])
  console.log('imagelink', image_link)

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
          <div style={{ marginRight: '0px', marginLeft: 'auto', width: '30%' }}>
            <button
              style={{ marginRight: '0px', marginLeft: '10px' }}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
              onClick={() => {
                window.location.replace(`http://localhost:3000/find-profile/`)
              }}
            >
              Find Profile
            </button>
          </div>
          <center>
            <img src={image_link} class="w-32 rounded-full" alt="Avatar" />

            <div className="bg-white max-w-2xl shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">{username}</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">Hi! I am {' ' + first_name + ' '}. </p>
              </div>
              <div className="border-t border-gray-200">
                <dl>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Full name</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {first_name + ' '} {last_name}
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Mobile</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{mobile}</dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Date of Birth</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{dob}</dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Gender</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{gender}</dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">About</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{about}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </center>
        </div>
      </Layout>
    </>
  )
}

export default ViewPublicProfile
