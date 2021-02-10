import sgMail from '@sendgrid/mail'

const sendgridAPIKey = process.env.SENDGRID_API_KEY

sgMail.setApiKey(sendgridAPIKey)

const  sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'ctcoleman510@gmail.com',
    subject: `Welcome to my node task app ${name}`,
    text: `${name}, Thanks so much for joining the Node Task App. I hope you enjoy using this API...`
  })
}

const sendCancelEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'ctcoleman510@gmail.com',
    subject: 'I\'m sorry to see you go...',
    text: `Hey there ${name}. I see you removed your profile from the Task App. I\'m sorry to see you go. Please let me know if there was anything I could have done better. Thanks, Christopher...`
  })
}

export { sendWelcomeEmail, sendCancelEmail }