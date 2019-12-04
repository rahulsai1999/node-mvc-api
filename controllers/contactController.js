import Contact from '../models/contactModel';

//index actions
const indexContact = (req, res) => {
    Contact.find({}, (err, contacts) => {
        err
            ? res.json({ status: "error", message: err })
            : res.json({
                status: "success",
                message: "Contacts retrieved successfully",
                data: contacts
            });
    });
}

const viewContact = (req, res) => {
    Contact.findById(req.params.contact_id, (err, contact) => {
        if (err)
            res.json({ status: "Contact not found", message: err });
        else {
            res.json({ status: "Contact found", message: contact });
        }
    })
}

const updateContact = (req, res) => {
    Contact.findById(req.params.contact_id, (err, contact) => {
        if (err)
            res.json({ status: "Contact not found", message: err });
        else {
            contact.name = req.body.name ? req.body.name : contact.name;
            contact.gender = req.body.gender;
            contact.email = req.body.email;
            contact.phone = req.body.phone;

            contact.save((err) => {
                err
                    ? res.json({ status: "Contact not updated", message: err })
                    : res.json({ message: 'Contact updated', data: contact });
            });
        }
    });
}

const deleteContact = (req, res) => {
    Contact.remove({ _id: req.params.contact_id }, (err, contact) => {
        err
            ? res.json({ status: "Contact not deleted", message: err })
            : res.json({ status: `Contact ${contact._id} removed`, message: "Contact deleted" });
    });
}

export { indexContact, viewContact, updateContact, deleteContact }