import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Layout from '../components/layout'
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
import storage from '../firebase'
import background from './auth/backgroundImage.jpg'
import { getUser, updateUser, deleteUser } from '../services/users'

export function EditProfile() {
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
  const [active, setActive] = useState('')
  const { id } = useParams()
  const [currentId, setCurrentID] = useState('')
  const [about, setAbout] = useState('')
  let [image_link, setImageLink] = useState('')

  const navigate = useNavigate()

  // firebase

  let [filename, setFileName] = useState()
  const [progress, setProgress] = useState(0)

  const formHandler = (e) => {
    e.preventDefault()
    const file = e.target[0].files[0]
    uploadFiles(file)
  }

  const uploadFiles = (file) => {
    //
    if (!file) return
    const sotrageRef = ref(storage, `images/${file.name}`)
    const uploadTask = uploadBytesResumable(sotrageRef, file)

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        setProgress(prog)
      },
      (error) => console.log(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File: ', downloadURL)
          console.log(typeof downloadURL)
          setFileName(downloadURL)
        })
      },
    )
  }
  const uid = localStorage.getItem('uid')

  useEffect(() => {
    // axios
    //   .get(`http://localhost:3500/api/users/${id}`)
    getUser(uid)
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
        setCurrentID(res.users._id)
        setAbout(res.users.about)
        setImageLink(res.users.image_link)
      })
      .catch((err) => {})
  }, [])

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
  const onActiveChanged = (e) => setActive(e.target.checked)
  const onAboutChanged = (e) => setAbout(e.target.value)

  const sendData = (e) => {
    e.preventDefault()
    image_link = filename

    const updatedUser = {
      id: currentId,
      username,
      password,
      roles,
      first_name,
      last_name,
      mobile,
      dob,
      gender,
      active,
      image_link,
      about,
    }
    console.log(id, username, password, roles, first_name, last_name, mobile, dob, gender, active, image_link, about)
    // axios
    //   .patch('http://localhost:4000/api/users/', updatedUser)
    updateUser(updatedUser)
      .then(() => {
        alert('User Updated')
        navigate('/')
      })
      .catch((err) => {
        alert(err)
      })
  }

  const onDeleteUserClicked = (e) => {
    e.preventDefault()
    console.log('id: ', uid)
    const idu = uid
    const deletedUser = {
      idu,
    }
    // axios
    // .delete('http://localhost:3500/users/', deletedUser)
    deleteUser(deletedUser)
      .then(() => {
        localStorage.removeItem('accessToken')
        alert('User Deleted')
        navigate('/')
      })
      .catch((err) => {
        alert(err)
      })
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
            <center>
              <div>
                <form onSubmit={formHandler}>
                  Rename picture as per Username &nbsp;
                  <input type="file" className="input" />
                  <button type="submit" className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-2 px-3 rounded">
                    Upload Photo
                  </button>
                  Uploading done {progress}%
                </form>
              </div>
              <form class=" max-w-lg bg-white  p-6" style={{ opacity: 0.8 }} onSubmit={sendData}>
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
                  <label className="form__label form__checkbox-container" htmlFor="active">
                    ACTIVE:
                    <input id="active" name="active" type="checkbox" checked={active} onChange={onActiveChanged} />
                  </label>
                  <br />
                  <label className="form__label" htmlFor="roles">
                    ASSIGNED ROLES:
                  </label>
                  <select class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="roles" name="roles" type="text" autoComplete="off" value={roles} onChange={onRolesChanged}>
                    <option defaultValue={''}>Choose...</option>
                    <option value="Client">Client</option>
                    <option value="Admin">Admin</option>
                  </select>
                  <label className="form__label" htmlFor="about">
                    About:
                  </label>
                  <textarea
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    id="about"
                    name="about"
                    type="text"
                    autoComplete="off"
                    value={about}
                    onChange={onAboutChanged}
                  />
                  <br />
                  <button class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-2 px-3 rounded" type="submit">
                    Update
                  </button>{' '}
                  &nbsp;
                  <button class="flex-shrink-0 bg-red-500 hover:bg-red-700 border-red-500 hover:border-red-700 text-sm border-4 text-white py-2 px-3 rounded" onClick={onDeleteUserClicked}>
                    Delete
                  </button>
                </center>
              </form>
            </center>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default EditProfile
