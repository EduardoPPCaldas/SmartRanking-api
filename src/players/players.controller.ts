import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { UpdatePlayerDto } from './dtos/update-player.dto';
import { Player } from './interfaces/players.interface';
import { PlayersValidateParamsPipe } from './pipes/players.validate-params.pipe';
import { PlayersService } from './players.service';

@Controller('api/v1/players')
export class PlayersController {
    constructor(private readonly playersService: PlayersService) {}
    
    @Post()
    @UsePipes(ValidationPipe)
    async createUpdatePlayer(@Body() playerDto: CreatePlayerDto): Promise<Player> {
        return await this.playersService.createPlayer(playerDto);
    }

    @Put("/:_id")
    @UsePipes(ValidationPipe)
    async updatePlayer(@Body() playerDto: UpdatePlayerDto,
        @Param("_id", PlayersValidateParamsPipe) _id: string): Promise<void> {
        await this.playersService.updatePlayer(_id, playerDto);
    }

    @Get()
    async getPlayers(): Promise<Player[]>{
        return this.playersService.getPlayers();
    }

    @Get("/:_id")
    async getPlayerById(@Param("_id", PlayersValidateParamsPipe) _id: string): Promise<Player>{
        return await this.playersService.getPlayerById(_id);
    }

    @Delete("/:_id")
    async deletePlayer(@Param("_id", PlayersValidateParamsPipe) _id: string): Promise<void> {
        this.playersService.deletePlayerById(_id);
    }
}
