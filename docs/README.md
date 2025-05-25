# 📘 Documentação do Projeto - Desenvolvimento Web

![Planejamento do Projeto](./PMC.png)

---

## 🧾 Visão Geral

Este projeto visa o desenvolvimento de um sistema institucional para cadastro e visualização de alunos. O sistema, destinado para uso da Assistência Estudantil, 
permite que os clientes visualizem dados dos alunos. A seguir, detalhamos os principais artefatos exigidos para a entrega.

---

## ✅ Backlog

| ID    | Prioridade | História de Usuário                                                                 |
|-------|------------|--------------------------------------------------------------------------------------|
| HU-1  | 1️⃣         | **No papel de cliente**, desejo **visualizar uma lista/tabela de alunos**, para poder consultar os seus dados. |
| HU-2  | 2️⃣         | **No papel de cliente**, desejo **filtrar os alunos de acordo com dados escolhidos**, para encontrar mais rapidamente quem eu procuro. |
| HU-3  | 3️⃣         | **No papel de cliente**, desejo **adicionar alunos na tabela**, para mantê-la sempre atualizada. |
| HU-4  | 4️⃣         | **No papel de cliente**, desejo **remover alunos da tabela**, para desfazer possíveis erros que eu possa cometer. |
| HU-5  | 5️⃣         | **No papel de cliente**, desejo **alterar dados dos alunos**, para manter a tabela atualizada ou desfazer possíveis erros. |
| HU-6  | 6️⃣         | **No papel de cliente**, desejo **consultar detalhes dos alunos**, para que eu possa consultar informações mais específicas, sem que essas poluam a tela principal. |
| HU-7  | 7️⃣         | **No papel de cliente**, desejo **visualizar solicitações dos alunos**, para que eu possa aceitá-las ou deferi-las. |
| HU-8  | 8️⃣         | **No papel de cliente**, desejo **confirmar ou deferir solicitações de benefícios dos alunos**, para garantir que os benefícios sejam concedidos justamente. |
| HU-9  | 9️⃣         | **No papel de cliente**, desejo **ver uma confirmação após eu confirmar ou deferir uma solicitação**, para ter certeza que deu tudo certo. |
| HU-10  | 1️⃣0️⃣       | **No papel de cliente**, desejo **ver uma confirmação após eu realizar uma ação de CRUD**, para ter certeza que deu tudo certo. |
| HU-11  | 1️⃣1️⃣       | **No papel de cliente**, desejo **me autenticar com login e senha**, para garantir que apenas eu e outras pessoas autorizadas tenham acesso ao sistema. |
| HU-12  | 1️⃣2️⃣       | **No papel de administrador**, desejo **gerenciar o acesso dos usuários**, para garantir que apenas pessoas autorizadas tenham acesso ao sistema. |

---

## 🎨 Protótipo de Telas

Cada funcionalidade descrita no backlog possui ao menos uma tela representando sua interface esperada.

### 🖼️ Protótipo do Requisito HU-1

![Protótipo da tela de listagem de produtos](wireframe1.png)
**Figura 1**: Tela de listagem de produtos com imagem, nome e preço — correspondente à história de usuário HU-1.

---

## 🏗 Análise e Projeto 

O projeto  do sistema 

### Modelo 

![alt text](class_diagram.png)

### Esboço da arquitetura geral (cliente-servidor)


![alt text](image.png)


### Autorização  e Autenticação 
A autorização no Strapi (a partir do v4 e mantida no v5) é baseada em perfis de usuários (roles) e permissões atribuídas a esses perfis. Ela define o que cada usuário pode ou não pode fazer ao interagir com os endpoints da API.

1. Tipos de usuários
O Strapi tem dois contextos principais de usuários:

🔹 Usuários Autenticados
Criados via cadastro/login na API pública.

Associados a uma role do tipo “Authenticated” ou outra personalizada.

Usam token JWT para acesso autenticado.

🔸 Usuários Administrativos
Criados via painel de administração do Strapi.

Usam o Strapi Admin Panel.

Gerenciados separadamente e com permissões diferentes.


### Tecnologias a serem utilizadas 
Strapi, HTML, CSS, SQLITE....

---

### Telas do sistema

![alt text](tela1-1.png)
**Figura 2**: Tela de listagem de produtos com imagem, nome e preço — correspondente à história de usuário HU-1.
