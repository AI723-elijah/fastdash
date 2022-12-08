import { handleActions } from "redux-actions";
import * as actions from "../Constants/Constants";
import { isEqual, uniq } from "lodash";

const initialState = {
  query: "",
  product: {},
  productDetails: {},
  realProductDetails: {},
  productRequestPayload: {},
  allSkus: [],
  pagination: {},
  products: [],
  variations: [],
  productVariations: [],
  userCanEnterUrlKey: true,
  missingSageProducts: [],
};

const filterProducts = (state, payload) => {
  let repeat = false;
  state.products.map((e) => {
    payload.map((p) => {
      if (e.productID === p.productID) repeat = true;
      return p;
    });
    return e;
  });

  if (repeat) {
    return state.products;
  }
  if (!state.products.length) {
    return payload;
  }

  if (!state.products[0].list_type) {
    if (payload.length > 0) {
      if (payload[0].list_type === "master") {
        return payload;
      }
      if (!payload[0].list_type || payload[0].list_type === "selected") {
        if (payload[0].type === "Child") {
          const stateChildProducts = state.products.filter(
            (e) => e.type === "Child"
          );
          return [...stateChildProducts.filter(Boolean), ...payload];
        } else if (payload[0].type === "Parent") {
          const stateParentProducts = state.products.filter(
            (e) => e.type === "Parent"
          );
          return [...stateParentProducts.filter(Boolean), ...payload];
        }
      }
    } else {
      return payload;
    }
  }
  if (payload.length > 0) {
    if (process.env.REACT_APP_NAME === "fas") {
      payload.map((p) => (p.list_type = "selected"));
    }
    if (state.products[0].list_type === payload[0].list_type) {
      return [...state.products, ...payload];
    }
  }

  return payload;
};

const getProductDetails = (payload) => {
  let productRelations = [];
  let productAttributes = [];
  let productCategories = [];
  let productSuppliers = [];
  let productTierPrices = [];
  let productChannels = [];
  let productPromotions = [];
  let productIcons = [];
  let productQAs = [];
  let productOptions = [];
  let productAccessories = [];
  let productDocuments = [];
  let images = [];
  let videos = [];

  if (payload.productRelations && payload.productRelations.length > 0) {
    productRelations = payload.productRelations;
    productAttributes =
      payload.productRelations[0].childProductDetails.productAttributes;
    productTierPrices =
      payload.productRelations[0].childProductDetails.productTierPrices;
    productPromotions =
      payload.productRelations[0].childProductDetails.productPromotions;
    productSuppliers =
      payload.productRelations[0].childProductDetails.productSuppliers || [];
    images = payload.productRelations[0].childProductDetails.images;
    videos = payload.productRelations[0].childProductDetails.videos;
    payload.productRelations.map((p) => {
      if (
        p.childProductDetails &&
        p.childProductDetails.productChannels.length > 0
      ) {
        let channel = p.childProductDetails.productChannels.map((c) => {
          return c;
        });
        channel[0].variationID = p.childProductDetails.productID;
        productChannels.push(...channel);
      }
      return p;
    });
    if (process.env.REACT_APP_NAME === "westgate") {
      payload.productRelations.map((p) => {
        if (p.childProductDetails.productDocuments.length < 5) {
          const spc = p.childProductDetails.productDocuments.findIndex(
            (d) => d.documentType === "SPC"
          );
          const ies = p.childProductDetails.productDocuments.findIndex(
            (d) => d.documentType === "IES"
          );
          const lm = p.childProductDetails.productDocuments.findIndex(
            (d) => d.documentType === "LM79"
          );
          const cat = p.childProductDetails.productDocuments.findIndex(
            (d) => d.documentType === "CAT"
          );
          const man = p.childProductDetails.productDocuments.findIndex(
            (d) => d.documentType === "MAN"
          );
          if (spc === -1) {
            p.childProductDetails.productDocuments.push({
              document: "",
              documentType: "SPC",
              documentName: "",
            });
          }
          if (ies === -1) {
            p.childProductDetails.productDocuments.push({
              document: "",
              documentType: "IES",
              documentName: "",
            });
          }
          if (lm === -1) {
            p.childProductDetails.productDocuments.push({
              document: "",
              documentType: "LM79",
              documentName: "",
            });
          }
          if (cat === -1) {
            p.childProductDetails.productDocuments.push({
              document: "",
              documentType: "CAT",
              documentName: "",
            });
          }
          if (man === -1) {
            p.childProductDetails.productDocuments.push({
              document: "",
              documentType: "MAN",
              documentName: "",
            });
          }
        }
        return p;
      });
    }
  } else {
    productAttributes = payload.productAttributes;
    productTierPrices = payload.productTierPrices;
    productPromotions = payload.productPromotions;
    productChannels = payload.productChannels || [];
    productSuppliers = payload.productSuppliers || [];
    images = payload.images;
    videos = payload.videos;
  }
  productCategories = payload.productCategories;
  productIcons = payload.productIcons;
  productQAs = payload.productQAs;
  productDocuments = payload.productDocuments;
  productOptions = payload.productOptions;
  productAccessories = payload.productAccessories;
  return {
    productRelations,
    productAttributes,
    productCategories,
    productSuppliers,
    productTierPrices,
    productChannels,
    productPromotions,
    productIcons,
    productOptions,
    productDocuments,
    productAccessories,
    images,
    videos,
    productQAs,
  };
};

