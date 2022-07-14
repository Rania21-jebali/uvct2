const Formation = require("../models/formation");

const formationCtrl = {
  //   Ajout formation
  addFormation: async (req, res) => {
    try {
      const { title } = req.body;
      const formation = await Formation.findOne({ title });
      if (formation)
        return res.status(400).json({ msg: "This titre already exists." });
      const newFormation = {
        title,
        postedBy: req.user.id,
      };
      const formation2 = new Formation(newFormation);
      await formation2.save();
      res.json({ msg: "Formation ajoutée ! " });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  //  All formations by user
  getAllFormations: async (req, res) => {
    try {
      const { page = 1, limit = 1 } = req.query;
      const formation = await Formation.find({
        postedBy: req.user.id,
        archiver: false,
      })
        .limit(limit * 1)
        .skip((page - 1) * limit);
      res.status(200).json({ total: formation.length, formation });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  // get All formations
  getFormations: async (req, res) => {
    try {
      const formation = await Formation.find({ archiver: false });
      res.json(formation);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  // get All formations archivées
  getFormationsArchive: async (req, res) => {
    try {
      const formation = await Formation.find({ archiver: true });
      res.json(formation);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  // get event by id
  getFormationById: async (req, res) => {
    try {
      const formation = await Event.findById({ _id: req.params.id });
      res.json(formation);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  //  All formations for admin
  getAllFormationsAdmin: async (req, res) => {
    try {
      const formation = await Formation.find({ statut: false });

      //Formation.paginate({}, { page: req.query.page, limit: req.query.limit });
      res.json(formation);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  //  search formations by title
  searchFormationsByTitle: async (req, res) => {
    try {
      const formation = await Formation.find({
        title: req.params.title,
        archiver: false,
      });
      res.json(formation);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  //  search formations by level
  searchFormationsByLevel: async (req, res) => {
    try {
      const formation = await Formation.find({
        level: req.params.level,
        archiver: false,
      });
      res.json(formation);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  //  search formations by categorie
  getFormationsByCategorie: async (req, res) => {
    try {
      const formation = await Formation.find({
        categorie: req.params.categorie,
        archiver: false,
      });
      res.json(formation);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  //update formation by titre
  updateFormationByTitre: async (req, res) => {
    try {
      const {
        title,
        subTitle,
        description,
        affiche,
        videopromo,
        categorie,
        level,
        price,
        free,
        objectif,
        intendedFor,
        prerequis,
      } = req.body;

      await Formation.findOneAndUpdate(
        { titre: req.params.titre },
        {
          title,
          subTitle,
          description,
          affiche,
          videopromo,
          categorie,
          level,
          price,
          free,
          objectif,
          intendedFor,
          prerequis,
        }
      );
      res.json({ msg: "Formation modifiée !" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  //update formation by id
  updateFormationById: async (req, res) => {
    try {
      const {
        title,
        subTitle,
        description,
        affiche,
        videopromo,
        categorie,
        level,
        price,
        free,
        objectif,
        intendedFor,
        prerequis,
      } = req.body;

      await Formation.findByIdAndUpdate(
        { _id: req.params.id },
        {
          title,
          subTitle,
          description,
          affiche,
          videopromo,
          categorie,
          level,
          price,
          free,
          objectif,
          intendedFor,
          prerequis,
        }
      );
      res.json({ msg: "Formation modifiée !" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  // archiver formation by id
  archiveFormationById: async (req, res) => {
    try {
      await Formation.findByIdAndUpdate(
        { _id: req.params.id },
        {
          archiver: true,
        }
      );
      res.json({ msg: "Formation archivée !" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  // unarchiver formation by id
  unarchiveFormationById: async (req, res) => {
    try {
      await Formation.findByIdAndUpdate(
        { _id: req.params.id },
        {
          archiver: false,
        }
      );
      res.json({ msg: "Formation unarchivée !" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  // publier formation by id
  publierFormationById: async (req, res) => {
    try {
      await Formation.findByIdAndUpdate(
        { _id: req.params.id },
        {
          statut: true,
        }
      );
      res.json({ msg: "Formation publiée !" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  // depublier formation by id
  depublierFormationById: async (req, res) => {
    try {
      await Formation.findByIdAndUpdate(
        { _id: req.params.id },
        {
          statut: false,
        }
      );
      res.json({ msg: "Formation dépubliée !" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  //get Formation by id
  getFormationById: async (req, res) => {
    try {
      const formation = await Formation.findById(req.params.id);

      res.json(formation);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  //get Formation by title
  getFormationByTitre: async (req, res) => {
    try {
      const formation = await Formation.findOne({ title: req.params.title });

      res.json(formation);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  // supprimer formation
  deleteFormation: async (req, res) => {
    try {
      await Formation.findByIdAndDelete(req.params.id);

      res.json({ msg: "Formation supprimée !" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = formationCtrl;
