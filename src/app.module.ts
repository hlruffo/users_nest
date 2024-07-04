import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', /* tipo de banco de dados */
      host: 'localhost', /* servidor do banco de dados */
      port: 5432, /* porta do servidor */
      username: 'postgres', /* usuario do banco de dados */
      password: '5t4r_W4r5', /* senha do usuario */
      database: 'bd_usuariosapi', /* nome do banco de dados */
      autoLoadEntities: true, /* mapear as entidades do projeto */
      synchronize: true, /* atualizar o banco de dados */
      logging: true /* exibir o log da execução no banco */

    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
