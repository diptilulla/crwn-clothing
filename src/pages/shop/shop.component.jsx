import React from 'react';
import { Route } from "react-router-dom";

import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from '../collection/collection.component';

const ShopPage = ({ match }) => {
  //we have access to match bcz shop page is nested in route in App
  console.log(match);
  return (
    <div className="shop-page">
      <Route exact path={match.path} component={CollectionsOverview} />
        <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
    </div>
  );
};
export default ShopPage;
