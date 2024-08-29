const { isAnagram } = require("../src/anagram");
const Banco = require("../src/banco");

test("Criar banco", async () => {
  const nome = "Usuario";
  const valorInicial = 9.99;
  const banco = new Banco(nome, valorInicial);
  expect(banco.nome).toBe(nome);
  expect(banco.saldo).toBe(valorInicial);
});

test("Depositar", async () => {
  const banco = new Banco("Usuario", 9.9);
  banco.depositar(10)

  expect(banco.nome).toBe("Usuario");
  expect(banco.obterSaldo()).toBe(19.9);
});


