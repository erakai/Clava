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
const PASSWORD_RESET = "template_zn08jxd"

/*
 * send_email(recipient, recipient_name)
 * recipient = email address of recipient
 * recipient_name = first name of recipient
 */
function send_email(recipient, recipient_name) {
    var template_params = {
        recipient: recipient,
        recipient_name: recipient_name
    }
    emailjs.send(SERVICE_ID, PASSWORD_RESET, template_params, PUBLIC_KEY).then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
    }, function(error) {
        console.log('FAILED...', error);
    });
}

