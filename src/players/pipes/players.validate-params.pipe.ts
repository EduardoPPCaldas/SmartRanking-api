import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";

export class PlayersValidateParamsPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        if(!value) {
            throw new BadRequestException(`Value of param ${metadata.data} must not be empty`);
        }

        return value;
    }

}