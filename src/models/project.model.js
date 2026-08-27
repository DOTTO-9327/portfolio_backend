import pool from "../config/db.js";

export const findAll = async () => {
  // Les projets mis en avant (is_featured) remontent toujours en premier,
  // puis tri du plus récent au plus ancien.
  const sql = "SELECT * FROM projects ORDER BY is_featured DESC, created_at DESC";
  const [rows] = await pool.query(sql); // va envoyer la requête à la db
  // rows est déjà un tableau, vide s'il n'y a rien
  return rows; // tous les projets dans la db
};


// Récupérer un projet par son id
export const findById = async (id) => {
  const sql = "SELECT * FROM projects WHERE id = ?";
  const [rows] = await pool.query(sql, [id]);
  
  // On retourne le premier élément ou null si le tableau est vide
  return rows[0] ?? null;
};


// Créer un projet
export const create = async (userId, data) => {
  const { title, description, tech_stack, github_url, demo_url, image_url } = data; // destruration

  const sql = `
    INSERT INTO projects (user_id, title, description, tech_stack, github_url, demo_url, image_url)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  const [result] = await pool.query(sql, [
    userId, // récupéré depuis le token JWT (req.user.id), jamais depuis le corps de la requête
    title,
    description || null, // optionnel
    tech_stack || null,  // optionnel
    github_url || null,  // optionnel
    demo_url || null,  // optionnel
    image_url || null  // optionnel
  ]);

  // On retourne le projet complet en utilisant son nouvel ID
  return await findById(result.insertId);
}; 


//Modifier un projet 

export const update = async (id, data) => {
  // 1. On déballe le carton "data" pour sortir les nouveaux habits du projet
  const { title, description, tech_stack, github_url, demo_url, image_url } = data;
  
  // 2. On prépare la commande SQL (le langage de la base de données)
  // On lui dit : "METS À JOUR la table projets et CHANGE ces colonnes LÀ OÙ l'id est celui-là"
  const sql = `
    UPDATE projects 
    SET title=?, description=?, tech_stack=?, github_url=?, demo_url=?, image_url=? 
    WHERE id=?
  `; // les '?' dans ma requête SQL est pour la sécurité. On appelle ça des requêtes préparées. Cela empêche les injections SQL : un pirate ne peut pas envoyer du code malveillant à la place d'un titre de projet.
  
  // 3. On envoie la commande à la base de données.
  // Les "?" sont remplacés par les vraies valeurs dans l'ordre exact.
  await pool.query(sql, [
    title, 
    description, 
    tech_stack, 
    github_url, 
    demo_url, 
    image_url, 
    id // L'id est le dernier car il correspond au dernier "?" après "WHERE id="
  ]);

  // 4. Une fois mis à jour, on va rechercher le projet tout neuf pour voir à quoi il ressemble
  return await findById(id);
};



// supprimer un projet
export const remove = async (id) => {
  // 1. On prépare la commande SQL pour supprimer
  // "SUPPRIME de la table projets LA LIGNE OÙ l'id est celui-ci"
  const sql = "DELETE FROM projects WHERE id = ?";
  
  // 2. On exécute la commande
  const [result] = await pool.query(sql, [id]);

  // 3. 'result.affectedRows' nous dit combien de lignes ont été supprimées.
  // Si c'est 1, ça veut dire que le projet existait et a été effacé.
  // Si c'est 0, ça veut dire qu'on n'a rien trouvé à supprimer.
  // On retourne 'true' si au moins une ligne a été touchée, sinon 'false'.
  return result.affectedRows > 0; //insertId est utilisé après un INSERT pour connaître le nouvel ID créé. affectedRows est utilisé après un UPDATE ou DELETE pour savoir combien de lignes ont été modifiées ou supprimées en base de données.
};