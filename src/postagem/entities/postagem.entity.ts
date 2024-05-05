import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Usuario } from "../../usuario/entities/usuario.entity";
import { Tema } from "../../tema/entities/tema.entity";

@Entity({name: "tb_postagem"})
export class Postagem{

    @PrimaryGeneratedColumn() //Chave primaria e auto_increment
    id: number;

    @Transform(({value}: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({length: 100, nullable: false})
    titulo: string;

    @Transform(({value}: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({length: 1000, nullable: false})
    texto: string;

    @UpdateDateColumn()
    data: Date;

    @ManyToOne(() => Tema, (tema) => tema.postagem, {
        onDelete: "CASCADE"
    })
    tema: Tema
    
    @ManyToOne(() => Usuario, (usuario) => usuario.postagem, {
        onDelete: "CASCADE"
    })
    usuario: Usuario

}