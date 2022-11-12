import { getCustomRepository } from 'typeorm';

import ProductRepository from '../typeorm/repositories/ProductRepository';
import Product from '../typeorm/entities/Product';

class ListProductsService {
  public async execute(): Promise<Product[]> {
    const productRepository = getCustomRepository(ProductRepository);
    const products = productRepository.find();
    return products;
  }
}

export default ListProductsService;
