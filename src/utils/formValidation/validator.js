
// eslint-disable-next-line no-useless-escape
const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const letterRegex = /^[a-zA-Z ]*$/;

export const validateUserForm = (user) => {
    const { firstName, lastName, email } = user;
    const allErrors = {};
    if (!firstName || firstName === "") allErrors.firstName = "Please enter the first name"
    else if (!firstName.match(letterRegex)) allErrors.firstName = "First name can not contain letter(s) or special character(s)"
    if (!lastName || lastName === "") allErrors.lastName = "Please enter the last name";
    else if (!lastName.match(letterRegex)) allErrors.lastName = "Last name can not contain letter(s) or special character(s)"
    if (!email || !email.toLowerCase().match(emailRegex)) allErrors.email = "Provide a valid email address";
    return allErrors;
}


export const validateEmailForm = (email) => {
    const { subject, body } = email;
    const allErrors = {};
    if (!subject || subject === "") allErrors.subject = "Subject is mandatory"
    if (!body || body === "") allErrors.body = "Body is mandatory"
    return allErrors;
}