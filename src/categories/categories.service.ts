import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Player } from 'src/players/interfaces/players.interface';
import { PlayersService } from 'src/players/players.service';
import { CreateCategoryDto } from './dtos/createCategoryDto';
import { UpdateCategoryDto } from './dtos/updateCategoryDto';
import { Category } from './interfaces/category.interface';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectModel("Category") private readonly categoryModel: Model<Category>,
        private readonly playerService: PlayersService
        ) {}

    async createCategory(categoryDto: CreateCategoryDto): Promise<Category> {
        const { category } = categoryDto;
        
        const foundCategory =  await this.categoryModel.findOne({ category }).exec();

        if(foundCategory) {
            throw new BadRequestException(`There is already a category with ${category} name`);
        }
        return await new this.categoryModel(categoryDto).save();
    }

    async getCategories(): Promise<Category[]> {
        return await this.categoryModel.find().populate("players").exec();
    }

    async getCategoryByCategoryName(category: string): Promise<Category> {
        const foundCategory = await this.categoryModel.findOne({ category }).exec();
        if(!foundCategory) {
            throw new NotFoundException(`Not found any category with ${category} name`);
        }

        return foundCategory;
    }

    async updateCategory(categoryDto: UpdateCategoryDto, category: string): Promise<Category>{
        const foundCategory = await this.categoryModel.findOne({ category }).exec();
        if(!foundCategory) {
            throw new NotFoundException();
        }

        return await this.categoryModel.findOneAndUpdate({ category } , {$set: categoryDto}).exec();
    }

    async addPlayerToCategory(category: string, playerId: string): Promise<void> {
        const foundCategory = await this.categoryModel.findOne({ category }).exec();
        const playerInCategory = await this.categoryModel.find({ category }).where("players").in([ playerId ]).exec()
        const foundPlayer = await this.playerService.getPlayerById(playerId);

        if(!foundCategory){
            throw new NotFoundException("Category not found");
        }

        if(!foundPlayer){
            throw new NotFoundException("Player not found");
        }

        if(playerInCategory.length > 0)
        {
            throw new BadRequestException("Player already in category");
        }

        foundCategory.players.push(foundPlayer);
        await this.categoryModel.findOneAndUpdate({ category }, { $set: foundCategory }).exec()
    }
}
