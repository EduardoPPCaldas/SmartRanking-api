import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayersModule } from './players/players.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://root:root@localhost:27017/admin',
    { useNewUrlParser: true, useUnifiedTopology: true}),  
    PlayersModule, CategoriesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
