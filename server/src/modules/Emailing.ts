/**
 * Emailing.ts - Clava's Emailing Module
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
import emailjs from '@emailjs/browser'

/* Global Variables */
const PUBLIC_KEY = 'oTVFGSO5ppBTUbShJ'
const SERVICE_ID = 'service_mvw9mrg'

/* Template IDs */
export const PASSWORD_RESET = 'template_zn08jxd'

/*
 * sendEmail(template_id, parameters)
 * template_id = ID of the email template we want to use
 * parameters = params we want to pass to the email tempate
 */
export function sendEmail(template_id, parameters) {
   emailjs.send(SERVICE_ID, template_id, parameters, PUBLIC_KEY).then(
     function (response) {
       console.log('SUCCESS!', response.status, response.text)
     },
     function (error) {
       console.log('FAILED...', error)
     }
   ) }

/*
 * sendResetRequestEmail(recipient, recipient_name, link)
 * recipient = email address of recipient
 * recipient_name = name of recipient
 * link = unique password reset link
 */
export function sendResetRequestEmail(recipient, recipient_name, link) {
    const parameters = {
        recipient: recipient,
        recipient_name: recipient_name,
        link: link
    }
    sendEmail(PASSWORD_RESET, parameters)
}