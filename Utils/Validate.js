const RegNo = /1[4-8][A-Za-z]{3}\d\d\d\d$/
const Text = /^[ A-Za-z0-9_@."'/#&,/-]*$/
const Name = /^[ A-Za-z"'/#&,/-]*$/
const Email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const Mobile = /^[0-9]{10}$/

const checkRequiredFields = data => {
    if (
        data.hasOwnProperty('name') &&
        data.hasOwnProperty('email') &&
        data.hasOwnProperty('mobile') &&
        data.hasOwnProperty('external') &&
        data.hasOwnProperty('university') &&
        data.hasOwnProperty('regno') &&
        data.hasOwnProperty('block') &&
        data.hasOwnProperty('room') &&
        data.hasOwnProperty('acc') &&
        data.hasOwnProperty('city') &&
        data.hasOwnProperty('ieee_member') &&
        data.hasOwnProperty('ieee_id') &&
        data.hasOwnProperty('q1') &&
        data.hasOwnProperty('q2') &&
        data.hasOwnProperty('q3') &&
        data.hasOwnProperty('q4') &&
        data.hasOwnProperty('q5') &&
        data.hasOwnProperty('verified')
    )
    {
        if (Object.getOwnPropertyNames(data).length > 18) {
            return false
        }
        else {
            return true
        }
    }

    else {
        return false
    }
}

const Validate = (data) => {
    if (!checkRequiredFields(data)) {
        return {Status: "Failed", Message: "Missing or extra properties"}
    }

    else {

        if (data.verified){
            if (!data.external && !RegNo.test(data.regno)) {
                return {Status: "Failed", Message: "Error with Registration number"}
            }
    
            if (!Name.test(data.name)){
                return {Status: "Failed", Message: "Error with name"}
            }
    
            if (!Email.test(data.email)){
                return {Status: "Failed", Message: "Error with email"}
            }
            
            if (!Mobile.test(data.mobile)) {
                return {Status: "Failed", Message: "Error with mobile"}
            }
    
            if (!Text.test(data.q1) || !Text.test(data.q2) || !Text.test(data.q3) || !Text.test(data.q4) || !Text.test(data.q5)) {
                return {Status: "Failed", Message: "Error with the answers!"}
            }
    
            else {
                return {Status: "Success", Data: data}
            }
        }
        
        else{
            
            return {Status: "Failed", Message: "Captcha failed"}

        }
    }
}

module.exports = Validate;