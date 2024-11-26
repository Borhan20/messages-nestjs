import { DynamicModule, Provider } from "@nestjs/common";
import { getDataSourceToken } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { TYPEORM_EX_CUSTOM_REPOSITORY } from "./typeorm-ex.decorators";

export class TypeOrmExModule {
  public static forCustomRepository<T extends new (...args: any[]) => any>(
    repositories: T[],
  ): DynamicModule {
    const providers: Provider[] = repositories.map((repository) => {
      const entity = Reflect.getMetadata(TYPEORM_EX_CUSTOM_REPOSITORY, repository);

      if (!entity) {
        throw new Error(
          `Entity is not defined for custom repository: ${repository.name}`,
        );
      }

      return {
        inject: [getDataSourceToken()],
        provide: repository,
        useFactory: (dataSource: DataSource) => {
          const baseRepository = dataSource.getRepository(entity);
          return new repository(
            baseRepository.target,
            baseRepository.manager,
            baseRepository.queryRunner,
          );
        },
      };
    });

    return {
      exports: providers,
      module: TypeOrmExModule,
      providers,
    };
  }

}