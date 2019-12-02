import { Router } from 'express';
import {
    indexContact,
    newContact,
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
    .post(newContact);
router.route('/contacts/:contact_id')
    .get(viewContact)
    .patch(updateContact)
    .put(updateContact)
    .delete(deleteContact);


export default router;