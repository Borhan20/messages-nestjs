
import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";

export class UserDto{

    @Expose()
    @ApiProperty()
    id: number

    @Expose()
    @ApiProperty()
    email: string;

}