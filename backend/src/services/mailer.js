require('dotenv').config()
import nodemailer from 'nodemailer'
import handlebars from 'handlebars'
import fs from 'fs'

const transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD
  }
})

export const sendMail = async (email, templateName, replacements, subject, attachments = []) => {
  const html = fs.readFileSync(__basedir + `/html/${templateName}.html`, 'utf8')
  const template = handlebars.compile(html)
  const htmlToSend = template(replacements)
  const mailOptions = {
    from: process.env.MAIL_USER,
    to: email,
    subject: subject,
    html: htmlToSend,
    attachments
  }
  return new Promise((resolve, reject) => {
    transport.sendMail(mailOptions, (error) => {
      if (error) reject(error)
      resolve(true)
    })
  })
}
