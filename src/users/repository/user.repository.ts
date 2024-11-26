import {
  DataSource,
  DeepPartial,
  DeleteResult,
  EntityManager,
  EntityMetadata,
  EntityTarget,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  InsertResult,
  ObjectId,
  QueryRunner,
  RemoveOptions,
  Repository,
  SaveOptions,
  SelectQueryBuilder,
  UpdateResult ,
} from "typeorm";
import { User } from "../entity/user.entity";
import { Injectable } from "@nestjs/common";
import { CustomRepository } from "src/database/typeorm-ex.decorators";

@Injectable()
// @CustomRepository(User)
export class UserRepository extends Repository<User>{
    constructor(private dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
      }

}