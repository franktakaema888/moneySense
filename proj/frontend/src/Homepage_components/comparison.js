import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../context/globalContext";
import axios from "axios";

const UserAnalysis = () => {
    const url = 'http://localhost:5002/api/api_country';
    const [SgData, setSgData] = useState([]);

    const { totalBalance } = useGlobalContext();

    const fetchInfo_sg = async () => {
        try {
            const response = await axios.get(`${url}?country=Singapore`);
            setSgData(response.data.prices);
        } catch (error) {
            console.error('Error:', error);
            if (error.response) {
                console.log('Response data:', error.response.data);
            }
        }
    };

    useEffect(() => {
        fetchInfo_sg();
    }, []);

    const getAveragePrice = async () => {
        if (SgData.length === 0) {
            return 0;
        }

        const sumOfPrices = SgData.reduce((sum, item) => sum + item.average_price, 0);
        const averagePrice = sumOfPrices / SgData.length;
        return averagePrice.toFixed(1);
    };

    return (
        <div className="my-2">
            {totalBalance() < getAveragePrice() ? (
                <p>Based on our Calculations, your balance is below the Average cost of living</p>
            ) : (
                <p>Based on our Calculations, your balance is above the Average cost of living</p>
            )}
        </div>
    );
};

export default UserAnalysis;
