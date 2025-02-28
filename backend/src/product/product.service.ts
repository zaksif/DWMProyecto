import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { CreateProductDto } from './create-product.dto';
import { Product, ProductDocument } from './product.schema';
import { Connection, Model } from 'mongoose';
@Injectable()
export class ProductService {

    constructor(
        @InjectConnection() private connection: Connection,
        @InjectModel(Product.name) private productModel: Model<ProductDocument>
    ) {}
        
    
    async getProduct(id: string) {
        const q = await this.productModel.find({_id: id}).exec();
        console.log('Found product', q)
        
        return q[0];
        
    }

    deleteProduct(id: string) {
        throw new Error('Method not implemented.');
    }

    updateProduct(req: any) {
        throw new Error('Method not implemented.');
    }

    async createProduct(createdProductDto: any) {

        console.log('Create product: ', createdProductDto);
        

        const createdProduct = await this.productModel.create(createdProductDto);

        console.log('Created product: ', createdProduct);

        return createdProduct;
    }

    async getProductList(ownerId: string) {
        
        const q = await this.productModel.find({owner: ownerId}).exec();

        console.log('Get Product List from ' + ownerId + ': ', q);
        

        return q;
    }

    async getAllProductList() {
        const q = await this.productModel.find().exec();
        
        console.log('Get All Product List: ', q);

        return q;
    }


}
