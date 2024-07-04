import { IsString, IsEmail, Length, Matches } from 'class-validator';


export class UsuarioRequestDto {
   
  @Length(8, 100, {
    message: 'O nome deve ter de 8 a 100 caracteres.',
  })
  @IsString({
    message: 'O nome deve ser do tipo texto.',
  })
  nome: string;


  @IsEmail(
    {},
    {
      message: 'Informe um endereço de email válido.',
    },
  )
  @IsString({
    message: 'O email deve ser do tipo texto.',
  })
  email: string;


  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message:
        'A senha deve ter letras maiúsculas, letras minúsculas, números, símbolos e pelo menos 8 caracteres.',
    },
  )
  @IsString({
    message: 'A senha deve ser do tipo texto.',
  })
  senha: string;
}




