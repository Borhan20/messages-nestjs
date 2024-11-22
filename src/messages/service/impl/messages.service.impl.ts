import { ForbiddenException, Injectable } from "@nestjs/common";
import { NotFoundException } from "@nestjs/common";
import { CreateMessageDto } from "src/messages/dtos/create-message.dto";
import { MessagesRepository } from "src/messages/repository/messages.repository";
import { UserDto } from "src/users/dtos/user.dto";
import { MessagesService } from "../messages.service";
import { Message } from "src/messages/entity/messages.entity";



@Injectable()
export class MessagesServiceImpl implements MessagesService{
    
   constructor(private messagesRepo: MessagesRepository){}

    async findOne(id: number, user:UserDto, freindId:number){
        const message = await this.messagesRepo.findOne({where:{id}});
        // console.log(message)
        if (!message){
            throw new NotFoundException('message not found');
        }
        this.validation_find_one(message, user, freindId)
        return message
    }

    async findAll(friendId:number, user:UserDto){

        const messages_rep = await this.messagesRepo.findByUserFriend(user.id,friendId)
  
        return {
            messages: messages_rep
        }
         

    }

    async create(friendId:number, body:CreateMessageDto, user:UserDto){
        // console.log({body, friendId: Number(friendId), user})
        const message = this.messagesRepo.create({
            content: body.content, 
            user: user.id, 
            friend:Number(friendId)
        });
        // console.log(message)
        return await this.messagesRepo.save(message)
    }

    validation_find_one(message:Message, user:UserDto, friendId:number){
        if(message.user != user.id || message.friend != friendId){
            throw new ForbiddenException("you are forbidden for this request")
        }
    }
} 