
export async function getData(data) {
  // fetching the data from the API and return the cardData as final result.
    let response = await fetch("http://localhost:3000/", {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    let cardData = await response.json();

    return cardData;

} 