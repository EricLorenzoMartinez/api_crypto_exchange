# Practise 1

[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/N-_OVHL1)

## ⚠️ Uso de Issues (obligatorio)

Este repositorio incluye **issue templates** que representan los bloques evaluables del proyecto.
Debes crear los issues a partir de estos templates, **asignártelos a ti mismo**, completar la información solicitada y **cerrarlos únicamente cuando la parte esté correctamente implementada**.

La evaluación se realizará en base a los **issues cerrados**.
Un issue no creado o no cerrado se considerará **no entregado**.

## 📝 Descripció del projecte

[cite_start]API tipus Crypto Exchange on els usuaris poden gestionar actius, realitzar transaccions de compra/venda i consultar el seu portfolio en temps real.

### 🚀 Funcionalitats

- [cite_start]**Autenticació JWT**: Protecció de rutes i gestió d'usuaris.
- [cite_start]**Catàleg d'Assets**: CRUD complet d'actius amb refresc de preu.
- [cite_start]**Transaccions**: Gestió de compra/venda amb captura de preu en temps real.
- [cite_start]**Portfolio**: Càlcul agregat mitjançant MongoDB Aggregation Pipeline ($group, $lookup).
- [cite_start]**Integració CoinCap**: Consulta de preus en temps real des d'API externa.
- [cite_start]**Bonus B**: Sistema de fallback a preus en memòria cau (CACHE) si CoinCap falla.

### 🛠️ Arquitectura

[cite_start]S'ha seguit una arquitectura per capes (Controller-Service-Repository) per assegurar la separació de responsabilitats i la facilitat de manteniment.

### 🤖 Ús d'IA

[cite_start]He utilitzat Gemini com a eina de Pair Programming per:

- [cite_start]Dissenyar el pipeline d'agregació del Portfolio ($group i $cond).
- Refactoritzar el tipatge de dades en els mètodes de cerca de Mongoose.
- Resoldre problemes de configuració amb els tipus de Request d'Express.

### 📺 Vídeo de Demostració

[Vídeo](https://drive.google.com/file/d/1Wq3LYdQvkOeBV_a6x23l6bCZuS28qTKC/view?usp=sharing)
