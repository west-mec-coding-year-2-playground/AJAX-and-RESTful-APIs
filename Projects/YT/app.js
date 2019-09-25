const useFetch = (url, selector) => {
    fetch(url)
        .then(response => response.json) //end
        /*
        process through the response
        1. log the data
        2. iterate through the data
        */
        .then(data => {
            console.log
        }) //end
}