import { AttributesContainer } from "../Redux/Containers/Attributes";
import { ProductsContainer } from "../Redux/Containers/Products";
import { CategoriesContainer } from "../Redux/Containers/Categories";
import { ChannelSettingsContainer } from "../Redux/Containers/ChannelSettings";
import { OptionsContainer } from "../Redux/Containers/options";
import { QandAContainer } from "../Redux/Containers/QandA";
import { UserContainer } from "../Redux/Containers/Users";
import { OrdersContainer } from "../Redux/Containers/Orders";
import { CouponsContainer } from "../Redux/Containers/Coupons";
import { ChangePasswordContainer } from "../Redux/Containers/ChangePassword";
import { MissingSageProductsContainer } from "../Redux/Containers/MissingSageProducts";
import { NonMappedProductsToSageContainer } from "../Redux/Containers/NonMappedProductsToSage";
import { PdfsContainer } from "../Redux/Containers/Pdfs";

export const privateRoutes = [
  {
    key: "/attributes",
    path: "/attributes",
    Component: AttributesContainer,
    label: "Attributes",
    icon: "sliders",
  },
  {
    key: "/master-products",
    path: "/master-products",
    Component: ProductsContainer,
    label: "Master Products",
    icon: "hdd",
  },
  {
    key: "/products",
    path: "/products",
    Component: ProductsContainer,
    label: "Products",
    icon: "hdd",
  },
  {
    key: "/orders",
    path: "/orders",
    Component: OrdersContainer,
    label: "Orders",
    icon: "shopping-cart",
  },
  {
    key: "/categories",
    path: "/categories",
    Component: CategoriesContainer,
    label: "Categories",
    icon: "profile",
  },
  {
    key: "/channel-settings",
    path: "/channel-settings",
    Component: ChannelSettingsContainer,
    label: "Channel Settings",
    icon: "setting",
  },
  {
    key: "/options",
    path: "/options",
    Component: OptionsContainer,
    label: "Options",
    icon: "hdd",
  },
  {
    key: "/QandA",
    path: "/QandA",
    Component: QandAContainer,
    label: "Q&A",
    icon: "wechat",
  },
  {
    key: "/users",
    path: "/users",
    Component: UserContainer,
    label: "Users",
    icon: "user",
  },
  {
    key: "/coupons",
    path: "/coupons",
    Component: CouponsContainer,
    label: "Coupons",
    icon: "file-add",
  },
  {
    key: "/pdfs",
    path: "/pdfs",
    Component: PdfsContainer,
    label: "PDFs",
    icon: "hdd",
  },
  {
    key: "/changePassword",
    path: "/changePassword",
    Component: ChangePasswordContainer,
    label: "Settings",
    icon: "setting",
  },
  {
    key: "/missing-sage-products",
    path: "/missing-sage-products",
    Component: MissingSageProductsContainer,
    label: "Missing Sage Products",
    icon: "appstore",
  },
  {
    key: "NonMappedProductsToSageContainer",
    path: "/non-mapped-products-to-sage",
    Component: NonMappedProductsToSageContainer,
    label: "Non Mapped Products To Sage",
    icon: "appstore",
  },
];
