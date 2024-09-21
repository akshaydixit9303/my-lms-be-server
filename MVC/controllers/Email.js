import db from "../../config/db";

export const EngRevisit = (req, res) => {
  const query = "SELECT * FROM main_admin_db.email_temp_eng_revisit";
  db.query(query, (err, data) => {
    if (err) return res.json(err);
    else res.json(data);
  });
};
