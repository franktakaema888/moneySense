import { useState, useEffect } from "react";
import axios from "axios";

/** API Cost of Living Extension 
 * - Option to Select Different Countries
 * - List out the different Cost of Living Categories
 */
const Api = () => {
	const url = 'http://localhost:5002/api/api_country';
	const [data, setData] = useState([]);
	// set default useState to Singapore
	const [country, setCountry] = useState(['Singapore']);
	const [selectedCountry, setSelectedCountry] = useState(['Singapore']);
  
	const fetchInfo = async () => {
	  try {
		const response = await axios.get(`${url}?country=${selectedCountry}`);
		setData(response.data.prices);
		setCountry(response.data.name); // Set the country name from database
	  } catch (error) {
		console.error('Error:', error);
		if (error.response) {
			console.log('Response data:', error.response.data);
		}
	  }
	};
  
	useEffect(() => {
	  if (selectedCountry) {
		fetchInfo();
	  }
	}, [selectedCountry]);
  
	return (
		<div className="my-5 mx-10">
			<div className="grid grid-cols-3">
				<div className="col-start-2">
					<CountrySelector onSelect={setSelectedCountry}/>
				</div>
    			
			</div>
			<div className="my-2">
    			<h1 className="text-green-500 text-lg font-bold">Cost of Living in {country ? country : selectedCountry}</h1>
			</div>
			<div className="my-5">
				<div className="mb-40 border border-gray-300 max-h-80 overflow-y-scroll">
					<table className="min-w-full">
						<thead>
							<tr className="bg-gray-200">
								<th className="px-4 py-2">Item Name</th>
								<th className="px-4 py-2">Average Price</th>
							</tr>
						</thead>
						<tbody>
							{/* Condition using ternary operator to check if data is available */}
							{data ? (
								data.map((prices) => (
									<tr key={prices.item_id} className="border-b border-gray-300">
										<td className="px-4 py-2">{prices.item_name}</td>
										<td className="px-4 py-2">${prices.average_price.toFixed(2)}</td>
									</tr>
								))
							) : (
								<tr>
									<td className="px-4 py-2" colSpan="2">Country data not found...</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};
  
/** Generates a list of counties for the user to chose from 
 * - Component used in "Api"
 */
const CountrySelector = ({ onSelect }) => {
	const [selectedCountry, setSelectedCountry] = useState('');
	const [countries, setCountries] = useState([]); //new


	const fetchCountries = async () => {
		try {
			//gets the list of countries from https://restcountries.com 
			const response = await axios.get('https://restcountries.com/v3.1/all');
			const countryList = response.data.map(country => ({
				name: country.name.common,
				code: country.cca2
			}));
			//update the current state to show the list of countries
			setCountries(countryList);
		} catch (error) {
		  console.error(error);
		}
	};

	useEffect(() => {
		fetchCountries();
	}, []);
	
	const handleChange = (event) => {
		setSelectedCountry(event.target.value);
		onSelect(event.target.value);
	};

	return (
		<select 
		value={selectedCountry} 
		onChange={handleChange} 
		className="form-select block w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300">
			<option value="" className="text-center">Select a country</option>
			{countries.map((country, index) => (
				<option key={index} value={country.name}>
				{country.name}
				</option>
			))}
		</select>
	);
};
  
export default Api;