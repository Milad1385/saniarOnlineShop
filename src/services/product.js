import { getUserToken } from "../Utils/Funcs/utils";

const baseURL = `https://shoppingmilad.liara.run/products`;

const createNewProduct = async (data) => {
  try {
    const res = await fetch(`${baseURL}`, {
      method: "POST",
      body: data,
    });

    return res;
  } catch (err) {
    return err;
  }
};

const getAllProducts = async (page) => {
  console.log(page);
  try {
    const res = await fetch(`${baseURL}?page=${page}`);

    return await res.json();
  } catch (err) {
    return err;
  }
};

const getBestSellerProduct = async () => {
  try {
    const res = await fetch(`${baseURL}/best-seller`, {
      headers: {
        authorization: `${getUserToken()}`,
      },
    });
    return await res.json();
  } catch (err) {
    return err;
  }
};

const getSameProducts = async (category) => {
  try {
    const res = await fetch(`${baseURL}/same-product/${category}`);

    return await res.json();
  } catch (err) {
    return err;
  }
};

const getProductInfo = async (title) => {
  try {
    const res = await fetch(`${baseURL}/get/productInfo/${title}`);

    return await res.json();
  } catch (err) {
    return err;
  }
};

const getAllProductsWithOutPagination = async () => {
  try {
    const res = await fetch(`${baseURL}/getAll`);
    return await res.json();
  } catch (err) {
    return err;
  }
};

const deleteProduct = async (id) => {
  try {
    const res = await fetch(`${baseURL}/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `${getUserToken()}`,
      },
    });

    return res;
  } catch (err) {
    return err;
  }
};

const getProductFromCategory = async (catName, page) => {
  try {
    const res = await fetch(`${baseURL}/category/${catName}?page=${page}`);
    return await res.json();
  } catch (err) {
    return err;
  }
};

const searchProduct = async (searchValue) => {
  try {
    const res = await fetch(`${baseURL}/search/${searchValue}`);
    return await res.json();
  } catch (err) {
    return err;
  }
};

const editProduct = async (info) => {
  try {
    const res = await fetch(`${baseURL}/${info.id}`, {
      method: "PUT",
      body: info.data,
    });

    return res;
  } catch (err) {
    return err;
  }
};

const filterProduct = async (
  categories,
  sort,
  page,
  startPrice,
  endPrice,
  search
) => {
  console.log(search);
  try {
    const res = await fetch(
      `${baseURL}/filtredProducts/${
        categories.length ? categories : "test"
      }?startPrice=${startPrice}&endPrice=${endPrice}&page=${page}&sort=${sort}&q=${search}`
    );

    console.log(res);
    return await res.json();
  } catch (err) {
    return err;
  }
};

const getFeatures = async (id) => {
  console.log("id =>>>", id.queryKey[1]);
  try {
    const res = await fetch(`${baseURL}/get-main/features/${id.queryKey[1]}`);
    return await res.json();
  } catch (err) {
    return err;
  }
};

export {
  createNewProduct,
  getAllProducts,
  getBestSellerProduct,
  getSameProducts,
  getProductInfo,
  getAllProductsWithOutPagination,
  deleteProduct,
  getProductFromCategory,
  searchProduct,
  editProduct,
  filterProduct,
  getFeatures,
};
