import React, { useEffect, useState } from "react";
// import DoctorCard from "./components/DoctorCard";
import { ApiHelper } from "trainApi";
import Table from "./components/Table";
import Filter from "./components/Filter";
import "Home.css";

// import { Loading } from "components";

function Home() {
  const [allTrain, setAllTrain] = useState([]);
  const [train, setTrain] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  function handleCheckbox(title, item) {
    if (title === "CarCount") {
      filterQuery[title] = item;
    } else if (filterQuery[title].includes(item.name)) {
      filterQuery[title] = filterQuery[title].filter(
        (query) => query !== item.name
      );
    } else {
      filterQuery[title].push(item.name);
    }
    setFilterQuery({ ...filterQuery });
  }
  const [filterQuery, setFilterQuery] = useState({
    LineCode: [],
    CarCount: null,
    ServiceType: [],
  });
  useEffect(() => {
    // if(!isLoading) {
    //   console.log('upadte')
    //   setIsLoading(true)
    //   ApiHelper("/TrainPositions",filterQuery).then((resposnse) => {
    //     if (resposnse) {
    //       setTrain(resposnse.TrainPositions);
    //       setIsLoading(false)
    //     }
    //   });
    // };
    let res = allTrain;
    for (const [key, value] of Object.entries(filterQuery)) {
      if (value && value.length) {
        res = res.filter((item) => value.includes(item[key]));
      }
      setTrain(res);
    }
  }, [filterQuery, allTrain]);

  const filterOptions = [
    {
      title: "LineCode",
      items: [
        { name: "RD" },
        { name: "BL" },
        { name: "YL" },
        { name: "OR" },
        { name: "GR" },
        { name: "SV" },
      ],
    },
    {
      title: "CarCount",
      items: [],
    },
    {
      title: "ServiceType",
      items: [
        { name: "NoPassengers" },
        { name: "Normal" },
        { name: "Special" },
        { name: "Unknown" },
      ],
    },
  ];
  useEffect(() => {
    ApiHelper("/TrainPositions").then((resposnse) => {
      if (resposnse) {
        setTrain(resposnse.TrainPositions);
        setAllTrain(resposnse.TrainPositions);
        setIsLoading(false);
      }
    });
  }, []);
  useEffect(() => {
    setInterval(async() =>{
      ApiHelper("/TrainPositions").then((resposnse) => {
        if (resposnse) {
          console.log('interval')
          setAllTrain(resposnse.TrainPositions);
        }
      })}, 10000);
  }, []);
  if (isLoading) return <>isLoading</>;
  return (
    <div className="wrapper">
      <Filter filterOptions={filterOptions} handleCheckbox={handleCheckbox} />
      <Table item={train} />
    </div>
  );
}

export default Home;
