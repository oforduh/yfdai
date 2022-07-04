import Pages from "../Pages/Index";

const routes = [
  { path: "/", element: <Pages.Homepage />, type: "public" },
  { path: "/tokenswap", element: <Pages.TokenSwap/>, type: "public" },
];

export default routes;
