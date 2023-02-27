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
import emailjs from '@emailjs/browser'

/* Global Variables */
const PUBLIC_KEY = "oTVFGSO5ppBTUbShJ"
const SERVICE_ID = "service_mvw9mrg"

/* Template IDs */
const PASSWORD_RESET = "template_zn08jxd"

/*
 * send_email(recipient, recipient_name)
 * recipient = email address of recipient
 * recipient_name = first name of recipient
 * template_id = template ID
 */
function send_email(recipient, recipient_name, template_id) {
    var template_params = {
        recipient: recipient,
        recipient_name: recipient_name
    }
    emailjs.send(SERVICE_ID, template_id, template_params, PUBLIC_KEY).then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
    }, function(error) {
        console.log('FAILED...', error);
    });
}

/*
 * send_password_reset(recipient, recipient_name)
 * recipient = email address of recipient
 * recipient_name = first name of recipient
 */
function send_password_reset(recipient, recipient_name) {
    send_email(recipient, recipient_name, PASSWORD_RESET)
}
