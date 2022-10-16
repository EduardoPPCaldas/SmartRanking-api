import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dtos/create-category.dto';
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
}
