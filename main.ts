import { Logger } from './log';

Logger.log('TypeScript works!');

const nome = document.getElementById('nome') as HTMLInputElement;
const sobrenome = document.getElementById('sobrenome') as HTMLInputElement;
const email = document.getElementById('email') as HTMLInputElement;
const button = document.getElementById('button') as HTMLButtonElement
const form = document.getElementById('form') as HTMLFormElement;

let isValidNome: boolean = false;
let isValidEmail: boolean = false;
let isValidSobrenome: boolean = false;

  
  button.addEventListener('click', (e) => {
    e.preventDefault();
    valida(nome, sobrenome, email);
   if (isValidNome === true && isValidSobrenome === true && isValidEmail === true) {
     alert('Usuário cadastrado com sucesso.');
     setTimeout(() => {
       nome.value = '';
       sobrenome.value = '';
       email.value = '';
       nome.focus();
     }, 700);
     form.submit();
   } else {
      console.log('Não foi possível, tente novamente');
   }
  });
  
function valida(nome: HTMLInputElement, sobrenome: HTMLInputElement, email: HTMLInputElement) {
  validaNome(nome as HTMLInputElement);
  validaSobrenome(sobrenome as HTMLInputElement);
  validaEmail(email as HTMLInputElement);
}

function validaNome(nome: HTMLInputElement) {
    console.log('Validando...');
    let msg: string;
    isValidNome = false;
    if (nome.nextElementSibling && nome.nextElementSibling.classList.contains('error')) nome.nextElementSibling.remove();
    if(nome.value === '') {
      msg = '*Campo nome não pode ficar em branco.';
      error(msg, nome);
      return;
    }
    if(nome.value.length > 10) {
      msg = '*Nome precisa ter menos de 10 caracteres.';
      error(msg, nome);
      return;
    }
  
    if(nome.value.length < 3) {
      msg = '*Nome precisa ter pelo menos de 3 caracteres.';
      error(msg, nome);
      return;
    }
  
    if(!/^[a-zA-Z]+$/.test(nome.value)) {
      msg = '*Caracteres especiais, como espaço, ponto e virgula não são permitidos no campo nome, passar bem.';
      error(msg, nome);
      return;
    }
    return isValidNome = true;
  }
  
  function validaSobrenome(sobrenome: HTMLInputElement) {
  console.log('Validando sobrenome...');
    isValidSobrenome = false;
    let msg: string;
    if (sobrenome.nextElementSibling && sobrenome.nextElementSibling.classList.contains('error')) sobrenome.nextElementSibling.remove();
    if (sobrenome.value === '') {
      msg = '*Campo sobrenome não pode ficar em branco.';
      error(msg, sobrenome);
     return;
    }
    if (sobrenome.value.length > 20) {
      msg = '*sobrenome precisa ter menos de 10 caracteres.';
      error(msg, sobrenome);
     return;
    }

    if (!/(^[a-zA-Z\s]+$)|(^[a-zA-Z]\s[a-zA-Z]+$)/.test(sobrenome.value)) {
      msg = '*Caracteres especiais não são permitidos no campo nome, passar bem.';
      error(msg, sobrenome);
     return;
    }
  return isValidSobrenome = true;
}

function validaEmail(email: HTMLInputElement){
  let msg: string;
  if (email.nextElementSibling && email.nextElementSibling.classList.contains('error')) email.nextElementSibling.remove();
  if (email.value === '') {
    msg = '*Campo E-mail precisa ser preenchido.'
    error(msg, email);
    return isValidEmail = false;
  }
  if(!/\S+@\S+\.\S+/.test(email.value)) {
    msg = '*E-mail inválido!';
    error(msg, email);
    return isValidEmail = false;
  }
  return isValidEmail = true;
}

function error(msg: string, campo: HTMLInputElement): void {
    const div: HTMLElement = document.createElement('div');
    const p: HTMLElement = document.createElement('p');
    div.classList.add('error');
    p.textContent = msg;
    div.appendChild(p);
    campo.insertAdjacentElement('afterend', div);
}

