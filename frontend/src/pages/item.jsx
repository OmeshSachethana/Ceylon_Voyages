import { debounce } from 'lodash'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../components/layout'
import { GlobeAltIcon } from '@heroicons/react/20/solid'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { getItem } from '../services/items'

import Reviews from './reviews'

//mui
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

const Item = () => {
  const id = useParams().id
  const starIcons = []
  const [itemRes, setItemRes] = useState(null)
  const [open, setOpen] = useState(false)
  const [numRatings, setNumRatings] = useState(0);
  const [averageRating, setAverageRating] = useState(0);

  const handleReviewsData  = (numRatingsFromChild, averageRatingFromChild) => {
    setNumRatings(numRatingsFromChild);
    setAverageRating(averageRatingFromChild);
  };


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

  const handleClickOpen = () => {
    const searchQuery = itemRes && itemRes.itemName ? encodeURIComponent(itemRes.itemName) : '';
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${searchQuery}`;
    window.open(googleMapsUrl, '_blank');
  };

  const handleClose = () => {
    setOpen(false)
  }

  const refresh = debounce(() => {
    getItem(id).then(({ data }) => setItemRes(data))
  }, 300)

  useEffect(() => {
    refresh()
  }, [])

  return (
    <Layout>
      {itemRes && (
        <div className="container max-w-7xl py-10 mx-20">
          <h2 className="text-sm title-font text-gray-500 tracking-widest">RESTAURANT | PRODUCT NAME</h2>
          <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{itemRes.itemName}</h1>
          <div className="w-full h-auto mt-10 flex flex-wrap">
            <img alt="ecommerce" className="lg:w-[45%] shadow-md rounded-lg  w-full object-cover object-center  border border-gray-200" src={itemRes.imagePath} />
            <div className="lg:w-1/2 w-full  pl-10 lg:pb-6 lg:pt-5  mt-6 lg:mt-0">
              <p className="leading-relaxed">{itemRes.description}</p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
                <div className="flex mb-4">
                  <span className="flex items-center">
                    {starIcons}
                    <span className="text-gray-600 ml-3">{numRatings} Reviews</span>
                  </span>
                </div>
              </div>
              <div className="flex items-center pl-3 py-2">
                <FaMapMarkerAlt className="h-5 w-5 text-primary mr-3" />
                {itemRes.location}
              </div>
              <div className="flex mt-3">
                <button onClick={handleClickOpen} className="flex  text-white bg-primary border-0 py-2 px-6 focus:outline-none hover:bg-secondary rounded">
                  Explore in Google Maps!
                </button>
              </div>
            </div>
          </div>{' '}
          <br />
          {/* render reviews */}
          <Reviews id={id} onReviewsData={handleReviewsData} source="item" />
        </div>
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle> Get a Quotation </DialogTitle>
        <DialogContent>
          <DialogContentText>Submit to receive a custom quotation for your tour, including accommodations, transportation, and a full guide. Please note that prices may vary depending on current conditions in your selected destination.</DialogContentText>
          <TextField autoFocus margin="dense" id="name" label="Name" type="name" fullWidth variant="standard" />
          <TextField autoFocus margin="dense" id="email" label="Email Address" type="email" fullWidth variant="standard" />
          <TextField autoFocus margin="dense" id="budget" label="Prefferd Budget" type="number" fullWidth variant="standard" />
        </DialogContent>
        <DialogActions>
          <button className="capitalize text-red-600 mb-2 mr-4" onClick={handleClose}>
            CANCEL
          </button>
          <button className="capitalize px-4 mr-4 rounded-md mb-2 py-2 text-white  bg-primary " onClick={handleClose}>
            SUBMIT
          </button>
        </DialogActions>
      </Dialog>
    </Layout>
  )
}

export default Item
