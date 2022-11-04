import { Body, Controller, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dtos/createCategoryDto';
import { UpdateCategoryDto } from './dtos/updateCategoryDto';
import { Category } from './interfaces/category.interface';

@Controller('api/v1/categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}

    @Post()
    @UsePipes(ValidationPipe)
    async createCategory(@Body() categoryDto: CreateCategoryDto): Promise<Category>{
        return await this.categoriesService.createCategory(categoryDto);
    }

    @Get()
    async getCategories(): Promise<Category[]> {
        return await this.categoriesService.getCategories();
    }

    @Get("/:category")
    async getCategoryByCategoryName(@Param("category") category: string): Promise<Category> {
        return await this.categoriesService.getCategoryByCategoryName(category);
    }

    @Put("/:category")
    @UsePipes(ValidationPipe)
    async updateCategory(
        @Body() categoryDto: UpdateCategoryDto,
        @Param("category") category: string): Promise<Category> {
        return await this.categoriesService.updateCategory(categoryDto, category);
    }

    @Post("/:category/players/:playerId")
    async addPlayerToCategory(
        @Param("category") category: string,
        @Param("playerId") playerId: string 
    ): Promise<void> {
       return await this.categoriesService.addPlayerToCategory(category, playerId); 
    }
}
