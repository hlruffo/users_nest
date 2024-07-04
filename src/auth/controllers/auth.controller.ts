import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthService } from '../service/auth.service'; 
import { AuthRequestDto } from '../dtos/auth-request.dto';
import { AuthResponseDto } from '../dtos/auth-response.dto';
import { UsuarioRequestDto } from '../dtos/usuario-request.dto';
import { UsuarioResponseDto } from '../dtos/usuario-response.dto';


@Controller('api/user')
export class AuthController {


  //construtor (injeção de dependência)
  constructor(
    private authService: AuthService
  ) {
  }

  @Post("auth")
  async auth(@Body(new ValidationPipe()) request: AuthRequestDto): Promise<AuthResponseDto> {
    return await this.authService.autenticarUsuario(request);
  }


  @Post("create")
  async create(@Body(new ValidationPipe()) request: UsuarioRequestDto): Promise<UsuarioResponseDto> {
    return await this.authService.criarUsuario(request);
  }
}




