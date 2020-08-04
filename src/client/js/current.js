export function isCurrent(data) {
    // help us to decide to use the current weather or forecast
    if(((data.arrive.getTime() - new Date().getTime()) / (1000*60*60*24)) <= 7){
        return true;
    }
    return false;
}