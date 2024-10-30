import React, { useState } from "react";
import "./SideMenu.css";
import { IoGameController, IoLibrary } from "react-icons/io5";
import { TbTournament } from "react-icons/tb";
import { IoIosPeople } from "react-icons/io";
import { GoDotFill } from "react-icons/go";

function SideMenu({ sectionActive }) {
  const [navData, setNavData] = useState([
    {
      id: 1,
      name: "Play",
      icon: <IoGameController />,
      target: "play",
      active: true,
    },
    {
      id: 2,
      name: "Library",
      icon: <IoLibrary />,
      target: "library",
      active: false,
    },

    {
      id: 4,
      name: "Tournament",
      icon: <TbTournament />,
      target: "tournament",
      active: false,
    },
    {
      id: 5,
      name: "Forum",
      icon: <IoIosPeople />,
      target: "forum",
      active: false,
    },
    
  ]);

  const handleNavOnClick = (id, target) => {
    const newNavData = navData.map((nav) => ({
      ...nav,
      active: nav.id === id,
    }));
    setNavData(newNavData);
    sectionActive(target);
  };

  return (
    <div className="side-menu">
      {navData.map((item) => (
        <h1
          key={item.id}
          className={item.active ? "active" : ""}
          onClick={() => handleNavOnClick(item.id, item.target)}
        >
          <span className="icon">
            <GoDotFill />
          </span>
          {item.name}
          <span className="icon">{item.icon}</span>
        </h1>
      ))}
    </div>
  );
}

export default SideMenu;
