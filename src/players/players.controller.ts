import { Body, Controller, Get, Post } from '@nestjs/common';
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
    async getPlayers(): Promise<Player[]>{
        return this.playersService.getPlayers();
    }
}
