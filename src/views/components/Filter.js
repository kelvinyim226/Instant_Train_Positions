import React from "react";
import PropTypes from "prop-types";
import "./css/Filter.css";
function Filter(props) {
  const { filterOptions,handleCheckbox } = props;
  return (
    <div className="fliter-container">
      <div>Filter:</div>
      {filterOptions.map((filters, index) => {
        return (
          <div key={index}>
            <div style={{paddingTop:'12px'}}>{filters.title}</div>
            {filters.title === "CarCount" && (<input type="number" onChange={(e) => handleCheckbox(filters.title,e.target.value)}/>)}
            {filters.items.map((item, index) => {
                return (
                    <div className="row" style={{padding:'12px'}} key={index}>
                    <input type="checkbox"  onChange={() => handleCheckbox(filters.title,item)}></input>
                    <div style={{paddingLeft:'12px'}}>{item.name}</div>
                    </div>
                )
            })}
          </div>
        );
      })}
    </div>
  );
}
Filter.propTypes = {
    filterOptions: PropTypes.array,
    handleCheckbox: PropTypes.func,
};
export default Filter;
