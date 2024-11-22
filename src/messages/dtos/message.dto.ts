import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class MessageDto{

    @Expose()
    @ApiProperty()
    id: number

    @Expose()
    @ApiProperty()
    content: string;

    @Expose()
    @ApiProperty()
    user: number

    @Expose()
    @ApiProperty()
    friend: number

}