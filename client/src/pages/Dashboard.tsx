import { Routes, Route } from "react-router-dom";
import MyOrders from "./MyOrders";

const Dashboard = () => {
    return(
        <div>
            <Routes>
                <Route path="/myorders" element={<MyOrders />} />
            </Routes>
        </div>
    )
}

export default Dashboard;