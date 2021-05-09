import { createSelector } from "reselect";

// const COLLECTION_ID_MAP = {
//   //id in dollections array in redux store is a num, whereas collection id in params is a string
//   hats: 1,
//   sneakers: 2,
//   jackets: 3,
//   womens: 4,
//   mens: 5,
// };

const selectShop = (state) => state.shop;

export const selectCollections = createSelector(
  [selectShop],
  (shop) => shop.collections
);

export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  (collections) => Object.keys(collections).map((key) => collections[key])
); //getting collection keys, mapping and returning the value, gives an array of items, converting collections back to state from object so as to use it for mapping

export const selectCollection = (collectionUrlParam) =>
  createSelector(
    [selectCollections],
    // (collections) =>
    //   collections.find(
    //     (collection) => collection.id === COLLECTION_ID_MAP[collectionUrlParam]
    //   ) //getting value of prop = collectionUrlParam from COLECTION_ID_MAP
    (collections) => collections[collectionUrlParam] //state normalization array -> object to avoid using find which may take large time in worst case
  );
