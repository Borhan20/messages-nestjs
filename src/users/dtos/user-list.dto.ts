
import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { UserDto } from "./user.dto";

export class UserListDto{

    @Expose()
    @ApiProperty({type: [UserDto]})
    @Type(()=>UserDto)
    users: UserDto[]

}