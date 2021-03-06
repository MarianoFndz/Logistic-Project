function registerTemplate ({ firstName, lastName, verificationCode }) {
  return `
        <html>
        <head></head>
        <body>
            <h3>¡Hola ${firstName}, ${lastName}. Gracias por registrarte!</h3>
            <a href=${process.env.DEV_URL}/auth/verificationCode/${verificationCode}>Click acá para confirmar la cuenta </a>
        </body>
        </html>
    `
}

module.exports = registerTemplate
