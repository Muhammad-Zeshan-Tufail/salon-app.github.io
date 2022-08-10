import React from "react";
import ReactDOM from "react-dom";

import "assets/scss/paper-dashboard.scss?v=1.3.0";
import "assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import "./assets/css/paper-dashboard.css";
import 'react-toastify/dist/ReactToastify.css';
import App from "./App";
import { CustomerProvider } from "./views/customers/context";
import { VendorProvider } from "./views/vendors/context";
import { ProductProvider } from "./views/products/context";
import { CategoryProvider } from "./views/Category/Context";

ReactDOM.render(
  <ProductProvider>
    <CategoryProvider>
      <CustomerProvider>
        <VendorProvider>
          <App />
        </VendorProvider>
      </CustomerProvider>
    </CategoryProvider>
  </ProductProvider>,
  document.getElementById("root")
);
