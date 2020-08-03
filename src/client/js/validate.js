
export function validate(tripData) {

    let result = {
        approved: true,
        message: ""
    }
    // This function for validating the User Input data.
    if(!isEmpty(tripData.dest) && !isEmpty(tripData.depart.value) && !isEmpty(tripData.arrive.value)){
        if(dateDimension(tripData.depart.valueAsDate, tripData.arrive.valueAsDate)){
            if(!pastDay(tripData.depart.valueAsDate))
                return result;
            else 
                result.message = "Departing Date, cannot be before today date";
        }else
            result.message = "Wrong date Dimensions, try again!!"
    } else 
        result.message = "There is missing input, please fill the form."
    
    result.approved = false;
    return result;
}

function isEmpty(value) {
    // if the value is Empty return true, otherwise false.  
    return value === "" ? true : false;
}

function dateDimension(depart, arrive) {
    // if it's wrong date dimension return false, otherwise return true.  
    return depart < arrive ? true : false;
}

function pastDay(depart) {
    // check if the depart date is before today date.
    return depart.getTime() <= new Date().setHours(0,0,0,0) ? true : false;
}