import { Body, Controller, Post } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';

@Controller('api/v1/players')
export class PlayersController {
    
    @Post()
    async createUpdatePlayer(@Body() playerDto: CreatePlayerDto) {
        const { email } = playerDto;
        return JSON.stringify({
            "nome": email
        })
    }
}
