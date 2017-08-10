import 'aframe-animation-component';

import React from 'react';
import {connect} from 'react-redux';

import ProductTile from '../components/product/ProductTile';
import ProductDescriptionPage from '../components/product/ProductDescriptionPage';
import CartCarousel from '../components/carousels/CartCarousel';
import CategoriesCarousel from '../components/carousels/CategoriesCarousel';
import LoadingScreen from '../components/LoadingScreen';

import {onTextureChange} from '../data/userState';

const tempData = {
  productMap: {
    table1: {
      name: 'Normal Table',
      price: 23.56,
      modelId: '#table-1-obj',
      textureId: '#table-1-mtl',
      colors: [
        '#4CC3D9',
        '#EF2D5E',
        '#FFC65D',
        '#8200AF',
        '#999999',
        '#FCF838'
      ]
    },
    table2: {
      name: 'Fancy Table',
      price: 123.54,
      modelId: '#sq-table-obj',
      textureId: '#sq-table-mtl',
      colors: [
        '#4CC3D9',
        '#EF2D5E',
        '#FFC65D',
        '#8200AF',
        '#999999',
        '#FCF838'
      ]
    },
    drawer: {
      name: 'Fancy Drawer',
      price: 423.45,
      modelId: '#drawer-obj',
      textureId: '#drawer-mtl',
      colors: [
        '#4CC3D9',
        '#EF2D5E',
        '#FFC65D',
        '#8200AF',
        '#999999',
        '#FCF838'
      ]
    }
  }
}

class IndexContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingScreenOpen: false,
      cartCarouselOpen: false,
      categoriesCarouselOpen: false,
      productDescriptionPageOpen: false,
    }
  }

  componentDidMount() {
    // Test redux actions here
    this.props.onTextureChange();
  }

  provideAssets() {
    return (
      <a-assets timeout="0">
        <a-asset-item id="table-1-obj" src="assets/models/table_1/Jet_table.obj"></a-asset-item>
        <a-asset-item id="table-1-mtl" src="assets/models/table_1/Jet_table.mtl"></a-asset-item>
        <a-asset-item id="sq-table-obj" src="assets/models/square_table/square_table.obj"></a-asset-item>
        <a-asset-item id="sq-table-mtl" src="assets/models/square_table/square_table.mtl"></a-asset-item>
        <a-asset-item id="drawer-obj" src="assets/models/drawer/drawer.obj"></a-asset-item>
        <a-asset-item id="drawer-mtl" src="assets/models/drawer/drawer.mtl"></a-asset-item>
      </a-assets>
    );
  }

  renderCamera() {
    return (
      <a-camera>
        <a-cursor></a-cursor>
        <a-entity daydream-controls="hand: right"></a-entity>
      </a-camera>
    )
  }

  renderRoom() {
    return (
      <a-entity position="0 0.75 -2">
        <ProductTile
          position="-1 0 0"
          product={tempData.productMap.table1}
        />
        <ProductTile
          position="0 0 0"
          product={tempData.productMap.table2}
        />
        <ProductTile
          position="1 0 0"
          product={tempData.productMap.drawer}
        />
      </a-entity>
    );
  }

  renderLoadingScreen() {
    return this.state.loadingScreenOpen && <LoadingScreen />;
  }

  renderCartCarousel() {
    return this.state.cartCarouselOpen && <CartCarousel />;
  }

  renderCategoriesCarousel() {
    return this.state.categoriesCarouselOpen && <CategoriesCarousel />;
  }

  renderProductDescriptionPage() {
    return this.state.productDescriptionPageOpen && <ProductDescriptionPage />;
  }

  render () {
    return (
      <a-scene>
        <a-sky color="#6EBAA7"></a-sky>
        {this.provideAssets()}
        {this.renderCamera()}
        {this.renderRoom()}
        {this.renderCartCarousel()}
        {this.renderCategoriesCarousel()}
        {this.renderProductDescriptionPage()}
      </a-scene>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTextureChange: (textureId) => dispatch(onTextureChange(textureId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IndexContainer);
