import { useContext } from "react";
import { OutletContext } from "@/context/OutletContext";

function Outlet() {
  return <>{useContext(OutletContext)}</>;
}

export default Outlet;
