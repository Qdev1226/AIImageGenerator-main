/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/** 
  All of the routes for the Material Dashboard 2 React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import Users from "layouts/users";
import Categories from "layouts/categories";
import Engines from "layouts/engines";
import Tokens from "layouts/tokens";
// import Pricing from "layouts/pricing";
import Billing from "layouts/billing";
import Sales from "layouts/sales";
import Models from "layouts/models";
import Filters from "layouts/filters";
import Images from "layouts/images";
import Roles from "layouts/roles";
import Filter1Icon from '@mui/icons-material/Filter1';
import Filter2Icon from '@mui/icons-material/Filter2';
import Filter3Icon from '@mui/icons-material/Filter3';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import Memberships from "layouts/memberships"


// @mui icons
import Icon from "@mui/material/Icon";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Users",
    key: "users",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/users",
    component: <Users />,
  },
  {
    type: "collapse",
    name: "Categories",
    key: "categories",
    icon: <Filter1Icon fontSize="small"></Filter1Icon>,
    route: "/categories",
    component: <Categories />,
  },
  {
    type: "collapse",
    name: "Engines",
    key: "engines",
    icon: <Filter2Icon fontSize="small">person</Filter2Icon>,
    route: "/engines",
    component: <Engines />,
  },
  {
    type: "collapse",
    name: "Models",
    key: "models",
    icon: <Filter3Icon fontSize="small"></Filter3Icon>,
    route: "/models",
    component: <Models />,
  },
  {
    type: "collapse",
    name: "Memberships",
    key: "memberships",
    icon: <MonetizationOnIcon fontSize="small"></MonetizationOnIcon>,
    route: "/memberships",
    component: <Memberships />,
  },

  // {
  //   type: "collapse",
  //   name: "Pricing",
  //   key: "pricing",
  //   icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
  //   route: "/pricing",
  //   component: <Pricing />,
  // },
  // {
  //   type: "collapse",
  //   name: "Roles",
  //   key: "roles",
  //   icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
  //   route: "/roles",
  //   component: <Roles />,
  // },
  // {
  //   type: "collapse",
  //   name: "Images",
  //   key: "images",
  //   icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
  //   route: "/images",
  //   component: <Images />,
  // },
  // {
  //   type: "collapse",
  //   name: "Sales",
  //   key: "sales",
  //   icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
  //   route: "/sales",
  //   component: <Sales />,
  // },
];

export default routes;
