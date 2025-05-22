import { Router } from 'express';
import { addSchool, listSchools } from '../Controllers/SchoolController.js';

const school = Router();

// Add School
school.post('/addSchool', addSchool);

// List Schools (sorted by proximity)
school.get('/listSchools', listSchools);

// ✅ Export only the router
export default school;
