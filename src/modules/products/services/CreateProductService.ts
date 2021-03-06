import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';

import Product from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

class CreateProductService {
  public async execute({ name, price, quantity }: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);
    // verifico que no exista el producto con el metodo que habia creado en el Repository
    const productExists = await productsRepository.findByName(name);
    if (productExists) {
      throw new AppError('There is already on product with this name');
    }
    const product = productsRepository.create({
      name,
      price,
      quantity,
    });
    await productsRepository.save(product);
    return product;
  }
}

export default CreateProductService;
