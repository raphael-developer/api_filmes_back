// const Movie = require("../models/Movie");
const { connection, Movie } = require('../database/index');

// console.log('Conexão está estabelecida:', connection.authenticate());
Movie.init(connection);
// console.log('Modelo Movie inicializado');

module.exports = {
  async list(req, res) {
    try {
      const movies = await Movie.findAll();
      return res.json(movies);
    } catch (err) {
      return console.error("Erro na listagem: ", err);
    }
  },
  
  async show(req, res) {
    try {
      const movie = await Movie.findOne({ where: { id: req.params.id } });
      return res.json(movie);
    } catch (err) {
      console.error("Erro na busca: ", err);
      return res.status(500).json({ error: "Erro na busca" });
    }
  },

  async create(req, res) {
    const { title, poster, overview } = req.body;
    try {
      const movie = await Movie.create({ title, poster, overview });
      return res.json(movie);
    } catch (err) {
      return console.error("Erro na criação", err);
    }
  },

  async update(req, res) {
    const Sequelize = require("sequelize");
    const Op = Sequelize.Op;
    const { title, poster, overview } = req.body;
    const id = req.params.id;
    try {
      await Movie.update(
        { title, poster, overview },
        { where: { id: { [Op.eq]: id } } }
      );
      return res.json({ msg: `Filme ${title} atualizado com sucesso!` });
    } catch (err) {
      return res.json({ msg: `Filme ${title} não foi atualizado` }, err);
    }
  },

  async delete(req, res) {
    try {
      await Movie.destroy({ where: { id: req.params.id } });
      return res.json({
        msg: `Exclusão de item de ID ${req.params.id} feita com sucesso!`,
      });
    } catch (err) {
      return console.err("Erro na exclusão: ", err);
    }
  },
};