const getProduct = (payload) => {
  // delete payload["ProductRelationAttribute"];
  // delete payload["productRelations"];
  // delete payload["productCategories"];
  // delete payload["productSuppliers"];
  // delete payload["productTierPrices"];
  // delete payload["productChannels"];
  // delete payload["productPromotions"];
  // delete payload["productIcons"];

  return payload;
};

function deepCompare() {
  var i, l, leftChain, rightChain;

  function compare2Objects(x, y) {
    var p;
    if (
      isNaN(x) &&
      isNaN(y) &&
      typeof x === "number" &&
      typeof y === "number"
    ) {
      return true;
    }
    if (x === y) {
      return true;
    }
    if (
      (typeof x === "function" && typeof y === "function") ||
      (x instanceof Date && y instanceof Date) ||
      (x instanceof RegExp && y instanceof RegExp) ||
      (x instanceof String && y instanceof String) ||
      (x instanceof Number && y instanceof Number)
    ) {
      return x.toString() === y.toString();
    }

    if (!(x instanceof Object && y instanceof Object)) {
      return false;
    }

    if (x.isPrototypeOf(y) || y.isPrototypeOf(x)) {
      return false;
    }

    if (x.constructor !== y.constructor) {
      return false;
    }

    if (x.prototype !== y.prototype) {
      return false;
    }
    if (leftChain.indexOf(x) > -1 || rightChain.indexOf(y) > -1) {
      return false;
    }

    for (p in y) {
      if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
        return false;
      } else if (typeof y[p] !== typeof x[p]) {
        return false;
      }
    }

    for (p in x) {
      if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
        return false;
      } else if (typeof y[p] !== typeof x[p]) {
        return false;
      }

      switch (typeof x[p]) {
        case "object":
        case "function":
          leftChain.push(x);
          rightChain.push(y);

          if (!compare2Objects(x[p], y[p])) {
            return false;
          }

          leftChain.pop();
          rightChain.pop();
          break;

        default:
          if (x[p] !== y[p]) {
            return false;
          }
          break;
      }
    }
    return true;
  }
  if (arguments.length < 1) {
    return true;
  }
  for (i = 1, l = arguments.length; i < l; i++) {
    leftChain = [];
    rightChain = [];
    if (!compare2Objects(arguments[0], arguments[i])) {
      return false;
    }
  }
  return true;
}

