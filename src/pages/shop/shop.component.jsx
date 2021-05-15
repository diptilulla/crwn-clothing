import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import {
  firestore,
  convertCollectionsSnapshotToMap,
} from "../../firebase/firebase.utils";
import { updateCollections } from "../../redux/shop/shop.actions";

import WithSpinner from "../../components/with-spinner/with-spinner.component";

import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../collection/collection.component";

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview); //bcz collectionsOverview has to know if data is fetched or not
const CollectionPageWithSpinner = WithSpinner(CollectionPage);
class ShopPage extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: true,
    };
  }
  unsubscribeFromSnapshot = null; //snapshot representation of collections array

  componentDidMount() {
    const { updateCollections } = this.props;
    const collectionRef = firestore.collection("collections"); //we want to fetch shop data in shop component as both its children collections overview and collections page need it
    
    fetch('https://firestore.googleapis.com/v1/projects/crwn-db-c5780/databases/(default)/documents/collections')
     .then(response => response.json())
     .then(collections => console.log(collections))

    // //Observable-Observer code
    // this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async (snapshot) => {
    //   //whenever collectionref updates or whenevr this code gets run for the 1st time this collectionRef will send us the snapshot representing code of collections objects array at the time when this code renders
    //   const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
    //   updateCollections(collectionsMap);
    //   this.setState({ loading: false });
    // });
    // //get code (api calls) using promise style without onSnapshot listener - but we'll only get data from this only when we are remounting the component, bcz we are not leveraging the live update stream style of Observable pattern
    // collectionRef.get().then(
    //   snapshot => {
    //     const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
    //     updateCollections(collectionsMap);
    //     this.setState({ loading: false });
    //   }); //get makes api call to call to fetch back data associated to colectionRef i.e. snapshot object,  its a promise

  }

  render() {
    const { match } = this.props;
    //we have access to match bcz shop page is nested in route in App
    const { loading } = this.state;
    return (
      <div className="shop-page">
        <Route
          exact
          path={match.path}
          render={(props) => (
            <CollectionsOverviewWithSpinner isLoading={loading} {...props} />
          )}
        />
        <Route
          path={`${match.path}/:collectionId`}
          render={(props) => (
            <CollectionPageWithSpinner isLoading={loading} {...props} />
          )}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateCollections: (collectionsMap) =>
    dispatch(updateCollections(collectionsMap)),
});

export default connect(null, mapDispatchToProps)(ShopPage);
