import Analytics from "views/Analytics";
import Customer from "views/customers/Customer";
import Dashboard from "views/Dashboard.js";
import Order from "views/orders/Order";
// import Products from "views/products/Products";
import Vendor from "views/vendors/Vendor";
import Category from "views/Category/Category";


var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/order",
    name: "Order",
    icon: "nc-icon nc-calendar-60",
    component: Order,
    layout: "/admin",
  },
  {
    path: "/customers",
    name: "Customers",
    icon: "nc-icon nc-circle-10",
    component: Customer,
    layout: "/admin",
  },
  {
    path: "/vendor",
    name: "Vendors",
    icon: "nc-icon nc-satisfied",
    component: Vendor,
    layout: "/admin",
  },
  // {
  //   path: "/products",
  //   name: "Products",
  //   icon: "nc-icon nc-shop",
  //   component: Products,
  //   layout: "/admin",
  // },
  {
    path: "/category",
    name: "Category Management",
    icon: "nc-icon nc-diamond",
    component: Category,
    layout: "/admin",
  },
  {
    path: "/analytics",
    name: "Analytics",
    icon: "nc-icon nc-sound-wave",
    component: Analytics,
    layout: "/admin",
  },
];
export default routes;
