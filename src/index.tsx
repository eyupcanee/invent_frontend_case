import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import StoreProvider from "./StoreProvider";
import { Suspense } from "react";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <StoreProvider>
    <Suspense fallback={<>LOADING</>}>
      <App />
    </Suspense>
  </StoreProvider>
);
