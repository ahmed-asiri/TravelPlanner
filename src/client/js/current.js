export function isCurrent(depart) {
    // help us to decide to use the current weather or forecast

    
//    if(((depart.getTime() - new Date().getTime()) / (1000*60*60*24)) <= 7){
//        return "true";
//    }

    if(new Date().getDate() - depart.getDate() < 7 &&  new Date().getMonth() === depart.getMonth() && new Date().getFullYear() === depart.getFullYear())
        return true;
    
    return false;
}