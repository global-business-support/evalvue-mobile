import regex from './Regex.js';

export function ValidateEmail(email) {
  var validateobj = {
    isValid: true,
    message: 'hello',
  };
  if (!regex.Emailregex.test(email)) {
    validateobj.isValid = false;
    validateobj.message = 'Invalid Email';
  }
  return validateobj;
}
export function ValidatePassword(password) {
  var validateobj = {
    isValid: true,
    message: 'hello',
  };

  if (!regex.Passwordregex.test(password)) {
    validateobj.isValid = false;
    validateobj.message =
      'Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character.';
  }
  return validateobj;
}
export function ValidateName(name) {
  var validateobj = {
    isValid: true,
    message: '',
  };
  if (!regex.Nameregex.test(name)) {
    validateobj.isValid = false;
    validateobj.message = 'Invalid Name';
  }
  return validateobj;
}
export function ValidateAddhar(addhar) {
  var validateobj = {
    isValid: true,
    message: '',
  };
  if (!regex.Addharregex.test(addhar)) {
    validateobj.isValid = false;
    validateobj.message = 'Invalid Aadhaar Number';
  }
  return validateobj;
}
