import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { Player } from './interfaces/players.interface';
import { PlayersService } from './players.service';

@Controller('api/v1/players')
export class PlayersController {
    constructor(private readonly playersService: PlayersService) {}
    
    @Post()
    async createUpdatePlayer(@Body() playerDto: CreatePlayerDto) {
        await this.playersService.createUpdatePlayer(playerDto);
    }

    @Get()
    async getPlayers(@Query("email") email: string): Promise<Player[] | Player>{
        if(email) {
            return await this.playersService.getPlayerByEmail(email);
        }
        return this.playersService.getPlayers();
    }

    @Delete()
    async deletePlayer(@Query("email") email: string): Promise<void> {
        this.playersService.deletePlayerByEmail(email);
    }
}