const getChangedParent = (obj1, obj2) => {
  //obj1 = current, obj2 = real

  const data = uniq([...Object.keys(obj1)]);
  let changed = {};
  for (const key of data) {
    if (typeof obj1[key] !== "object") {
      if (!isEqual(obj1[key], obj2[key])) {
        changed[key] = obj1[key];
      }
    } else {
      if (obj1[key] !== null && Object.keys(obj1[key]).length > 0) {
        // console.log(key, " ", typeof obj1[key], " ", obj1[key]);
        obj1[key].map((item, index) => {
          // console.log("item ", item);
          // console.log("obj2[key][index] ", obj2[key][index]);
          if (!deepCompare(item, obj2 && obj2[key] && obj2[key][index])) {
            changed[key] = obj1[key];
          }
        });
      }
    }
  }
  return changed;

  // check if obj1 is different from obj2 and return the changed object
  // for(let key in obj1){
  //   if(obj1[key] !== obj2[key]){
  //     changed[key] = obj1[key];
  //   }
  // }

  // let keyFound = {};
  // let newObject = {};
  // let newArray = [];
  // Object.keys(obj1).forEach((key) => {
  //   newArray = [];
  //   if (typeof obj1[key] !== "object") {
  //     if (obj1[key] !== obj2[key]) {
  //       keyFound = { ...keyFound, [key]: obj1[key] };
  //       return keyFound;
  //     }
  //     return keyFound || -1;
  //   } else {
  //     return (
  //       obj1 &&
  //       obj1[key] &&
  //       obj1[key].map((o, i) => {
  //         o &&
  //           Object.keys(o) &&
  //           Object.keys(o).length ===
  //             (obj2 &&
  //               obj2[key] &&
  //               obj2[key][i] &&
  //               Object.keys(obj2 && obj2[key] && obj2[key][i]) &&
  //               Object.keys(obj2 && obj2[key] && obj2[key][i]).length) &&
  //           Object.keys(o).map((k) => {
  //             if (
  //               k &&
  //               k.includes("product") &&
  //               k.includes("ID" || "Id" || "id")
  //             ) {
  //               newObject = { ...newObject, [k]: o[k] };
  //             }
  //             if (o[k] !== obj2[key][i][k]) {
  //               newObject = { ...newObject, [k]: o[k] };
  //               return newObject;
  //             }
  //           });
  //         if (Object.keys(newObject).length > 1) {
  //           newArray.push(newObject);
  //         }
  //         newObject = {};
  //         if (newArray.length > 0) {
  //           keyFound = { ...keyFound, [key]: newArray };
  //           return keyFound;
  //         }
  //         return keyFound;
  //       })
  //     );
  //   }
  // });
  // return keyFound;
};

