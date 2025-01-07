import React, { useState, useEffect } from 'react';
import axios from 'axios';
import IncomeStatementTable from './IncomeStatementTable';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for filtering
  const [dateRange, setDateRange] = useState([2020, 2024]); // Default: 2020-2024
  const [revenueRange, setRevenueRange] = useState([0, 10000000000000]); // Default: Revenue range
  const [netIncomeRange, setNetIncomeRange] = useState([0, 10000000000000]); // Default: Net Income range

  // State for sorting
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'asc' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual&apikey=${process.env.REACT_APP_API_KEY}`
        );
        setData(response.data); // Update the state with the fetched data
        console.log(response.data);
        setLoading(false); // Stop loading
      } catch (error) {
        setError(error.message); // Handle any errors
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Apply filtering to the data
  const filteredData = data.filter(item => {
    const date = new Date(item.date);
    const year = date.getFullYear();
    // console.log("new date " + date + " and year is " + year);
    return (
      year >= dateRange[0] && year <= dateRange[1] &&
      item.revenue >= revenueRange[0] && item.revenue <= revenueRange[1] &&
      item.netIncome >= netIncomeRange[0] && item.netIncome <= netIncomeRange[1]
    );
  });

  // Apply sorting to the filtered data
  const sortedData = filteredData.sort((a, b) => {
    const isAsc = sortConfig.direction === 'asc';
    if (sortConfig.key === 'date') {
      return isAsc ? new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date);
    }
    if (sortConfig.key === 'revenue') {
      return isAsc ? a.revenue - b.revenue : b.revenue - a.revenue;
    }
    if (sortConfig.key === 'netIncome') {
      return isAsc ? a.netIncome - b.netIncome : b.netIncome - a.netIncome;
    }
    return 0;
  });

  // Handle sorting
  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  return (
    <div className="overflow-x-hidden mt-6 px-4 sm:px-6 lg:px-12">
      {/* Header Section */}
      <div className="w-full p-4 md:p-8 lg:p-12 text-left">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-600">
          Financial Data Filtering App
        </h1>
        <p className="mt-2 text-base md:text-lg lg:text-xl text-gray-700">
          Filter by changing the range values and click on column names to sort data.
        </p>
        <hr className="my-4 border-gray-300" />
      </div>

      {/* Input Ranges Section */}
      <div className="space-y-3">
        {[
          { label: "Date Range", range: dateRange, setRange: setDateRange },
          { label: "Revenue Range", range: revenueRange, setRange: setRevenueRange },
          { label: "Net Income Range", range: netIncomeRange, setRange: setNetIncomeRange },
        ].map(({ label, range, setRange }) => (
          <div
            key={label}
            className="flex flex-wrap items-center justify-center md:justify-between space-y-2 md:space-y-0 md:mr-4"
          >
            <label className="px-4 m-2 w-full md:w-auto text-sm font-medium md:mr-4 text-center md:text-left">{label}:</label>
            <div className="flex w-full md:w-auto space-x-2 justify-center  text-center md:text-left">
              <input
                type="number"
                value={range[0]}
                onChange={(e) => setRange([parseInt(e.target.value), range[1]])}
                className="w-full md:w-1/3 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Min"
              />
              <span className="text-gray-500">-</span>
              <input
                type="number"
                value={range[1]}
                onChange={(e) => setRange([range[0], parseInt(e.target.value)])}
                className="w-full md:w-1/3 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Max"
              />
            </div>
          </div>
        ))}
      </div>
  
      {/* Data Table or Loading/Error Message */}
      <div>
        {loading ? (
          <p className="text-gray-500 text-center">Loading data...</p>
        ) : error ? (
          <p className="text-red-500 text-center">Error: {error}</p>
        ) : (
          <IncomeStatementTable
            data={sortedData}
            onSort={handleSort}
            sortConfig={sortConfig}
          />
        )}
      </div>
    </div>
  );
  
}

export default App;
