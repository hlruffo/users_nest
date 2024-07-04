import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';


@Entity({
  name: 'usuario',
})
export class UsuarioEntity {
   
  @PrimaryGeneratedColumn({
    name: 'id',
  })
  id: number;


  @Column({
    name: 'nome',
    length: 100,
    nullable: false,
  })
  nome: string;


  @Column({
    name: 'email',
    length: 50,
    nullable: false,
    unique: true,
  })
  email: string;


  @Column({
    name: 'senha',
    length: 40,
    nullable: false,
  })
  senha: string;
}




