import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { Player } from './interfaces/players.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PlayersService {
    private readonly logger = new Logger();

    constructor(@InjectModel("Player") private readonly playerModel: Model<Player>) {}

    async createUpdatePlayer(playerDto: CreatePlayerDto): Promise<void> {
        const { email } = playerDto;

        const playerFound = await this.playerModel.findOne({ email }).exec();

        if(playerFound) {
            this.update(playerDto);
        }
        else {
            this.create(playerDto);
        }
    }

    async getPlayers(): Promise<Player[]> {
        this.logger.log("Getting players");
        return await this.playerModel.find().exec();
    }

    async getPlayerByEmail(email: string): Promise<Player>{
        this.logger.log("Getting player")
        const player = this.playerModel.findOne({ email }).exec();
        if(!player) {
            this.logger.error("Player not found")
            throw new NotFoundException(`Player with email ${email} not found`);
        }
        return player;
    }

    async deletePlayerByEmail(email: string): Promise<void> {
        this.logger.log("Deleting player");
        return await this.playerModel.remove({ email }).exec();
    }

    private async create(playerDto: CreatePlayerDto): Promise<Player> {
        const createdPlayer = new this.playerModel(playerDto);
        this.logger.log("Creating player");
        return await createdPlayer.save();
    }

    private async update(playerDto: CreatePlayerDto): Promise<Player> {
        this.logger.log("Updating player");
        return await this.playerModel.findOneAndUpdate({ email: playerDto.email }, {$set: playerDto}).exec();
    }
}
