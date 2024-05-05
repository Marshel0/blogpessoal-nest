import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Usuario } from "../../usuario/entities/usuario.entity";
import { Tema } from "../../tema/entities/tema.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({name: "tb_postagem"})
export class Postagem{

    @ApiProperty()
    @PrimaryGeneratedColumn() //Chave primaria e auto_increment
    id: number;

    @ApiProperty()
    @Transform(({value}: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({length: 100, nullable: false})
    titulo: string;

    @ApiProperty()
    @Transform(({value}: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({length: 1000, nullable: false})
    texto: string;

    @ApiProperty()
    @UpdateDateColumn()
    data: Date;

    @ApiProperty()
    @ManyToOne(() => Tema, (tema) => tema.postagem, {
        onDelete: "CASCADE"
    })
    tema: Tema
    
    @ApiProperty()
    @ManyToOne(() => Usuario, (usuario) => usuario.postagem, {
        onDelete: "CASCADE"
    })
    usuario: Usuario

}