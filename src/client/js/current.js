export function isCurrent(depart) {
    // help us to decide to use the current weather or forecast
    if(new Date().getDate() - depart.getDate() < 7 &&  new Date().getMonth() === depart.getMonth() && new Date().getFullYear() === depart.getFullYear())
        return true;
    
    return false;
}