require('dotenv').config()
import express from 'express'
import compression from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import { consola } from 'consola'
import { limiter, responseInterceptor, errorHandler } from './middleware'
import toursRouter from './routes/tours.routes'
import reviewsRouter from './routes/reviews.routes'
// import usersRouter from './routes/users.routes'
import itemsRouter from './routes/items.routes'
import tourBookings from './routes/tourBooking.routes'
import postRoutes from './routes/posts.js'
import connectDB from './database'
import path from 'path'


const port = process.env.PORT || 2000


// Set up express app
const app = express();

// Middleware
app.use(cors());
//app.use(bodyParser.json());

app.use(limiter)

app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }))

app.use(compression())

app.use(cors({ origin: true, credentials: true }))

app.use(express.json({ limit: '100mb' }))

app.use(express.urlencoded({ extended: true }))


connectDB()

global.__basedir = __dirname

//routes


app.use(responseInterceptor)

app.use(errorHandler)
// Set up API routes

app.get('/', (req, res) => res.status(200).json({ message: 'Server Up and Running' }))

app.use('/api/items', itemsRouter)

app.use('/item/image', express.static(path.join(__dirname, '..', 'upload', 'images')))

app.use('/api/reviews', reviewsRouter)

app.use('/tour/image', express.static(path.join(__dirname, '..', 'upload', 'images')))

app.use('/api/tours', toursRouter)

app.use('/api/bookings', tourBookings)

app.use('/api/', express.static(path.join(__dirname, 'public')))

app.use('/', require('./routes/root'))

app.use('/api/auth', require('./routes/authRoutes'))

app.use('/api/users', require('./routes/userRoutes'))

app.use('/api/notifications', require('./routes/notificationRoutes'))

app.use('/api/posts', postRoutes)

app.all('*', (req, res) => {
  res.status(404)
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'))
  } else if (req.accepts('json')) {
    res.json({ message: '404 Not Found' })
  } else {
    res.type('txt').send('404 Not Found')
  }
})



app.listen(port, () => console.log(`Listening on port ${port}...`));
