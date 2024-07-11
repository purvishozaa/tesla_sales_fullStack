import React, { useState, useEffect } from "react";
import BatteryLayout from "../BatteryLayout/BatteryLayout";
import Megpack2XL from "../../assets/images/MegapackXL.jpeg";
import Megapack2 from "../../assets/images/Megapack2.jpg";
import Megapack from "../../assets/images/Megapack.jpeg";
import Powerpack from "../../assets/images/pp.jpg";
import Transformer from "../../assets/images/Transformer.jpg";
import "./BatteryCatalog.scss"; // SCSS for battery styling
import axios from "axios";
import { toast } from "react-toastify";
import  Dialog from "../Dialog/Dialog" ;


const BatteryCatalog = () => {
  const [batteries, setBatteries] = useState([]);
  const [configResult, setConfigResult] = useState(null);
  const [open, setOpen] = React.useState(false);

  
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/batteries")
      .then((response) => {
        const batteriesWithQuantity = response.data.map((battery) => ({
          ...battery,
          quantity: 0,
        }));
        setBatteries(batteriesWithQuantity);
      })
      .catch((error) => {
        console.error("Error fetching batteries:", error);
      });
  }, []);

  const handleQuantityChange = (e, index) => {
    const { value } = e.target;
    const updatedBatteries = [...batteries];
    updatedBatteries[index].quantity = Math.max(0, parseInt(value, 10) || 0); // Ensure value is a positive number
    setBatteries(updatedBatteries);
  };

  const handleConfigure = async () => {
    try {
      const response = await axios.put(
        "http://localhost:3001/api/configure-batteries",
        batteries,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setConfigResult(response.data);
        // Show success toast notification
        toast.success("Configuration successful!");

        // Handle further actions based on API response
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      // Handle error scenarios

      // Show error toast notification
      toast.error("Configuration failed. Please try again later.");
    }
  };
  const handleClickOpen = () => {
    handleConfigure();
    setOpen(true);
  };
  return (
    <>
      <div className="battery">
        {batteries.map((battery, index) => (
          <div key={index} className="battery-item">
            <img
              className="battery-image"
              src={getBatteryImage(battery.type)}
              alt={`Battery ${battery.type}`}
              disabled={battery.type === 5}
            />
            <div className="battery-details">
              <h3>{battery.name}</h3>
              <div>
                <label>Quantity:</label>
                <input
                  type="number"
                  id={`quantity-${index}`}
                  value={battery.count} // Ensure count is a string or number
                  onChange={(e) => handleQuantityChange(e, index)}
                  min="0"
                />{" "}
              </div>
              <div>
                <label>Dimension:</label>
                <span>{battery.dimension}</span>
              </div>
              <div>
                <label>Energy:</label>
                <span>{battery.energy} MWh</span>
              </div>
              <div>
                <label>Cost:</label>
                <span>${battery.cost}</span>
              </div>
              <div>
                <label>Release Date:</label>
                <span>{battery.releaseDate}</span>
              </div>
            </div>{" "}
          </div>
        ))}
      </div>
      <div className="btn-cont">
      <button onClick={handleClickOpen} className="configure-btn">Calculate Configuration Details</button>

      <BatteryLayout
        batteries={batteries.filter((battery) => battery.quantity > 0)}
      />
      </div>
      <Dialog isOpen={open} configResult = {configResult} handleClose={handleClose} />
      
    </>
  );
};

const getBatteryImage = (type) => {
  switch (type) {
    case "Megapack 2XL":
      return Megpack2XL;
    case "Megapack 2":
      return Megapack2;
    case "Megapack":
      return Megapack;
    case "Powerpack":
      return Powerpack;
    case "Transformer":
      return Transformer;
    default:
      return "";
  }
};

export default BatteryCatalog;
