/**
 * Emailing.mjs - Clava's Emailing Module
 *
 * @description
 * Server-side emailing module built using EmailJS
 * and used to provide email-related services to
 * Clava users and admins.
 *
 * @authors
 * Kris Leungwattanakij, ...
 *
 * @dependencies
 * emailjs, xhr2
 *
 * Created on : 02/25/2023
 */

/* Imports */
// import emailjs from '@emailjs/browser'

/* Global Variables */
// const PUBLIC_KEY = 'oTVFGSO5ppBTUbShJ'
// const SERVICE_ID = 'service_mvw9mrg'

/* Template IDs */

// const PASSWORD_RESET = 'template_zn08jxd'

/*
 * send_email(recipient, recipient_name, template_id)
 * recipient = email address of recipient
 * recipient_name = first name of recipient
 * template_id = template ID
 */
// function sendEmail(recipient, recipient_name, template_id) {
//   const templateParams = {
//     recipient,
//     recipient_name,
//   }
//   emailjs.send(SERVICE_ID, template_id, templateParams, PUBLIC_KEY).then(
//     function (response) {
//       console.log('SUCCESS!', response.status, response.text)
//     },
//     function (error) {
//       console.log('FAILED...', error)
//     }
//   )
// }

/*
 * send_email(recipient, recipient_name, link, template_id)
 * recipient = email address of recipient
 * recipient_name = first name of recipient
 * template_id = template ID
 * link = URL to be sent
 */
// function sendEmailWithLink(recipient, recipient_name, link, template_id) {
//   const templateParams = {
//     recipient,
//     recipient_name,
//     link,
//   }
//   emailjs.send(SERVICE_ID, template_id, templateParams, PUBLIC_KEY).then(
//     function (response) {
//       console.log('SUCCESS!', response.status, response.text)
//     },
//     function (error) {
//       console.log('FAILED...', error)
//     }
//   )
// }

/*
 * send_password_reset(recipient, recipient_name)
 * recipient = email address of recipient
 * recipient_name = first name of recipient
 * link = unique password reset link
 */
// function sendPasswordReset(recipient, recipient_name, link) {
//   sendEmail(recipient, recipient_name, link, PASSWORD_RESET)
// }
