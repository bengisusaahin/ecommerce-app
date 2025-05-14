import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class CapitalizeNamePipe implements PipeTransform {
    transform(value: any): any {
        if (value.name && typeof value.name === 'string') {
            const capitalized = value.name
                .split(' ')
                .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                .join(' ');
            return { ...value, name: capitalized };
        }
        return value;
    }
}