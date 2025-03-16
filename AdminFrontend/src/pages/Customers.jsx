import React from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Selection,
  Inject,
  Edit,
  Toolbar,
  Sort,
  Filter,
} from "@syncfusion/ej2-react-grids";
import axios from 'axios';
import { customersData, customersGrid } from "../data/dummy";
import { Header } from "../components";
import { useEffect } from "react";
import { useState } from "react";

const Customers = () => {
  const [user, setUser] = useState([]);
  useEffect(() => {
    const getuser = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/getAllUser`);
        console.log(res.data);
        setUser(res.data.users);
      } catch (error) {
        console.error(error);
      }
    }

    getuser();
  }, [])

  const showdata = [
    { name: "username", headerText: "Customers", width: 120 },
    { name: "mobile_number", headerText: "Contact No", width: 120 },
    { name: "email", headerText: "Email", width: 200 }
  ]

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Customers" />
      <GridComponent
        dataSource={user}
        allowPaging
        allowSorting
        toolbar={["Delete"]}
        editSettings={{ allowDeleting: true, allowEditing: true }}
        width="auto"
      >
        <ColumnsDirective>
          <ColumnDirective type="checkbox" width="50" />
          {showdata.map((column, index) => (
            <ColumnDirective key={index}
              field={column.name}
              headerText={column.headerText}
              width={column.width}
              template={column.template}
              allowSorting />
          ))}
        </ColumnsDirective>
        <Inject services={[Page, Toolbar, Selection, Edit, Sort, Filter]} />
      </GridComponent>
    </div>
  );
};

export default Customers;
