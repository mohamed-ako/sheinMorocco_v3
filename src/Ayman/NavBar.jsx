import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./style.css";
import MyList from "./MyList";

export default function Navbar({ cartLength }) {
  const [List, setList] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const location = useLocation();
  const handleSetActiveLink = (link) => {
    setActiveLink(link);
  };

  const currentPath = location.pathname;
  return (
    <nav className="navbarL">
      <div class="button-container">
        <Link
          to="/"
          className={currentPath === "/" ? "active-link" : "Link"}
          onClick={() => handleSetActiveLink("/")}
        >
          <svg
            class="icon"
            // stroke="currentColor"
            // fill="currentColor"
            stroke-width="0"
            viewBox="0 0 1024 1024"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M946.5 505L560.1 118.8l-25.9-25.9a31.5 31.5 0 0 0-44.4 0L77.5 505a63.9 63.9 0 0 0-18.8 46c.4 35.2 29.7 63.3 64.9 63.3h42.5V940h691.8V614.3h43.4c17.1 0 33.2-6.7 45.3-18.8a63.6 63.6 0 0 0 18.7-45.3c0-17-6.7-33.1-18.8-45.2zM568 868H456V664h112v204zm217.9-325.7V868H632V640c0-22.1-17.9-40-40-40H432c-22.1 0-40 17.9-40 40v228H238.1V542.3h-96l370-369.7 23.1 23.1L882 542.3h-96.1z"></path>
          </svg>
          <p>Home</p>
        </Link>

        <Link
          to="/create_design"
          className={currentPath === "/create_design" ? "active-link" : "Link"}
          onClick={() => handleSetActiveLink("/create_design")}
        >
          <svg
            width="25px"
            viewBox="0 0 24 24"
            height="1em"
            // fill="none"
            // fill="#ffffff"
            widths="1em"
            stroke-width="0.3"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C12.4142 1.25 12.75 1.58579 12.75 2C12.75 2.41421 12.4142 2.75 12 2.75C6.89137 2.75 2.75 6.89137 2.75 12C2.75 17.1086 6.89137 21.25 12 21.25C17.1086 21.25 21.25 17.1086 21.25 12C21.25 11.5858 21.5858 11.25 22 11.25C22.4142 11.25 22.75 11.5858 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12ZM16.7705 2.27591C18.1384 0.908028 20.3562 0.908028 21.7241 2.27591C23.092 3.6438 23.092 5.86158 21.7241 7.22947L15.076 13.8776C14.7047 14.2489 14.4721 14.4815 14.2126 14.684C13.9069 14.9224 13.5761 15.1268 13.2261 15.2936C12.929 15.4352 12.6169 15.5392 12.1188 15.7052L9.21426 16.6734C8.67801 16.8521 8.0868 16.7126 7.68711 16.3129C7.28742 15.9132 7.14785 15.322 7.3266 14.7857L8.29477 11.8812C8.46079 11.3831 8.56479 11.071 8.7064 10.7739C8.87319 10.4239 9.07761 10.0931 9.31605 9.78742C9.51849 9.52787 9.7511 9.29529 10.1224 8.924L16.7705 2.27591ZM20.6634 3.33657C19.8813 2.55448 18.6133 2.55448 17.8312 3.33657L17.4546 3.7132C17.4773 3.80906 17.509 3.92327 17.5532 4.05066C17.6965 4.46372 17.9677 5.00771 18.48 5.51999C18.9923 6.03227 19.5363 6.30346 19.9493 6.44677C20.0767 6.49097 20.1909 6.52273 20.2868 6.54543L20.6634 6.16881C21.4455 5.38671 21.4455 4.11867 20.6634 3.33657ZM19.1051 7.72709C18.5892 7.50519 17.9882 7.14946 17.4193 6.58065C16.8505 6.01185 16.4948 5.41082 16.2729 4.89486L11.2175 9.95026C10.801 10.3668 10.6376 10.532 10.4988 10.7099C10.3274 10.9297 10.1804 11.1676 10.0605 11.4192C9.96337 11.623 9.88868 11.8429 9.7024 12.4017L9.27051 13.6974L10.3026 14.7295L11.5983 14.2976C12.1571 14.1113 12.377 14.0366 12.5808 13.9395C12.8324 13.8196 13.0703 13.6726 13.2901 13.5012C13.468 13.3624 13.6332 13.199 14.0497 12.7825L19.1051 7.72709Z"
                // fill="#ffffff"
              ></path>{" "}
            </g>
          </svg>
          <p>Design</p>
        </Link>
        <Link
          to="/Contact"
          className={
            currentPath === "/Contact" ? "msg active-link" : "Link msg"
          }
          onClick={() => handleSetActiveLink("/Contact")}
        >
          <svg
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            // fill="#000000"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <defs></defs>{" "}
              <g id="ic-contact-message">
                {" "}
                <path
                  style={{
                    fill: "none",
                    // stroke: "#ffffff",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: "1.5px",
                  }}
                  class="cls-1"
                  d="M19.89,3.25H4.11a2,2,0,0,0-2,2v9.06a2,2,0,0,0,2,2H5.75l2.31,4a.85.85,0,0,0,1.48,0l2.32-4h8a2,2,0,0,0,2-2V5.25A2,2,0,0,0,19.89,3.25Z"
                ></path>{" "}
                <line
                  class="cls-1"
                  x1="5.01"
                  y1="7.86"
                  x2="11.01"
                  y2="7.86"
                ></line>{" "}
                <line
                  class="cls-1"
                  x1="5.01"
                  y1="11.86"
                  x2="18.01"
                  y2="11.86"
                ></line>{" "}
              </g>{" "}
            </g>
          </svg>

          <p>Contact</p>
        </Link>

        <Link
          to="/AddProductForm"
          className={currentPath === "/AddProductForm" ? "active-link" : "Link"}
          onClick={() => handleSetActiveLink("/AddProductForm")}
        >
          <svg
            class="icon"
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 24 24"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 2.5a5.5 5.5 0 0 1 3.096 10.047 9.005 9.005 0 0 1 5.9 8.181.75.75 0 1 1-1.499.044 7.5 7.5 0 0 0-14.993 0 .75.75 0 0 1-1.5-.045 9.005 9.005 0 0 1 5.9-8.18A5.5 5.5 0 0 1 12 2.5ZM8 8a4 4 0 1 0 8 0 4 4 0 0 0-8 0Z"></path>
          </svg>
          <p>Login</p>
        </Link>

        <Link
          to="./MyList"
          className={
            currentPath === "/MyList" ? "active-link cart" : "cart Link"
          }
          onClick={() => handleSetActiveLink("/MyList")}
        >
          <svg
            class="icon"
            // stroke="currentColor"
            // fill="none"
            // stroke-width="2"
            viewBox="0 0 24 24"
            stroke-linecap="round"
            stroke-linejoin="round"
            height="1em"
            width="1em"
            className="cartsvg"
            stroke-width="1.7"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          {cartLength > 0 && <h3>{cartLength}</h3>}
        </Link>
        {List && (
          <span>
            <button onClick={() => setList(false)}>X</button>
            <MyList />
          </span>
        )}
      </div>
    </nav>
  );
}
