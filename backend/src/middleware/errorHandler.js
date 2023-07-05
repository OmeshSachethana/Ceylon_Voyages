import { isCelebrateError } from 'celebrate'
import { consola } from 'consola'
import multer from 'multer'

export const errorHandler = (err, req, res, next) => {
  if (!res.errorLogged) {
    consola.error(`message : ${err.message}`)
    res.errorLogged = true
  }

  // Check if the error is a Celebrate error
  if (isCelebrateError(err)) {
    for (const [, value] of err.details.entries()) {
      return res.status(422).json({ message: value.details[0].message })
    }
  }

  // Check if the error is a Multer error
  if (err instanceof multer.MulterError) {
    return res.status(422).json({ message: err.message })
  }

  let message = err.message

  if (res.polyglot) message = res.polyglot.t(message)
  return res.status(err.status ?? 500).json({
    message
  })
}
