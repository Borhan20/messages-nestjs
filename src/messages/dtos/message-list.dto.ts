import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { MessageDto } from "./message.dto";

export class MessageListDto{

    @Expose()
    @ApiProperty({ type: [MessageDto] })
    @Type(()=>MessageDto)
    messages: MessageDto[];


}