import{
    UseInterceptors,
    NestInterceptor,
    ExecutionContext,
    CallHandler
} from '@nestjs/common'

import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { plainToClass } from 'class-transformer'

interface ClassConstructor{
    new (...args: any[]):{}
}

export function Serialize(dto: ClassConstructor){
    return UseInterceptors(new SerializeInterceptor(dto))
}

export class SerializeInterceptor implements NestInterceptor{

    constructor(private dto: any){}

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
       // Run something before a request is handled by request handler
       console.log("I'm running before the handler: ", context)
       return next.handle().pipe(
            map((data: any) => {
                //Run something before the response is sent
                return plainToClass(this.dto, data, {
                    excludeExtraneousValues: true
                })
            })
       )
    }

}