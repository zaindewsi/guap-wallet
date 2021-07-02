import "./SideBar.scss";
import MenuItemList from "./MenuItemList";

const SideBar = (props) => {
  return (
    <div className="sidebar">
      <MenuItemList />
    </div>
  );
};

export default SideBar;
