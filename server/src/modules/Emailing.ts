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
export const LINKED_EMAIL = 'template_zn08jxd'
export const PLAIN_EMAIL = 'template_1gt7t5f'

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
   )
}

/*
 * sendElectionResultEmail(recipients, message)
 * recipients = list of recipients in string form (e.g. "josh@gmail.com, ryan@gmail.com")
 * message = formatted string containing election results
 */
export function sendElectionResultEmail(recipients, message) {
  const parameters = {
    subject: "Election Results",
    body: message,
    recipient: recipients,
    recipient_name: "club members",
    sender: "Executive Team"
  }

  sendEmail(PLAIN_EMAIL, parameters)
}

/*
 * sendEventScheduleEmail(recipients, header, event_names, event_dates)
 * recipients = list of recipients in string form (e.g. "josh@gmail.com, ryan@gmail.com")
 * header = custom header to overwrite template header (optional)
 * event_names = list of event names
 * event_dates = list of event dates
 */
export function sendEventScheduleEmail(recipients, header, event_names, event_dates) {
  let header_to_use = "Event Schedule Update"
  if (header != undefined && header != "") {
    header_to_use = header
  }

  let body = "========== Event Schedule ==========\n\n"

  for (let i = 0; i < event_names.length; i++) {

    const dateComponent = event_dates[i].toString().split(" ")
    const dateString = dateComponent[0] + " " + dateComponent[1] + " " + dateComponent[2] + " " + dateComponent[3]

    body += event_names[i] + " ----- " + dateString + "\n"
  }

  const parameters = {
    subject: header_to_use,
    body: body,
    recipient: recipients,
    recipient_name: "club members",
    sender: "Executive Team"
  }

  sendEmail(PLAIN_EMAIL, parameters)
}

/*
 * sendResetRequestEmail(recipient, recipient_name, link)
 * recipient = email address of recipient
 * recipient_name = name of recipient
 * link = unique password reset link
 */
export function sendResetRequestEmail(recipient, recipient_name, link) {
    const parameters = {
        subject: "Reset password instructions",
        body: "Sorry to hear you're having trouble logging into your Clava account.",
        action: "reset your password.",
        recipient: recipient,
        recipient_name: recipient_name,
        link: link,
    }
    sendEmail(LINKED_EMAIL, parameters)
}

/*
 * sendResetConfirmationEmail(recipient, recipient_name, link)
 * recipient = email address of recipient
 * recipient_name = name of recipient
 */
export function sendResetConfirmationEmail(recipient, recipient_name) {
  const parameters = {
    subject: "Your password has been changed",
    body: "The password for your account linked to " + recipient + " has just been updated. If this was not done by you or someone you have authorized, please contact us immediately.",
    recipient: recipient,
    recipient_name: recipient_name,
    sender: "Clava Management Team"
  }
  sendEmail(PLAIN_EMAIL, parameters)
}

/*
 * sendOfficerInvitationEmail(recipient, recipient_name, link)
 * recipient = email address of recipient
 * recipient_name = name of recipient
 * link = unique invite link
 */
export function sendOfficerInvitationEmail(recipient, recipient_name, link) {
  const parameters = {
    subject: "You've been added to a Clava",
    body: "The president of a club has invited you to join their Clava.",
    action: "access the officer dashboard.",
    recipient: recipient,
    recipient_name: recipient_name,
    link: link
  }
  sendEmail(LINKED_EMAIL, parameters)
}