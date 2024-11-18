import { Injectable } from "@nestjs/common";
import { NotFoundException } from "@nestjs/common";
// import { MessagesRepository } from "./messages.repository";

@Injectable()
export class MessagesService{
    
   // constructor(public messagesRepo: MessagesRepository){}

    // async findOne(id: string){
    //     const message = await this.messagesRepo.findOne(id);
    //     console.log(message)
    //     if (!message){
    //         throw new NotFoundException('message not found');
    //     }
    //     return message
    // }

    // async findAll(){
    //     return this.messagesRepo.findAll();
    // }

    // async create(content: string){
    //     this.messagesRepo.create(content);
    // }
} 