import React from 'react'
import { Link, Outlet } from 'react-router-dom';
import { RiDashboardFill, RiCustomerService2Fill } from "react-icons/ri";
import { FaUsers,FaHome , FaShoppingBag, FaLocationArrow } from "react-icons/fa";
import { IoAddCircleSharp } from "react-icons/io5";
import { MdEditDocument, MdMenuBook } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoLogOutSharp } from "react-icons/io5";
import Login from '../components/Login';
import useAdmin from '../hooks/useAdmin';
const logo = "/home/logo.png";

const sharedLinks = (
  <>
    <li>
      <Link to="/">
        <FaHome />
        Home
      </Link>
    </li>
    <li>
      <Link to="/menu">
        <MdMenuBook />
        Menu
      </Link>
    </li>
    <li>
      <Link to="/menu">
        <FaLocationArrow />
        Orders Tracking
      </Link>
    </li>
    <li>
      <Link to="/support">
        <RiCustomerService2Fill />
        Customer Support
      </Link>
    </li>
    <li>
      <button to="/support">
        <IoLogOutSharp />
        Logout
      </button>
    </li>
  </>
);

function AdminLayout() {
    const [isAdmin, isAdminLoading] = useAdmin();
  return (
    <div>
      {isAdmin ?   <div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col sm:items-start sm:justify-start  ">
          {/* Page content here */}
          <div className="">
            <div>
              <label
              htmlFor="my-drawer-2"
              className="btn drawer-button lg:hidden text-white bg-green"
            >
              <GiHamburgerMenu />
            </label>
            </div>
          </div>
          <div className="mt-5 md:mt-3 mx-4">
            <Outlet />
          </div>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            <li className="bg-white">
              <Link to="/admin" className="flex justify-start items-center">
                <img src={logo} alt="logo" />
                <div className="badge badge-primary">Admin</div>
              </Link>
            </li>
            <li>
              <Link to="/admin">
                <RiDashboardFill />
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/admin/manage-booking">
                <FaShoppingBag />
                Manage Bookings
              </Link>
            </li>
            <li>
              <Link to="/admin/add-menu">
                <IoAddCircleSharp />
                Add Menu
              </Link>
            </li>
            <li>
              <Link to="/admin/manage-items">
                <MdEditDocument />
                Manage Items
              </Link>
            </li>
            <li className='mb-4'>
              <Link to="/admin/users">
                <FaUsers />
                All Users
              </Link>
            </li>
            <hr />
            {/* Shared Links */}
            {sharedLinks}
          </ul>
        </div>
      </div>
      </div> 
        :
        <Login />
      }
  </div>
  );
}

export default AdminLayout;