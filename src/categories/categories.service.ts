import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { Category } from './interfaces/category.interface';

@Injectable()
export class CategoriesService {
    constructor(@InjectModel("Category") private readonly categoryModel: Model<Category>) {}

    async createCategory(categoryDto: CreateCategoryDto): Promise<Category> {
        const { category } = categoryDto;
        
        const foundCategory =  await this.categoryModel.findOne({ category }).exec();

        if(foundCategory) {
            throw new BadRequestException(`There is already a category with ${category} name`);
        }
        return await new this.categoryModel(categoryDto).save();
    }

    async getCategories(): Promise<Category[]> {
        return await this.categoryModel.find().exec();
    }

    async getCategoryByCategoryName(category: string): Promise<Category> {
        const foundCategory = await this.categoryModel.findOne({ category }).exec();
        if(!foundCategory) {
            throw new NotFoundException(`Not found any category with ${category} name`);
        }

        return foundCategory;
    }
}