const createPayload = (payload) => {
  const user = localStorage.getItem("userEmail");
  let {
    product,
    productQAs,
    productRelations,
    productAttributes,
    productCategories,
    productTierPrices,
    productSuppliers,
    productPromotions,
    productChannels,
    productIcons,
    productOptions,
    productAccessories,
    productDocuments,
    images,
    videos,
  } = payload.params;

  product.productIcons = productIcons;
  product.productQAs = productQAs;
  product.productDocuments = productDocuments;
  product.productCategories = productCategories;
  product.productOptions = productOptions;
  product.productAccessories = productAccessories;
  product.images = images;
  product.videos = videos;
  product.productAttributes = productAttributes;
  product.productTierPrices = productTierPrices;
  product.productPromotions = productPromotions;
  product.productChannels = productChannels;
  product.productSuppliers = productSuppliers;

  const obj2 = JSON.parse(localStorage.getItem("productFormData"));
  let parent = getChangedParent(
    product,
    obj2 && obj2.formproductdetails ? obj2.formproductdetails : {}
  );

  if (productRelations.length > 0) {
    productRelations.map((e, index) => {
      if (e.childProductDetails) {
        if (e.parentID) {
          if (index === 0) {
            e.childProductDetails.productCategories = productCategories;
            e.childProductDetails.productTierPrices = productTierPrices;
            e.childProductDetails.productPromotions = productPromotions;
            e.childProductDetails.productSuppliers = productSuppliers;
            e.childProductDetails["productChannels"] = [];
            if (product.productID) {
              productChannels.map((p, i) => {
                if (e.childProductDetails.productChannelID) {
                  if (e.childProductDetails.productID === p.variationID) {
                    delete p["variationID"];
                  }
                }
                e.childProductDetails.productChannels.push(p);
                return e;
              });
            }
          } else {
            productCategories.map((p, i) => {
              if (e.childProductDetails.productCategories[i]) {
                e.childProductDetails.productCategories[i].channelCategoryID =
                  p.channelCategoryID;
                e.childProductDetails.productCategories[
                  i
                ].channelCategoryDetails = p.channelCategoryDetails;
              } else {
                e.childProductDetails.productCategories.push(p);
              }
              return p;
            });
            productTierPrices.map((p, i) => {
              if (e.childProductDetails.productTierPrices[i]) {
                e.childProductDetails.productTierPrices[i].percentage =
                  p.percentage;
                e.childProductDetails.productTierPrices[i].qtyMaximum =
                  p.qtyMaximum;
                e.childProductDetails.productTierPrices[i].qtyMinimum =
                  p.qtyMinimum;
              } else {
                e.childProductDetails.productTierPrices.push(p);
              }
              return p;
            });
            productPromotions.map((p, i) => {
              if (e.childProductDetails.productPromotions[i]) {
                e.childProductDetails.productPromotions[i].percentage =
                  p.percentage;
                e.childProductDetails.productPromotions[i].endDate = p.endDate;
                e.childProductDetails.productPromotions[i].startDate =
                  p.startDate;
              } else {
                e.childProductDetails.productPromotions.push(p);
              }
              return p;
            });
            productSuppliers &&
              productSuppliers.map((p, i) => {
                if (e.childProductDetails.productSuppliers[i]) {
                  e.childProductDetails.productSuppliers[i].cost = p.cost;
                  e.childProductDetails.productSuppliers[i].supplier =
                    p.supplier;
                  e.childProductDetails.productSuppliers[i].supplierID =
                    p.supplierID;
                } else {
                  e.childProductDetails.productSuppliers.push(p);
                }
                return p;
              });
            e.childProductDetails["productChannels"] = [];
            if (product.productID) {
              productChannels.map((p, i) => {
                if (e.childProductDetails.productChannelID) {
                  if (e.childProductDetails.productID === p.variationID) {
                    delete p["variationID"];
                  }
                }
                e.childProductDetails.productChannels.push(p);
                return p;
              });
            }
          }
        } else {
          e.childProductDetails.productTierPrices = productTierPrices.map(
            ({ productTierPriceID, ...item }) => item
          );
          e.childProductDetails.productPromotions = productPromotions.map(
            ({ productPromotionID, ...item }) => item
          );
          e.childProductDetails.productChannels = productChannels.map(
            ({ productChannelID, ...item }) => item
          );
          e.childProductDetails.productSuppliers =
            productSuppliers &&
            productSuppliers.map(({ productSupplierID, ...item }) => item);
        }
      }
      return e;
    });
    if (process.env.REACT_APP_NAME !== "westgate") {
      let index =
        productRelations[0].childProductDetails.productAttributes.findIndex(
          (c) => c.attribute.attributeName === "Color"
        );
      if (productAttributes.length > 0 && index > -1) {
        productAttributes[index].value =
          productRelations[0].childProductDetails.productAttributes[
            index
          ].value;
      }
      productRelations[0].childProductDetails.productAttributes =
        productAttributes;
    }
    product.productRelations = productRelations;
  }

  let relationArray = [];
  let relationObject = {};
  let relations =
    product.productRelations &&
    product.productRelations.map((item) => {
      let realProductRelations =
        payload && payload.realProd && payload.realProd.productRelations;
      let realDetails =
        realProductRelations &&
        realProductRelations.filter((rel) => rel.childID === item.childID)[0];

      if (realDetails) {
        let details = getChangedParent(
          item.childProductDetails,
          realDetails.childProductDetails ? realDetails.childProductDetails : {}
        );
        relationObject = { ...item, childProductDetails: details };
      } else {
        relationObject = { ...item };
      }
      if (
        relationObject &&
        relationObject.childProductDetails &&
        Object.keys(relationObject.childProductDetails).length > 0
      ) {
        relationArray.push(relationObject);
        relationObject = {};
        return relationArray;
      }
      return relationArray;
    });

  if (product.productID) {
    parent.modified_by = user;
  } else {
    parent.created_by = user;
    parent.modified_by = user;
  }

  productQAs = parent.productQAs;
  productAttributes = parent.productAttributes;
  productCategories = parent.productCategories;
  productTierPrices = parent.productTierPrices;
  productSuppliers = parent.productSuppliers;
  productPromotions = parent.productPromotions;
  productChannels = parent.productChannels;
  productIcons = parent.productIcons;
  productOptions = parent.productOptions;
  productAccessories = parent.productAccessories;
  productDocuments = parent.productDocuments;
  images = parent.images;
  videos = parent.videos;

  delete parent.productQAs;
  delete parent.productAttributes;
  delete parent.productCategories;
  delete parent.productTierPrices;
  delete parent.productSuppliers;
  delete parent.productPromotions;
  delete parent.productChannels;
  delete parent.productIcons;
  delete parent.productOptions;
  delete parent.productAccessories;
  delete parent.productDocuments;
  delete parent.images;
  delete parent.videos;

  let obj = {
    urlKey: product.urlKey,
    parent,
    productQAs,
    productAttributes,
    productCategories,
    productTierPrices,
    productSuppliers,
    productPromotions,
    productChannels,
    productIcons,
    productOptions,
    productAccessories,
    productDocuments,
    images,
    videos,
    productID: product.productID,
    productRelations: relations && relationArray,
  };

  return obj;
};

