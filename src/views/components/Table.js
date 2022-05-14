import React, { useCallback, useMemo } from "react";
import PropTypes from "prop-types";

function Table(props) {
  const { item } = props;
  
  let headers = item.length ? Object.keys(item[0]) : [];
  if(!item.length) return <>no data</>
  return (
    <>
      <table>
        <tbody>
          <tr>
            {headers.map((key,index) => {
              return (
                <>
                  <th key={index}>{key}</th>
                </>
              );
            })}
          </tr>
          {item.map((item, index) => (
            <tr key={index}>
              {Object.entries(item).map(([key, value]) => {
                return (
                  <>
                    <td className={key+value} key={index}>{value ? value : '-'}</td>
                  </>
                );
              })}
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
Table.propTypes = {
  item: PropTypes.array,
};
export default Table;
