'use strict'
const nodemailer = require('nodemailer')

const sendMail = async ({
  to = process.env.USER_MAIL,
  subject = 'Nuevo contacto WEB',
  html
}) => {
  try {
    console.log(to, subject)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      secure: false,
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASSWORD
      },
      tls: {
        rejectUnauthorized: false
      }
    })

    console.log(process.env.USER_EMAIL, process.env.USER_PASSWORD)

    const { messageId } = await transporter.sendMail({
      from: '"👻" <no-remplay@correo.com>',
      to,
      subject,
      html
    })

    return messageId
  } catch (err) {
    console.error(err)
  }
}

module.exports = sendMail