const handlers = {
  [actions.SAVE_QUERY]: (state, action) => ({
    ...state,
    query: action.payload,
  }),
  [actions.GET_MISSING_SAGE_PRODUCTS_SUCCESS]: (state, action) => ({
    ...state,
    missingSageProducts: action.payload,
  }),
  [actions.PRODUCTS_GET_SUCCESS]: (state, action) => ({
    ...state,
    products: filterProducts(state, action.payload),
  }),
  [actions.PRODUCTS_GET_FAILURE]: (state) => ({ ...state, products: [] }),

  [actions.VARIATIONS_GET_SUCCESS]: (state, action) => {
    return {
      ...state,
      variations: [...state.variations, ...action.payload.rows],
      pagination: { count: action.payload.count },
    };
  },
  [actions.GET_ALL_PRODUCTS_IN_SYSTEM_SUCCESS]: (state, action) => ({
    ...state,
    allSkus: action.payload.map((p) => ({
      sku: p.sku,
      ItemCode: p.ItemCode,
      upc: p.upc,
    })),
  }),
  [actions.SEARCH_VARIATION_SUCCESS]: (state, action) => {
    return {
      ...state,
      variations: [...action.payload.rows],
      pagination: { count: action.payload.count },
    };
  },
  [actions.PRODUCTS_SEARCH_SUCCESS]: (state, action) => ({
    ...state,
    products: action.payload,
  }),
  [actions.PRODUCTS_VARIATIONS_GET_SUCCESS]: (state, action) => ({
    ...state,
    productVariations: action.payload,
  }),
  [actions.PRODUCTS_SEARCH_FAILURE]: (state) => ({ ...state, products: [] }),
  [actions.FILTER_PRODUCTS_SUCCESS]: (state, action) => ({
    ...state,
    products: action.payload,
  }),
  [actions.PRODUCT_GET_SUCCESS]: (state, action) => {
    return {
      ...state,
      productDetails: getProductDetails(action.payload),
      realProductDetails: getProductDetails(action.payload),
      product: getProduct(action.payload),
    };
  },
  [actions.PRODUCT_PAYLOAD]: (state, action) => ({
    ...state,
    productRequestPayload: createPayload(action.payload),
  }),
  EMPTY_PRODUCT: (state, action) => ({
    ...state,
    products: action.payload,
    variations: action.payload,
    pagination: {},
  }),
  [actions.PRODUCTS_URL_KEYS_SUCCESS]: (state, action) => ({
    ...state,
    configuredUrls: action.payload,
    userCanEnterUrlKey: true,
  }),
  [actions.SET_USER_CAN_ENTER_URL_KEY]: (state, action) => {
    return { ...state, userCanEnterUrlKey: action.payload };
  },
  [actions.REMOVE_QUESTION_SUCCESS]: (state) => {
    return { ...state };
  },
  [actions.REMOVE_QUESTION_SUCCESS]: (state) => {
    return { ...state };
  },
};

const productReducer = handleActions(handlers, initialState);
export { productReducer };
