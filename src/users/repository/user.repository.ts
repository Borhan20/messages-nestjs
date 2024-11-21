import { DeepPartial, DeleteResult, EntityManager, EntityMetadata, EntityTarget, FindManyOptions, FindOneOptions, FindOptionsWhere, InsertResult, ObjectId, QueryRunner, RemoveOptions, Repository, SaveOptions, SelectQueryBuilder, UpdateResult } from "typeorm";
import { User } from "../entity/user.entity";
import { UpsertOptions } from "typeorm/repository/UpsertOptions";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserRepository extends Repository<User>{
    

}