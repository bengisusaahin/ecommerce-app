import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable, timestamp } from "rxjs";

@Injectable()
export class TransformResponseInterceptor<T> 
    implements NestInterceptor<T, any> 
{
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map((data) => ({
                success: true,
                timestamp: new Date().toISOString(),
                data,
            })),
        );
    }
}