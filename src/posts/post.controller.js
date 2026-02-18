import Post from "./post.model.js";

// Crear
export const createPost = async (req, res) => {
  const post = new Post({
    ...req.body,
    user: req.user.id,
  });

  await post.save();

  res.status(201).json(post);
};

// Listar
export const getPosts = async (req, res) => {
  const posts = await Post.find().populate("user", "username");

  res.json(posts);
};

// Eliminar
export const deletePost = async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) return res.status(404).json({ message: "No existe" });

  if (post.user.toString() !== req.user.id) {
    return res.status(403).json({ message: "No autorizado" });
  }

  await post.deleteOne();

  res.json({ message: "Eliminado" });
};

// Editar
export const updatePost = async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) return res.status(404).json({ message: "No existe" });

  if (post.user.toString() !== req.user.id) {
    return res.status(403).json({ message: "No autorizado" });
  }

  post.title = req.body.title || post.title;
  post.category = req.body.category || post.category;
  post.content = req.body.content || post.content;

  await post.save();

  res.json({ message: "Post actualizado" });
};

