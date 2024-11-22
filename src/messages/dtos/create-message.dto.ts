import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, isNumber, IsString } from "class-validator";

export class CreateMessageDto{

    @ApiProperty()
    @IsString()
    content: string;

}