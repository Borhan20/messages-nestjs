import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { CreateMessageDto } from '../dtos/create-message.dto'; 
import { MessagesServiceImpl } from '../service/impl/messages.service.impl';
import { Serialize } from '../../interceptors/serialize.interceptors';
import { MessageDto } from '../dtos/message.dto';
import { CurrentUser } from '../../users/decorators/current-user.decorator';
import { User } from '../../users/entity/user.entity';
import { AuthGuard } from '../../guards/auth.guard';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { MessageListDto } from '../dtos/message-list.dto';

@Controller('api/private/v1/friends/:friendId')
@UseGuards(AuthGuard)
export class MessagesController {

    constructor(public messagesService: MessagesServiceImpl){}

    @Get('/messages')
    @ApiOkResponse({ type: MessageListDto })
    @Serialize(MessageListDto)
    async listMessages(@Param('friendId') friendId:number, @CurrentUser() user: User){
        return await this.messagesService.findAll(friendId, user);
       
    }

    @Post('/messages')
    @ApiOkResponse({ type: MessageDto })
    @Serialize(MessageDto)
    async createMessage(
        @Param('friendId')friendId:number, 
        @Body() body: CreateMessageDto,
        @CurrentUser() user: User
    ){

        return this.messagesService.create(friendId,body, user)
    }

    @Get('messages/:id')
    @ApiOkResponse({ type: MessageDto })
    @Serialize(MessageDto)
    async getMessage(
        @Param('friendId') friendId: number, 
        @Param('id') id: number,
        @CurrentUser() user: User
    ){
        console.log(id);
        return this.messagesService.findOne(id, user, friendId);
    }
}
