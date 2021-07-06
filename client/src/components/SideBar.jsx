import useDarkMode from "use-dark-mode";
import "./SideBar.scss";
import Switch from "react-switch";
import MenuItemList from "./MenuItemList";

const SideBar = (props) => {
  const darkMode = useDarkMode(false);

  const handleChange = () => {
    !darkMode.value ? darkMode.enable() : darkMode.disable();
    console.log(darkMode);
  };

  return (
    <div className="sidebar">
      <MenuItemList />
      <div className="theme-toggle">
        <Switch
          checked={darkMode.value}
          onChange={handleChange}
          onColor="#7ED957"
          offColor="#5664D2"
          onHandleColor="#5664D2"
          offHandleColor="#7ED957"
          boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
          activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
          handleDiameter={20}
          uncheckedIcon={false}
          checkedIcon={false}
          height={15}
          width={40}
          className="react-switch"
          id="material-switch"
        />
      </div>
    </div>
  );
};

export default SideBar;
