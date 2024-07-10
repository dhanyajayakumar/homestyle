import AccountAddress from "@/shared-pages/account/address";
import AccountDashbord from "@/shared-pages/account/dashboard";
import AccountOrders from "@/shared-pages/account/orders";
import AccountPassword from "@/shared-pages/account/password";
import AccountProfile from "@/shared-pages/account/profile";
import AccountWallet from "@/shared-pages/account/wallet";
import AccountWishlist from "@/shared-pages/account/wishlist";

export const formParts = {
  dashboard: "dashboard",
  profile: "profile",
  orders: "orders",
  wishlist: "wishlist",
  wallet: "wallet",
  address: "address",
  password: "password",
};

export const MAP_STEP_TO_COMPONENT = {
  [formParts["dashboard"]]: AccountDashbord,
  [formParts["profile"]]: AccountProfile,
  [formParts["orders"]]: AccountOrders,
  [formParts["wishlist"]]: AccountWishlist,
  [formParts["wallet"]]: AccountWallet,
  [formParts["address"]]: AccountAddress,
  [formParts["password"]]: AccountPassword,
};

export const pagesTabs = [
  { value: "dashboard", label: "Dashboard" },
  { value: "profile", label: "My Profile" },
  { value: "orders", label: "My Orders" },
  { value: "wishlist", label: "Wishlist" },
  { value: "wallet", label: "Wallet" },
  { value: "address", label: "Address" },
  { value: "password", label: "Password" },
];
