'use server'

import React from 'react';
import { ProductView } from './getProduct';
const Product = ({ params }: { params: { id: string } }) => {


  return (
    <div>
      <ProductView id={params.id} />
    </div>
  );
};

export default Product;
