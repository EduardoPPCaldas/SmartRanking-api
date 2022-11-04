import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayerSchema } from 'src/players/interfaces/players.schema';
import { PlayersModule } from 'src/players/players.module';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { CategorySchema } from './interfaces/category.schema';

@Module({
  imports:[
    MongooseModule.forFeature([{ name: "Category", schema: CategorySchema }]),
    PlayersModule
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService]
})
export class CategoriesModule {}
