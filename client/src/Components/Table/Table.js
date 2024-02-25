import React from 'react';
import './Table.css'

const JsonTable = ({ jsonData }) => {
  if (!jsonData || Object.keys(jsonData).length === 0) return null;

  let serialNumber = 0;

  return (
    <div className="json-table">
      <table>
        <thead>
          <tr>
            <th>S.N.</th>
            <th>Number Plate Text</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(jsonData).map((key) => {
            const { image_name, NumberPlateText } = jsonData[key];
            if (image_name === 'output_image.jpg') {
              return null; // Exclude data with image_name as 'output_image.jpg'
            }
            serialNumber++;
            return (
              <tr key={key}>
                <td>{serialNumber}</td>
                <td>{NumberPlateText}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default JsonTable;
