import { Injectable } from "@nestjs/common";
import { NotFoundException } from "@nestjs/common";
import { UserDto } from "src/users/dtos/user.dto";
import { CreateMessageDto } from "../dtos/create-message.dto";



export interface MessagesService{
    
    findOne(id: number, user:UserDto, freindId:number)
    findAll(friendId:number, user:UserDto)
    create(friendId:number, body:CreateMessageDto, user:UserDto)

} 