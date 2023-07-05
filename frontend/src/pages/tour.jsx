import { debounce } from 'lodash'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../components/layout'
import { GlobeAltIcon } from '@heroicons/react/20/solid'
import { getTour } from '../services/tours'
import toast from '../libs/toastify'

import Reviews from './reviews'

import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

import { createBooking } from '../services/booking'

const Tour = () => {
  const id = useParams().id
  const starIcons = []
  const [tourRes, setTourRes] = useState(null)
  const [open, setOpen] = useState(false)
  const [numRatings, setNumRatings] = useState(0)
  const [averageRating, setAverageRating] = useState(0)

  const handleReviewsData = (numRatingsFromChild, averageRatingFromChild) => {
    setNumRatings(numRatingsFromChild)
    setAverageRating(averageRatingFromChild)
  }

  for (let i = 1; i <= 5; i++) {
    if (i <= averageRating) {
      starIcons.push(
        <svg key={i} fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-4 h-4 text-primary" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>,
      )
    } else {
      starIcons.push(
        <svg key={i} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-4 h-4 text-primary" viewBox="0 0 24 24">
          <path stroke="none" d="M0 0h24v24H0z" />
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>,
      )
    }
  }

  // form
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [date, setDate] = useState('')
  const [budget, setBudget] = useState('')

  //validation
  const [isEmpty, setIsEmpty] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const refresh = debounce(() => {
    getTour(id).then(({ data }) => setTourRes(data))
  }, 300)

  useEffect(() => {
    refresh()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (name.trim() === '' || email.trim() === '' || date.trim() === '') {
      toast.error('Please fill all the fields!')
      setIsEmpty(true)
      return
    } else {
      const data = {
        tourId: id,
        name,
        email,
        date,
        budget,
      }

      createBooking(data)
        .then((res) => {
          if (res) {
            toast.success(res.message)
          } else {
            toast.error('Error while Booking!')
          }
        })
        .catch((err) => toast.error(err))

      setOpen(false)
      setName('')
      setEmail('')
      setDate('')
      setBudget('')
    }
  }

  return (
    <Layout>
      {tourRes && (
        <div className="container max-w-7xl py-4 md:py-10 px-2 md:px-20 lg:px-0 lg:mx-20 text-center md:text-left bg-white">
          <div className="py-2 md:py-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">TOUR NAME</h2>
            <h1 className="text-gray-900 text-2xl md:text-3xl title-font font-medium mb-1">
              {tourRes.tourName} <span className="hidden md:inline"> | </span>
              <span className="bg-primary opacity-80 block md:inline text-white text-sm  justify-center md:text-[1.8rem] mx-32 md:mx-0 md:px-2 py-1 md:py-1 rounded">
                {tourRes.duration} {tourRes.duration == 1 ? 'DAY' : 'DAYS'}
              </span>
            </h1>
          </div>
          <div className="w-full h-auto mt-5 md:mt-10 flex flex-wrap">
            <img alt="img" className="lg:w-[45%] shadow-md rounded-lg  w-full object-cover object-center  border border-gray-200" src={tourRes.imagePath} />
            <div className="lg:w-1/2 w-full px-2  md:pl-10 lg:pb-6 lg:pt-5  mt-6 lg:mt-0">
              <p className="leading-relaxed  ">{tourRes.description}</p>
              <div className="flex mt-6 items-center justify-center md:justify-start pb-5 border-b-2 border-gray-200 mb-5">
                <div className="flex mb-4">
                  <span className="flex items-center">
                    {starIcons}
                    <span className="text-gray-600 ml-3">{numRatings} Reviews</span>
                  </span>
                  <div className="flex  items-center ml-3 pl-3 py-2 border-l-2 border-gray-200  ">
                    <GlobeAltIcon className="h-5 w-5 text-primary" />
                    <a href={`https://www.google.com/search?q=${tourRes.tourName}`} target="_blank" className="ml-1 text-primary text">
                      Explore More!
                    </a>
                  </div>
                </div>
              </div>
              <div className="flex justify-center md:justify-start">
                <button onClick={handleClickOpen} className="flex  text-white bg-primary border-0 py-2 px-6 focus:outline-none hover:bg-secondary rounded">
                  Schedule Your Adventure Now!
                </button>
              </div>
            </div>
          </div>{' '}
          <br />
          {/* render reviews */}
          <Reviews id={id} onReviewsData={handleReviewsData} source="tour" />
        </div>
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle> Get a Quotation </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <DialogContentText>Submit to receive a custom quotation for your tour, including accommodations, transportation, and a full guide. Please note that prices may vary depending on current conditions in your selected destination.</DialogContentText>
            <TextField error={name === '' && isEmpty} onChange={(e) => setName(e.target.value)} value={name} autoFocus margin="dense" id="name" label="Name*" type="name" fullWidth variant="standard" className="ring-0 !important mui " />
            <TextField error={email === '' && isEmpty} onChange={(e) => setEmail(e.target.value)} value={email} autoFocus margin="dense" id="email" label="Email Address*" type="email" fullWidth variant="standard" className="ring-0 !important mui markdown" />
            <div className="mt-4">
              <label className={`${date === '' && isEmpty ? 'text-red-700' : 'text-gray-500'} text-sm `}>Planned Date*</label>
              <TextField error={date === '' && isEmpty} onChange={(e) => setDate(e.target.value)} value={date} autoFocus margin="dense" id="date" type="date" fullWidth variant="outlined" className="ring-0 !important mui" />
            </div>
            <TextField onChange={(e) => setBudget(e.target.value)} value={budget} autoFocus margin="dense" id="budget" label="Preferred Budget" type="number" fullWidth variant="standard" className="ring-0 !important mui" />
          </DialogContent>
          <DialogActions>
            <button type="button" className="capitalize text-red-600 mb-2 mr-4" onClick={handleClose}>
              CANCEL
            </button>
            <button className="capitalize px-4 mr-4 rounded-md mb-2 py-2 text-white bg-primary">SUBMIT</button>
          </DialogActions>
        </form>
      </Dialog>
    </Layout>
  )
}

export default Tour
