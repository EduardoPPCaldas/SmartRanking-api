import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { Player } from './interfaces/players.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdatePlayerDto } from './dtos/update-player.dto';

@Injectable()
export class PlayersService {
    private readonly logger = new Logger();

    constructor(@InjectModel("Player") private readonly playerModel: Model<Player>) {}

    async createPlayer(playerDto: CreatePlayerDto): Promise<Player> {
        const { email } = playerDto;

        const playerFound = await this.playerModel.findOne({ email }).exec();

        if(playerFound) {
            throw new BadRequestException(`The email ${email} it's already used`)
        }

        const createdPlayer = new this.playerModel(playerDto);
        this.logger.log("Creating player");
        return await createdPlayer.save();
    }

    async updatePlayer(_id: string, playerDto: UpdatePlayerDto): Promise<void> {
        const playerFound = await this.playerModel.findOne({ _id }).exec();

        if(!playerFound) {
            throw new NotFoundException(`Not found any user with id ${_id}`);
        }
        this.logger.log("Updating player");
        await this.playerModel.findOneAndUpdate({ _id }, {$set: playerDto}).exec();
    }

    async getPlayers(): Promise<Player[]> {
        this.logger.log("Getting players");
        return await this.playerModel.find().exec();
    }

    async getPlayerByEmail(email: string): Promise<Player>{
        this.logger.log("Getting player")
        const player = this.playerModel.findOne({ email }).exec();
        if(!player) {
            this.logger.error("Player not found");
            throw new NotFoundException(`Player with email ${email} not found`);
        }
        return player;
    }

    async getPlayerById(_id: string): Promise<Player>{
        this.logger.log("Getting player")
        const player = this.playerModel.findOne({ _id }).exec();
        if(!player) {
            this.logger.error("Player not found");
            throw new NotFoundException(`Player with id ${_id} not found`);
        }
        return player;
    }

    async deletePlayerById(_id: string): Promise<void> {
        const player = this.playerModel.findOne({ _id }).exec();
        if(!player) {
            this.logger.error("Player not found");
            throw new NotFoundException(`Player with id ${_id} not found`);
        }

        this.logger.log("Deleting player");
        await this.playerModel.deleteOne({ _id }).exec();
    }
}
