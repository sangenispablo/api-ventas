import { getCustomRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';
import ProductRepository from '../typeorm/repositories/ProductRepository';
import Product from '../typeorm/entities/Product';

interface IRequest {
  id: string;
}

class ShowProductsService {
  public async execute({ id }: IRequest): Promise<Product | undefined> {
    const productRepository = getCustomRepository(ProductRepository);
    const product = await productRepository.findOne(id);
    if (!product) {
      throw new AppError('Product not Found')
    }
    return product;
  }
}

export default ShowProductsService;
