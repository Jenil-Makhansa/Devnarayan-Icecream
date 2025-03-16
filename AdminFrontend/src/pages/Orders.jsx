import React, { useEffect, useState } from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Sort,
  Page,
  Inject,
  Search,
  Toolbar,
} from "@syncfusion/ej2-react-grids";
import { Header } from "../components";
import OrderDetails from './OrderDetails'
import axios from "axios";
import OrderStatusDropdown from "./OrderStatusDropdown";

const Orders = () => {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState("");
  const [oLoading, setOLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    const getOrders = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${process.env.BASE_URL}/order/getAllOrders`);
        setOrders(res.data.orders);
        console.log(res.data.orders);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    getOrders();
  }, [])


  const handleClick = (props) => {
    setSelectedOrder(props);
    setIsModalOpen(true);
  }

  // const changeTheStatus = async ({num, id}) => {
  //   console.log(num , "  " ,id);
  //   let URL;
  //   if (num === 2) {
  //     URL = `${process.env.BASE_URL}/order/outForDelivery/${id}`;
  //   } else if (num === 3) {
  //     URL = `${process.env.BASE_URL}/order/${id}`;
  //   }

  //   try {
  //     const res = await axios.put(URL);
  //     console.log(res);
  //   }
  //   catch (err) {
  //     console.log(err);
  //   }
  // }

  const handleStatusChange = async (id, newStatus) => {

    // Make API request to update the order status
    let URL;
    if (newStatus === "outForDelivery") {
      URL = `${process.env.BASE_URL}/order/outForDelivery/${id}`;
    } else if (newStatus === "delivered") {
      URL = `${process.env.BASE_URL}/order/${id}`;
    }

    try {
      setOLoading(true);
      const res = await axios.put(URL);
      const isdel = res.data.order.orderDelivered;
      const isOut = res.data.order.outForDelivery;
      setOrders((prevOrders) => {
        console.log(prevOrders);
        return (

          prevOrders.map((order) => {
            console.log(order);
            return order._doc._id === id ? { ...order, _doc: { ...order._doc, orderDelivered: isdel, outForDelivery: isOut } } : order
          }
          ))
      }
      )
      return (res);
    }
    catch (err) {
      console.log(err);
    }finally{
      setOLoading(false);
    }
  };

  const statusSortComparer = (a, b, column) => {
    const statusA = a._doc.status;
    const statusB = b._doc.status;

    // Compare statuses based on a predefined order
    const statusOrder = ["pending", "outForDelivery", "delivered"];
    const indexA = statusOrder.indexOf(statusA);
    const indexB = statusOrder.indexOf(statusB);

    return indexA - indexB;
  };

  const columnsToShow = [
    { name: "userData.username", headerText: "Ordered By", width: 120 },
    {
      headerText: "Total Items",
      template: (props) => props._doc.items.length, // Access the length of the items array inside the _doc object
      width: 100,
    },
    { name: "_doc.total", headerText: "Total Price", width: 100 },
    { name: "_doc.hostel", headerText: "Location", width: 100 },
    {
      name: "_doc.createdAt", // New column for displaying the formatted createdAt date
      headerText: "Ordered At",
      template: (props) => {
        const createdAt = props._doc.createdAt; // Assuming createdAt is a string like "2023-10-01T04:57:51.470Z"
        const date = new Date(createdAt);

        const formattedDate = `${date.toLocaleDateString('en-US', { year: '2-digit', month: '2-digit', day: '2-digit' })} ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;

        return <div>{formattedDate}</div>;
      },
      width: 130, // Adjust the width as needed
    },
    {
      name: "_doc.status",
      headerText: "Status",
      template: (props) => {
        const isDel = props._doc.orderDelivered;
        const isOut = props._doc.outForDelivery;
        let initialStatus = "pending"; // Default to "Order Placed" if neither isDel nor isOut is true
        if (isDel === true) {
          initialStatus = "delivered";
        } else if (isOut === true) {
          initialStatus = "outForDelivery";
        }
        return (
          <OrderStatusDropdown
            selectedStatus={initialStatus}
            onChange={(e) =>
              handleStatusChange(props._doc._id, e.target.value)
            }
          />
        );
      },
      width: 120,
      allowSorting: true,
      sortComparer: statusSortComparer,
    },
    {
      headerText: "",
      template: (props) => (
        <button
          className="e-btn e-flat e-primary"
          onClick={() => handleClick(props)} // Pass the selected order to handleClick
        >
          See More
        </button>
      ),
      width: 100,
    },
  ];


  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Orders" />
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
              dataSource={orders}
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
                    allowSorting
                  />
                ))}
              </ColumnsDirective>
              <Inject services={[Page, Search, Toolbar, Sort]} />
            </GridComponent>
        </>
      )}
      {selectedOrder && ( // Render OrderDetails if selectedOrder is not null
        <OrderDetails
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          // onStatsChange={(num) => changeTheStatus(num)}
          onConfirm={() => {
            console.log("Order is confirmed");
            setIsModalOpen(false);
          }}
          order={selectedOrder} // Pass the selected order as a prop
        />
      )}
    </div>
  );
};

export default Orders;
