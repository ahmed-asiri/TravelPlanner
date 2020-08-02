
export function validate(tripData) {

    let result = {
        approved: false,
        message: ""
    }
    // This function for validating the User Input data.
    if(!isEmpty(tripData.dest) && !isEmpty(tripData.depart.value) && !isEmpty(tripData.arrive.value)){
        if(dateDimension(tripData.depart.valueAsDate, tripData.arrive.valueAsDate)){
            result.approved = true;
            return result;
        }
        result.message = "Wrong date Dimensions, try again!!"
    } else {
        result.message = "There is missing input, please fill the form."
    } 

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
