
export async function getData(data, controller, timeOutId) {
  // fetching the data from the API and return the cardData as final result.
    let response = await fetch("https://travenger.herokuapp.com/", {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json'
        },
        signal: controller.signal,
        body: JSON.stringify(data)
    });
    clearTimeout(timeOutId);
    let cardData = await response.json();
    return cardData;

} 