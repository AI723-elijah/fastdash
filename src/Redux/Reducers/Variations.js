import * as types from '../Constants/Constants';

const initialState = {
  query: '',
  variation: {}
};

const setValue = (variation, payload) => {
  const { value, attribute, destination, i } = payload;
  if(!destination) {
    variation[attribute] = value;
  } else {
    variation[destination][i][attribute] = value;
  }

  return variation;
}

const attrbiteKey = (variation, payload) => {
  const { name, index, attribute } = payload;

  variation.productAttributes[index].attributeID = attribute.attributeID;
  variation.productAttributes[index].attribute.attributeID = attribute.attributeID;
  variation.productAttributes[index].attribute.attributeName = name;
  return variation;
}

const handleCategory = (variation, payload) => {
  const { value, id } = payload;
  if(id) {
    const categories = variation.productCategories.filter(e => e.channelCategoryID !== id);
    variation.productCategories = categories;
  } else {
    variation.productCategories.push(value);
  }

  return variation;
}

const handleAdd = (variation, payload) => {
  const { params, destination } = payload;
  variation[destination].push(params);

  return variation;
}

const variationReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CHANGE_VARIATION:
      return { ...state, variation: setValue(JSON.parse(JSON.stringify(state.variation)), action.payload) };
    case 'ATTRIBUTE_KEY':
      return { ...state, variation: attrbiteKey(JSON.parse(JSON.stringify(state.variation)), action.payload) };
    case 'SELECT_CATEGORY':
      return { ...state, variation: handleCategory(JSON.parse(JSON.stringify(state.variation)), action.payload) };
    case 'ADD_ITEM':
      return { ...state, variation: handleAdd(JSON.parse(JSON.stringify(state.variation)), action.payload) }
    case types.VARIATION_GET_SUCCESS:
      return { ...state, variation: action.payload };
    case types.SAVE_VARIATION_QUERY:
      return { ...state, query: action.payload }
    default:
      return { ...state };
  }
};

export { variationReducer };
