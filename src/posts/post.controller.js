import Post from "./post.model.js";

// Crear
export const createPost = async (req, res) => {
  try {
    const { title, category, content } = req.body;

    const post = new Post({
      title,
      category,
      content,
      authorId: req.user.id, // viene del token .NET
    });

    await post.save();

    res.status(201).json({
      success: true,
      post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creando post",
    });
  }
};

// Listar (ya NO usamos populate)
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();

    res.json({
      success: true,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error obteniendo posts",
    });
  }
};

// Eliminar
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "No existe",
      });
    }

    // 🔥 validación con token
    if (post.authorId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "No autorizado",
      });
    }

    await post.deleteOne();

    res.json({
      success: true,
      message: "Eliminado",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error eliminando",
    });
  }
};

// Editar
export const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "No existe",
      });
    }

    // 🔥 validación con token
    if (post.authorId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "No autorizado",
      });
    }

    post.title = req.body.title || post.title;
    post.category = req.body.category || post.category;
    post.content = req.body.content || post.content;

    await post.save();

    res.json({
      success: true,
      message: "Post actualizado",
      post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error actualizando",
    });
  }
};
