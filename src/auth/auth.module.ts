import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from '../auth/service/auth.service';
import { PassportModule} from '@nestjs/passport'
import { UsuarioEntity } from './entities/usuario.entity';




@Module({
  imports: [    
    PassportModule,
    JwtModule,
    TypeOrmModule.forFeature([
      UsuarioEntity
    ])
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}