import { Injectable, Logger } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { Player } from './interfaces/players.interface';
import { v4 as uuidv4 } from "uuid" 

@Injectable()
export class PlayersService {
    private players: Player[] = [];

    private readonly logger = new Logger(PlayersService.name);

    async createUpdatePlayer(playerDto: CreatePlayerDto): Promise<void> {
        this.create(playerDto);
    }

    private create(playerDto: CreatePlayerDto): void {
        const { name, email, phoneNumber } = playerDto;

        const player: Player = {
            _id: uuidv4(),
            name,
            email,
            phoneNumber,
            ranking: "A",
            rankingPosition: 1,
            urlPlayerPhoto: "www.google.com.br/foto123.jpg"
        }
        this.logger.log(`createPlayer: ${JSON.stringify(player)}`);
        this.players.push(player);
    }

    async getPlayers(): Promise<Player[]> {
        return await this.players;
    }
}
