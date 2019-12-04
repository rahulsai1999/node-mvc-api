import { Router } from 'express';
import {
    indexContact,
    viewContact,
    updateContact,
    deleteContact
} from '../controllers/contactController';

const router = Router();

router.get('/', (req, res) => {
    res.json({
        status: "API is working",
        message: "Welcome to MVC model"
    });
});

//controllers routes
router.route('/contacts')
    .get(indexContact)
router.route('/contacts/:contact_id')
    .get(viewContact)
    .patch(updateContact)
    .put(updateContact)
    .delete(deleteContact);


export default router;