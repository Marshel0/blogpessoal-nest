import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Postagem } from "../entities/postagem.entity";
import { DeleteResult, ILike, Repository } from "typeorm";
import { TemaService } from "src/tema/services/tema.service";

@Injectable()
export class PostagemService{
    constructor(
        @InjectRepository(Postagem)
        private postagemRepository: Repository<Postagem>,
        private temaService: TemaService
    ){}

    async findAll(): Promise<Postagem[]>{
        return await this.postagemRepository.find({
            relations: {
                tema: true
            }
        });
    }

    async findById(id: number): Promise<Postagem> {

        let postagem = await this.postagemRepository.findOne({
            where:{
                id
            },
            relations: {
                tema: true
            }
        });

        if (!postagem) // checa se a postagem não for localizada
            throw new HttpException(
                'Postagem não localizada!', 
                HttpStatus.NOT_FOUND);
        
        return postagem; // retorna a postagem caso exista
    }

    async findByTitulo(titulo: string): Promise<Postagem[]>{
        return await this.postagemRepository.find({
            where:{
                titulo: ILike(`%${titulo}%`)
            },
            relations: {
                tema: true
            }  
        })
        // if (postagem.length == 0) {
        //     throw new HttpException(
        //       `Postagem com o 'titulo ${titulo}' não encontrada!`,
        //       HttpStatus.NOT_FOUND,
        //     )};
    }

    async create(postagem: Postagem): Promise<Postagem>{

        if (postagem.tema){

            let tema = await this.temaService.findById(postagem.tema.id)

            if(!tema)
                throw new HttpException(
            'O tema não foi localizado!', 
            HttpStatus.NOT_FOUND)

            return await  this.postagemRepository.save(postagem);
        }

        return await  this.postagemRepository.save(postagem);
    }

    async update(postagem: Postagem): Promise<Postagem>{
        
        let buscaPostagem: Postagem = await this.findById(postagem.id);
        
        if (!buscaPostagem || !postagem.id)
            throw new HttpException('Postagem não foi localizada!', HttpStatus.NOT_FOUND)
        
        if (postagem.tema){

            let tema = await this.temaService.findById(postagem.tema.id)

            if(!tema)
                throw new HttpException(
            'O tema não foi localizado!', 
            HttpStatus.NOT_FOUND)

            return await  this.postagemRepository.save(postagem);
        }
        
        return await  this.postagemRepository.save(postagem);
    }

    async delete(id: number): Promise<DeleteResult>{

        let buscaPostagem: Postagem = await this.findById(id);
        
        if (!buscaPostagem)
            throw new HttpException(
        'Postagem não foi localizada!', 
        HttpStatus.NOT_FOUND)

        return await this.postagemRepository.delete(id);
    }
}