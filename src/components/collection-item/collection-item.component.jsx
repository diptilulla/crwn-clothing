import React from 'react';
import { connect } from 'react-redux';

import CustomButton from '../custom-button/custom-button.component';
import { addItem } from '../../redux/cart/cart.actions';

import './collection-item.styles.scss';
import {
  AddButtonContainer,
  BackgroundImageContainer,
  CollectionItemContainer,
  FooterContainer,
  NameContainer,
  PriceContainer,
} from "./collection-item.styles";

const CollectionItem = ({ item, addItem }) => {
    const { name, price, imageUrl } = item;
    return (
      <CollectionItemContainer>
        <BackgroundImageContainer
          className="image"
          style={{
            backgroundImage: `url(${imageUrl})`,
          }}
        ></BackgroundImageContainer>
        <FooterContainer>
          <NameContainer>{name}</NameContainer>
          <PriceContainer>{price}</PriceContainer>
        </FooterContainer>
        <AddButtonContainer onClick={() => addItem(item)} inverted>
          Add to cart
        </AddButtonContainer>
      </CollectionItemContainer>
    );
}
const mapDispatchToProps = dispatch => ({
    addItem: item => dispatch(addItem(item))
})

export default connect(null, mapDispatchToProps)(CollectionItem);