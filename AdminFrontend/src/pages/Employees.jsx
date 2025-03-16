import React, { useEffect, useState } from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Sort,
  Search,
  Inject,
  Toolbar,
} from "@syncfusion/ej2-react-grids";
import { Header } from "../components";
import axios from "axios";
const Employees = () => {

  const [loading, setLoading] = useState(false);
  const [oLoading, setOLoading] = useState(false);
  const [data, setData] = useState([]);
  // const navigate = useNavigate()
  useEffect(() => {
    const getItems = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/icecream/allice`)
        setData(res.data)
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    getItems();
  }, [])

  const handleDelete = async (prop) => {
    // console.log(prop , "Icream ID");
    const flag = data.filter((item) => item._id !== prop);
    setData(flag);
    try {
      setOLoading(true);
      const res = await axios.delete(`${process.env.REACT_APP_BASE_URL}/icecream/dice/${prop}`)
      console.log(res);
      return res;
    } catch (err) {
      console.error(err);
    } finally {
      setOLoading(false);
    }
  }

  const columnsToShow = [
    { name: "_id", headerText: "ID", width: 120 },
    { name: "name", headerText: "Name", width: 100 },
    { name: "price", headerText: "Price", width: 100 },
    { name: "type", headerText: "Type", width: 100 },
    {
      // Image column
      name: "image",
      headerText: "Image",
      template: "<img src='${image}' alt='Employee' width='70px' height='70px' />",
      width: 130,
    },
    {
      // Button column
      headerText: "",
      template:
        "<button class='e-btn e-flat e-primary' onClick='onButtonClick(${EmployeeID})'>Edit</button>",
      width: 100,
    },
    {
      // Button column
      headerText: "",
      template: (props) => (
        <button
          className="e-btn e-flat e-primary"
          onClick={() => handleDelete(props._id)}
        >
          Delete
        </button>
      ),
      width: 100,
    },
  ];

  return (
    <div className="m-2 mt-24 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Employees" />
      {loading ? (
        // Show a loading indicator while data is being fetched
        <div>Loading...</div>
      ) : (
        <>
          {oLoading && (
            // Loading overlay
            <div className="loading-overlay">
              <div className="spinner"></div>
            </div>
          )}
          <GridComponent
            dataSource={data}
            allowPaging
            allowSorting
            toolbar={["Search"]}
            width="auto"
          >
            <ColumnsDirective>
              {columnsToShow.map((column, index) => (
                <ColumnDirective
                  key={index}
                  field={column.name}
                  headerText={column.headerText}
                  width={column.width}
                  template={column.template}
                />
              ))}
            </ColumnsDirective>
            <Inject services={[Page, Search, Toolbar, Sort]} />
          </GridComponent>
        </>
      )}
    </div>
  );
};

export default Employees;
