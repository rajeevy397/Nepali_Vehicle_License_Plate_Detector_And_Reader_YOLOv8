import React, { useState, useEffect } from 'react';
import { useTable } from 'react-table';
import axios from 'axios';

function Extracted_text_table() {
  const [unicodeTexts, setUnicodeTexts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch data here or perform the necessary data-fetching logic
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/output/output_unicode.txt'); // Update with your correct API endpoint
        setUnicodeTexts(response.data.split('\n').filter(Boolean));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Run this effect only once on component mount

  const columns = React.useMemo(
    () => [
      {
        Header: 'S.N',
        accessor: (row, index) => index + 1,
      },
      {
        Header: 'License Plate Text',
        accessor: 'text',
      },
    ],
    []
  );

  const data = React.useMemo(() => unicodeTexts.map((text) => ({ text })), [unicodeTexts]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table
          {...getTableProps()}
          style={{
            width: '25%',
            borderCollapse: 'collapse',
            border: '2px solid #ddd', // Set border thickness for the whole table
          }}
        >
          <thead>
            {headerGroups.map((headerGroup, headerIndex) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={headerIndex}>
                {headerGroup.headers.map((column, colIndex) => (
                  <th
                    {...column.getHeaderProps()}
                    style={{
                      padding: '8px',
                      textAlign: 'center',
                      borderBottom: '2px solid #ddd', // Set border thickness for header
                      borderRight:
                        colIndex === headerGroup.headers.length - 1
                          ? 'none'
                          : '2px solid #ddd', // Set border thickness for header columns
                    }}
                    key={colIndex}
                  >
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, rowIndex) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  style={{
                    borderBottom: '2px solid #ddd', // Set border thickness for rows
                  }}
                  key={rowIndex}
                >
                  {row.cells.map((cell, colIndex) => (
                    <td
                      {...cell.getCellProps()}
                      style={{
                        padding: '8px',
                        textAlign: 'center',
                        borderRight:
                          colIndex === row.cells.length - 1
                            ? 'none'
                            : '2px solid #ddd', // Set border thickness for columns
                      }}
                      key={colIndex}
                    >
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Extracted_text_table;
