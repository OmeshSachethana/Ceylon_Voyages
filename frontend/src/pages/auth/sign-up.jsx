import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { createUser } from '../../services/users'
import axios from 'axios'
import Layout from '../../components/layout'
import background from './backgroundImage.jpg'
import { Navigate } from 'react-router-dom'

export function SignUp() {
  const USER_REGEX = /^[A-z]{3,20}$/
  const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/
  const MOBILE_REGEX = /^[0-9]{10}$/

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

  const navigate = useNavigate()

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username))
    setUsernameError(USER_REGEX.test(username) ? '' : 'Username should be 3-20 (only letters A(a)-Z(z))')
  }, [username])

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password))
    setPasswordError(PWD_REGEX.test(password) ? '' : 'Password should be "4-12 chars incl. !@#$%')
  }, [password])

  useEffect(() => {
    setValidMobile(MOBILE_REGEX.test(mobile))
    setMobileError(MOBILE_REGEX.test(mobile) ? '' : 'Enter Valid Mobile Number')
  }, [mobile])

  const onUsernameChanged = (e) => setUsername(e.target.value)
  const onPasswordChanged = (e) => setPassword(e.target.value)
  const onRolesChanged = (e) => setRoles(e.target.value)
  const onFirstNameChanged = (e) => setFirstName(e.target.value)
  const onLastNameChanged = (e) => setLastName(e.target.value)
  const onMobileChanged = (e) => setMobile(e.target.value)
  const onDOBChanged = (e) => setDOB(e.target.value)
  const onGenderChanged = (e) => setGender(e.target.value)

  const sendData = (e) => {
    e.preventDefault()

    const newUser = {
      username,
      password,
      roles,
      first_name,
      last_name,
      mobile,
      dob,
      gender,
    }
    console.log(username, password, roles, first_name, last_name, mobile, dob, gender)
    // axios.post("http://localhost:3500/api/users/", newUser).then(() => {
    try {
      const response = createUser(newUser)
      if (response) {
        alert('User Added')
        navigate('/')
      } else {
        alert('User ID Already Available')
      }
    } catch (error) {
      alert('User ID Already Available')
    }
    // createUser(newUser).then(() => {

    // })
    // .catch((err) => {
    //   // alert(err)

    // })
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
          <div>
            <br />
            <br />
            <center>
              <div class="w-full max-w-xl">
                <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" style={{ opacity: 0.8 }} onSubmit={sendData}>
                  <center className="container">
                    <label className="form__label">Username:</label>
                    {usernameError && <p className="text-red-500">{usernameError}</p>}
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="username"
                      name="username"
                      type="text"
                      autoComplete="off"
                      value={username}
                      onChange={onUsernameChanged}
                    />
                    <label className="form__label" htmlFor="first_name">
                      First Name:
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="first_name"
                      name="first_name"
                      type="text"
                      autoComplete="off"
                      value={first_name}
                      onChange={onFirstNameChanged}
                    />
                    <label className="form__label" htmlFor="last_name">
                      Last Name:{' '}
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="last_name"
                      name="last_name"
                      type="text"
                      autoComplete="off"
                      value={last_name}
                      onChange={onLastNameChanged}
                    />
                    <label className="form__label" htmlFor="mobile">
                      Mobile:{' '}
                    </label>
                    {mobileError && <p className="text-red-500">{mobileError}</p>}
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="mobile"
                      name="mobile"
                      type="text"
                      autoComplete="off"
                      value={mobile}
                      onChange={onMobileChanged}
                    />
                    <label className="form__label" htmlFor="dob">
                      Date of Birth:{' '}
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="dob" name="dob" type="date" autoComplete="off" value={dob} onChange={onDOBChanged} />

                    <label className="form__label" htmlFor="gender">
                      Gender:{' '}
                    </label>
                    <select
                      class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="gender"
                      name="gender"
                      type="text"
                      autoComplete="off"
                      value={gender}
                      onChange={onGenderChanged}
                    >
                      <option defaultValue={''}>Choose...</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>

                    <label className="form__label" htmlFor="password">
                      Password:
                    </label>
                    {passwordError && <p className="text-red-500">{passwordError}</p>}
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="password"
                      name="password"
                      type="password"
                      placeholder="4-12 chars incl. !@#$%"
                      value={password}
                      onChange={onPasswordChanged}
                    />

                    <label className="form__label" htmlFor="roles">
                      ASSIGNED ROLES:
                    </label>
                    <select
                      class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="roles"
                      name="roles"
                      type="text"
                      autoComplete="off"
                      value={roles}
                      onChange={onRolesChanged}
                    >
                      <option defaultValue={''}>Choose...</option>
                      <option value="Client">Client</option>
                      <option value="Admin">Admin</option>
                    </select>
                    <br />
                    <button class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-2 px-3 rounded" type="submit">
                      Sign Up
                    </button>
                  </center>
                </form>
              </div>
            </center>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default SignUp
