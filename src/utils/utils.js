export const BASE_URL = "https://modshop-backend.kushanksriraj.repl.co";

// get this data from api
export const categoryList = [
  {
    name: "Caps",
    image: "/image/cap.jpg",
  },

  {
    name: "Hoodie",
    image: "/image/hoodie.jpg",
  },

  {
    name: "T-Shirt",
    image: "/image/t-shirt.jpg",
  },

  {
    name: "Model car",
    image: "/image/model-car.jpg",
  },

  {
    name: "Backpack",
    image: "/image/backpack.jpg",
  },

  {
    name: "Keyring",
    image: "/image/keyring.jpg",
  },

  {
    name: "iPhone case",
    image: "/image/iphone-case.jpg",
  },
];

export const getFilteredProductsByCategory = (productList, filterList) => {
  if (filterList.length > 0) {
    return productList.filter((product) =>
      filterList.some((list) => list === product.category)
    );
  }
  return productList;
};

export const getFilteredProductsByStock = (productList, stockFilter) => {
  if (stockFilter === "OUT_OF_STOCK") {
    return productList;
  }
  return productList.filter((product) => product.stock > 0);
};

export const getFilteredProductsByDelivery = (productList, deliveryFilter) => {
  if (deliveryFilter === "ASSURED_DELIVERY") {
    return productList.filter((product) => product.assuredDelivery);
  }
  return productList;
};

export const getSortedProducts = (filteredData, sortBy) => {
  switch (sortBy) {
    case "LOW_TO_HIGH":
      return [...filteredData].sort((a, b) => a.price - b.price);
    case "HIGH_TO_LOW":
      return [...filteredData].sort((a, b) => b.price - a.price);
    default:
      return filteredData;
  }
};

export const getTransformedProducts = ({
  productList,
  categoryFilterList,
  stockFilter,
  deliveryFilter,
  sort,
}) => {
  const filteredProductsByCategory = getFilteredProductsByCategory(
    productList,
    categoryFilterList
  );

  const filteredProductsByStock = getFilteredProductsByStock(
    filteredProductsByCategory,
    stockFilter
  );

  const filteredProductsByDelivery = getFilteredProductsByDelivery(
    filteredProductsByStock,
    deliveryFilter
  );

  const sortedProductList = getSortedProducts(filteredProductsByDelivery, sort);
  return sortedProductList;
};
