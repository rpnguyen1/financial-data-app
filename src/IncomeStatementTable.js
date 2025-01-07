import React from 'react';

function IncomeStatementTable({ data, onSort, sortConfig }) {
  const getClassNamesFor = (column) => {
    console.log("get class names for " + column + " sort config.direction is? " + sortConfig.direction);
    if (sortConfig.key === column) {
      return sortConfig.direction === 'asc' ? 'text-green-500' : 'text-red-500';
    }
    return '';
  };

  return (
    <div className="p-4">
  
      {/* Responsive Table */}
      <div className="overflow-x-auto mt-6">
        <table className="min-w-full table-auto border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th
                className="border px-4 py-2 cursor-pointer text-left text-sm md:text-base font-semibold"
                onClick={() => onSort('date')}
              >
                Date
                <span className={getClassNamesFor('date')}>▲▼</span>
                {/* <span className={`ml-2 text-gray-500 ${getClassNamesFor('date')}`}>
                  ▲▼
                </span> */}
              </th>
              <th
                className="border px-4 py-2 cursor-pointer text-left text-sm md:text-base font-semibold"
                onClick={() => onSort('revenue')}
              >
                Revenue
                <span className={getClassNamesFor('revenue')}>▲▼</span>
                {/* <span className={`ml-2 text-gray-500 ${getClassNamesFor('revenue')}`}>
                  ▲▼
                </span> */}
              </th>
              <th
                className="border px-4 py-2 cursor-pointer text-left text-sm md:text-base font-semibold"
                onClick={() => onSort('netIncome')}
              >
                Net Income
                <span className={getClassNamesFor('netIncome')}>▲▼</span>
                {/* <span className={`ml-2 text-gray-500 ${getClassNamesFor('netIncome')}`}>
                  ▲▼
                </span> */}
              </th>
              <th className="border px-4 py-2 text-left text-sm md:text-base font-semibold">
                Gross Profit
              </th>
              <th className="border px-4 py-2 text-left text-sm md:text-base font-semibold">
                EPS
              </th>
              <th className="border px-4 py-2 text-left text-sm md:text-base font-semibold">
                Operating Income
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr
                key={item.date}
                className="odd:bg-gray-50 even:bg-gray-100 hover:bg-blue-50 transition-colors"
              >
                <td className="border px-4 py-2 text-sm md:text-base">{item.date}</td>
                <td className="border px-4 py-2 text-sm md:text-base">{item.revenue}</td>
                <td className="border px-4 py-2 text-sm md:text-base">{item.netIncome}</td>
                <td className="border px-4 py-2 text-sm md:text-base">{item.grossProfit}</td>
                <td className="border px-4 py-2 text-sm md:text-base">{item.eps}</td>
                <td className="border px-4 py-2 text-sm md:text-base">{item.operatingIncome}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default IncomeStatementTable;
