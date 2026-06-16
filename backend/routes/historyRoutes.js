const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// GET all search history (sorted by last_searched DESC)
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM search_history ORDER BY last_searched DESC');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch history' });
  }
});

// DELETE a history item by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM search_history WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'History item not found' });
    }
    
    res.json({ message: 'Deleted successfully', deleted: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete history' });
  }
});

// GET popular cities (top 5 most searched)
router.get('/popular', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM search_history ORDER BY search_count DESC LIMIT 5');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch popular cities' });
  }
});

module.exports = router;