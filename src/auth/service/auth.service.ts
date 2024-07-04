import { Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { AuthRequestDto } from '../dtos/auth-request.dto';
import { AuthResponseDto } from '../dtos/auth-response.dto';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { UsuarioEntity } from '../entities/usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as crypto from 'crypto';
import { UsuarioRequestDto } from '../dtos/usuario-request.dto';
import { UsuarioResponseDto } from '../dtos/usuario-response.dto';


@Injectable()
export class AuthService {


  //construtor
  constructor(
    @InjectRepository(UsuarioEntity)
    private usuarioRepository: Repository<UsuarioEntity>,
    private jwtService: JwtService
    ) {}


  //método para criar um usuário
  async criarUsuario(request: UsuarioRequestDto): Promise<UsuarioResponseDto> {


    //verificar se o email informado já está cadastrado
    if(await this.usuarioRepository.findOne({ where: { email : request.email } })) {
      throw new UnprocessableEntityException('O email já está cadastrado, tente outro.');
    }


    //criando um objeto usuário (entidade)
    const usuario = this.usuarioRepository.create({
      nome: request.nome,
      email: request.email,
      senha: this.encrypt(request.senha)
    });


    //salvar no banco de dados
    const result = await this.usuarioRepository.save(usuario);


    //retornando os dados do usuário criado
    const response = new UsuarioResponseDto();
        response.id = result.id;
        response.nome = result.nome;
        response.email = result.email;
        response.dataHoraCadastro = new Date();


    return response;
  }


  //método para realizar a autenticação do usuário
  async autenticarUsuario(request: AuthRequestDto): Promise<AuthResponseDto> {


    //buscar o usuário no banco de dados através do email e da senha
    const usuario = await this.usuarioRepository.findOne({
      where: { email : request.email, senha : this.encrypt(request.senha) }
    });


    if (usuario != null) {
        const response = new AuthResponseDto();
        response.id = usuario.id;
        response.nome = usuario.nome;
        response.email = usuario.email;
        response.accessToken = this.generateToken(usuario.email);
        response.dataHoraAcesso = new Date();


        return response;
    } else {
      throw new UnauthorizedException('Acesso negado. Usuário inválido.');
    }
  }


  encrypt(value: string): string {
    const sha1 = crypto.createHash('sha1');
    sha1.update(value);
    return sha1.digest('hex');
  }


  generateToken(emailUsuario: string) {
    return this.jwtService.sign(
      {
        email: emailUsuario,
      },
      {
        secret: '31b5602d-ab0f-49bb-a562-3bedae8f55cf',
        issuer: 'cotiinformatica',
        expiresIn: '15m'
      },
    );
  }
}




