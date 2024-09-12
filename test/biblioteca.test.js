const Biblioteca = require('../src/biblioteca');

describe('Biblioteca', () => {
    let biblioteca;
    let livroPadrao = { id: 1, titulo: 'Livro 1', autor: 'Autor 1', genero: 'Gênero 1', ano: 2021, emprestado: false };
    let membroPadrao = { id: 1 };

    beforeEach(() => {
        biblioteca = new Biblioteca();
        biblioteca.adicionarLivro(livroPadrao);
        biblioteca.adicionarMembro(membroPadrao);
    });

    test('deve adicionar um livro', () => {
        const livro = { id: 2, titulo: 'Livro 2', autor: 'Autor 1', genero: 'Gênero 1', ano: 2001 };
        biblioteca.adicionarLivro(livro);
        expect(biblioteca.listarLivros()).toHaveLength(2);
        expect(biblioteca.buscarLivroPorId(2)).toEqual(livro);
    });

    test('deve remover um livro', () => {
        const livro = { id: 2, titulo: 'Livro 2', autor: 'Autor 1', genero: 'Gênero 1', ano: 2001 };
        biblioteca.adicionarLivro(livro);
        biblioteca.removerLivro(1);
        expect(biblioteca.buscarLivroPorId(1)).toBeUndefined();
        expect(biblioteca.listarLivros()).toHaveLength(1);
    });

    test('deve buscar livro por título', () => {
        const livro = { id: 2, titulo: 'Livro 2', autor: 'Autor 1', genero: 'Gênero 1', ano: 2001 };
        biblioteca.adicionarLivro(livro);
        expect(biblioteca.buscarLivroPorTitulo('Livro 1')).toEqual([livroPadrao]);
        expect(biblioteca.buscarLivroPorTitulo('Livro 2')).toEqual([livro]);
        expect(biblioteca.buscarLivroPorTitulo('Livro 3')).toEqual([]);
    });

    test('deve listar livros emprestados e disponíveis', () => {
        const livro = { id: 2, titulo: 'Livro 2', autor: 'Autor 1', genero: 'Gênero 1', ano: 2021, emprestado: true };
        biblioteca.adicionarLivro(livro);
        expect(biblioteca.listarLivrosEmprestados()).toEqual([livro]);
        expect(biblioteca.listarLivrosDisponiveis()).toEqual([livroPadrao]);
    });

    test('deve emprestar e devolver um livro', () => {
        const livro = { id: 2, titulo: 'Livro 2', autor: 'Autor 1', genero: 'Gênero 1', ano: 2021 };
        biblioteca.adicionarLivro(livro);
        expect(biblioteca.emprestarLivro(livro.id, membroPadrao.id)).toBe(true);
        expect(biblioteca.listarLivrosEmprestados()).toHaveLength(1);
        expect(biblioteca.buscarLivroPorId(livro.id).emprestado).toBe(true);

        expect(biblioteca.devolverLivro(livro.id)).toBe(true);
        expect(biblioteca.buscarLivroPorId(livro.id).emprestado).toBe(false);
    });

    test('não deve emprestar livro já emprestado', () => {
        const livro = { id: 2, titulo: 'Livro 2', autor: 'Autor 1', genero: 'Gênero 1', ano: 2021 };
        const membro = { id: 2, nome: 'Membro 2' };
        biblioteca.adicionarLivro(livro);
        biblioteca.adicionarMembro(membro);

        expect(biblioteca.emprestarLivro(livro.id, membro.id)).toBe(true);
        expect(biblioteca.emprestarLivro(livro.id, membroPadrao.id)).toBe(false);
    });

    test('não deve devolver livro que não está emprestado', () => {
        expect(biblioteca.devolverLivro(livroPadrao.id, membroPadrao.id)).toBe(false);
        expect(biblioteca.listarLivrosEmprestados()).toHaveLength(0);
        expect(biblioteca.buscarLivroPorId(livroPadrao.id).emprestado).toBe(false);
    });

    test('deve atualizar as informações de um livro', () => {
        biblioteca.atualizarInformacaoLivro(livroPadrao.id, {
            titulo: 'Livro Atualizado',
            ano: 2025
        });
        expect(biblioteca.buscarLivroPorId(livroPadrao.id)).toEqual({
            id: livroPadrao.id,
            titulo: 'Livro Atualizado',
            autor: 'Autor 1',
            genero: 'Gênero 1',
            ano: 2025,
            emprestado: false
        });
    });

    test('deve listar livros por autor', () => {
        const livro1 = { id: 2, titulo: 'Clean code', autor: 'Robert Cecil Martin', genero: 'Gênero 1', ano: 2021 };
        const livro2 = { id: 3, titulo: 'Livro 2', autor: 'Robert Cecil Martin', genero: 'Gênero 2', ano: 2022 };
        biblioteca.adicionarLivro(livro1);
        biblioteca.adicionarLivro(livro2);

        const livrosDoAutor = biblioteca.listarLivrosPorAutor('Robert Cecil Martin');
        expect(livrosDoAutor).toContainEqual(livro1);
        expect(livrosDoAutor).toContainEqual(livro2);
    });

    test('deve listar livros por gênero', () => {
        const livro1 = { id: 2, titulo: 'Livro 1', autor: 'Autor 1', genero: 'XGH Certified', ano: 2025 };
        const livro2 = { id: 3, titulo: 'Livro 2', autor: 'Autor 2', genero: 'XGH Certified', ano: 2025 };
        biblioteca.adicionarLivro(livro1);
        biblioteca.adicionarLivro(livro2);
        const livrosDoGenero = biblioteca.listarLivrosPorGenero('XGH Certified');
        expect(livrosDoGenero).toContainEqual(livro1);
        expect(livrosDoGenero).toContainEqual(livro2);
    });

    test('deve listar livros por ano', () => {
        const livro1 = { id: 2, titulo: 'Livro 1', autor: 'Autor 1', genero: 'Gênero 1', ano: 2025 };
        const livro2 = { id: 3, titulo: 'Livro 2', autor: 'Autor 2', genero: 'Gênero 2', ano: 2025 };
        const livro3 = { id: 4, titulo: 'Livro 2', autor: 'Autor 2', genero: 'Gênero 2', ano: 2024 };
        biblioteca.adicionarLivro(livro1);
        biblioteca.adicionarLivro(livro2);
        biblioteca.adicionarLivro(livro3);

        const livros2025 = biblioteca.listarLivrosPorAno(2025);
        expect(livros2025).toContainEqual(livro1);
        expect(livros2025).toContainEqual(livro2);
        expect(biblioteca.listarLivrosPorAno(2024)).toEqual([livro3]);
    });

    test('deve contar livros corretamente', () => {
        const livro1 = { id: 2, titulo: 'Livro 1', autor: 'Autor 1', genero: 'Gênero 1', ano: 2025 };
        const livro2 = { id: 3, titulo: 'Livro 2', autor: 'Autor 2', genero: 'Gênero 2', ano: 2025 };
        biblioteca.adicionarLivro(livro1);
        biblioteca.adicionarLivro(livro2);

        expect(biblioteca.contarLivros()).toEqual(3);
    });

    test('deve adicionar um membro', () => {
        const membro = { id: 2, nome: 'Membro 2' };
        biblioteca.adicionarMembro(membro);
        expect(biblioteca.listarMembros()).toHaveLength(2);
        expect(biblioteca.buscarMembroPorId(membro.id)).toEqual(membro);
        biblioteca.removerMembro(membro.id);
        expect(biblioteca.listarMembros()).toHaveLength(1);
    });

    test('deve remover um membro', () => {
        biblioteca.removerMembro(membroPadrao.id);
        expect(biblioteca.listarMembros()).toHaveLength(0);
    });

    test('deve contar membros corretamente', () => {
        const membro = { id: 2, nome: 'Membro 2' };
        biblioteca.adicionarMembro(membro);

        expect(biblioteca.contarMembros()).toEqual(2);
    });
})