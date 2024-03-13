//link to the api 

const axios = require('axios');

/**Numbeo Country Cost of Living Data*/
exports.api = async (req, res) => {
    
    // gettting the change of country from userHome.js front end
    const country = req.query.country
    //calling the api link with the private key from numbeo
    let apiUrl = 'http://www.numbeo.com:8008/api/country_prices?api_key=zlueew978sczoi&country=' + country;

    try {
        //get api data with axios
        const response = await axios.get(apiUrl);
        // returning api data as a json file
        return res.json(response.data);
        
    } catch (error) {
        //returns an error
        console.error(error);
    }
};

