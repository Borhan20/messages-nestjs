import{
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    Injectable
} from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { Observable } from 'rxjs';
import { UsersServiceImpl } from '../service/impl/user.service.impl';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor{
    
    constructor(private usersService: UsersServiceImpl){}

    async intercept(context: ExecutionContext, next: CallHandler<any>){
       const request = context.switchToHttp().getRequest();
       const {userId} = request.session;
       if(userId){
            const user = await this.usersService.getUser(userId);
            request.currentUser = user;
       }
       return next.handle();
    }

    

}