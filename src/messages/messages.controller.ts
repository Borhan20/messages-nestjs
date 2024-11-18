import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {

    constructor(public messagesService: MessagesService){}

    // @Get()
    // listMessages(){
    //     return this.messagesService.findAll();
    // }

    // @Post()
    // createMessage(@Body() body: CreateMessageDto){
    //     console.log(body);
    //     return this.messagesService.create(body.content)
    // }

    // @Get('/:id')
    // getMessage(@Param('id') id: string){
    //     console.log(id);
    //     return this.messagesService.findOne(id);
    // }
}
