import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { Player } from './interfaces/players.interface';
import { v4 as uuidv4 } from "uuid" 

@Injectable()
export class PlayersService {
    private players: Player[] = [];

    private readonly logger = new Logger(PlayersService.name);

    async createUpdatePlayer(playerDto: CreatePlayerDto): Promise<void> {
        const { email } = playerDto;

        const playerFound = this.players.find(player => player.email === email);

        if(playerFound) {
            this.update(playerFound, playerDto);
        }
        else {
            this.create(playerDto);
        }
    }

    async getPlayers(): Promise<Player[]> {
        return this.players;
    }

    async getPlayerByEmail(email: string): Promise<Player>{
        const player = this.players.find(player => player.email === email);
        if(!player) {
            throw new NotFoundException(`Player with email ${email} not found`);
        }
        return player;
    }

    async deletePlayerByEmail(email: string): Promise<void> {
        const playerFound = this.players.find(player => player.email === email);
        if(!playerFound) {
            throw new NotFoundException(`Player with email ${email} not found`);
        }
        this.players = this.players.filter(player => player !== playerFound);
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

    private update(playerFound: Player, playerDto: CreatePlayerDto) {
        playerFound.name = playerDto.name;
    }
}
