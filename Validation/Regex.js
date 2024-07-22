const Emailregex=/^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
const Nameregex=/(?=.{3,25}$)[a-zA-Z]+(?:\s[a-zA-Z]+)?(?:\s[a-zA-Z]+)?$/;
const Passwordregex=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
const Addharregex=/^\d{12}$/;
const regex={
    Emailregex:Emailregex,
    Nameregex:Nameregex,
    Passwordregex:Passwordregex,
    Addharregex:Addharregex
};
export default regex;