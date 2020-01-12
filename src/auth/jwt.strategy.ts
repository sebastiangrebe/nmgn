import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Req } from '@nestjs/common';
import { RequestType } from '../../types/request.type';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly configService: ConfigService) {
        super({
            jwtFromRequest: fromRequestCookieOrHeader(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET'),
        });
    }

    async validate(payload: any) {
        return { _id: payload.sub, username: payload.username };
    }
}

function fromRequestCookieOrHeader() {
    const fromHeader = ExtractJwt.fromAuthHeaderAsBearerToken();
    return function (request: RequestType) {

        let token = fromHeader(request);
        if(!token) {
            token = request.cookies.jwt;
        }
        return token;
    };
}