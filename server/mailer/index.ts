import nodemailer from 'nodemailer'
import { fileURLToPath } from 'url'
import path from 'path'

const prodConfig = {
  host: process.env.MAILER_HOST,
  port: Number(process.env.MAILER_PORT),
  secure: true,
  auth: {
    user: process.env.MAILER_USER,
    pass: process.env.MAILER_PASS,
  },
}

const devConfig = {
  host: process.env.MAILER_HOST,
  port: Number(process.env.MAILER_PORT),
}

const transporter = nodemailer.createTransport(import.meta.dev ? devConfig : prodConfig)

// const tempaltesPath = path.resolve(fileURLToPath(import.meta.url), './templates')

// const vueEmail = config(tempaltesPath)

export { transporter }
