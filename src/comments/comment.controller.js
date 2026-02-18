import Comment from "./comment.model.js";

export const createComment = async (req, res) => {
  const comment = new Comment({
    ...req.body,
    user: req.user.id,
  });

  await comment.save();

  res.status(201).json(comment);
};

// Editar
export const updateComment = async (req, res) => {
  const comment = await Comment.findById(req.params.id);

  if (!comment) return res.status(404).json({ message: "No existe" });

  if (comment.user.toString() !== req.user.id) {
    return res.status(403).json({ message: "No autorizado" });
  }

  comment.text = req.body.text || comment.text;

  await comment.save();

  res.json({ message: "Comentario actualizado" });
};

// Eliminar
export const deleteComment = async (req, res) => {
  const comment = await Comment.findById(req.params.id);

  if (!comment) return res.status(404).json({ message: "No existe" });

  if (comment.user.toString() !== req.user.id) {
    return res.status(403).json({ message: "No autorizado" });
  }

  await comment.deleteOne();

  res.json({ message: "Comentario eliminado" });
};

