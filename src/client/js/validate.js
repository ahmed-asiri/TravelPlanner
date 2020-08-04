
export function validate(tripData) {

    let result = {
        approved: true,
        message: ""
    }
    // This function for validating the User Input data.
    if(!isEmpty(tripData.dest) && !isEmpty(tripData.depart) && !isEmpty(tripData.arrive)){
        if(dateDimension(tripData.depart, tripData.arrive)){
            if(!pastDay(tripData.depart))
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

export function isEmpty(value) {
    // if the value is Empty return true, otherwise false.  
    return value === "" || value === undefined || value === null ? true : false;
}

export function dateDimension(depart, arrive) {
    // if it's wrong date dimension return false, otherwise return true.  
    return depart < arrive ? true : false;
}


export function pastDay(depart) {
    // check if the depart date is before today date.
    return depart.getTime() <= new Date().setHours(0,0,0,0) ? true : false;
}