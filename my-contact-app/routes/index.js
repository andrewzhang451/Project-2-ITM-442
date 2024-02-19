const express = require('express');
const router = express.Router();
const contactManager = require('../contactManager'); // Replace with the correct path to your contactManager file

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'My Contact App' });
});

/* GET contacts page. */
router.get('/contacts', function(req, res, next) {
  res.render('contacts', { 
    title: 'Contacts List',
    contacts: contactManager.contacts // This will pass the array of contacts to your Pug template
  });
});

/* POST new contact. */
router.post('/contacts', function(req, res, next) {
  const { firstName, lastName, email, notes } = req.body;
  contactManager.addContact(firstName, lastName, email, notes);
  res.redirect('/contacts'); // Redirect back to the contacts list after adding a new contact
});

// CRUD Route Handlers

// Create - POST route to add a new contact
app.post('/contacts', (req, res) => {
  const { firstName, lastName, email, notes } = req.body;
  const contacts = readContacts();
  const newContact = {
      id: generateUniqueId(),
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      notes: notes.trim(),
      dateCreated: new Date().toISOString(),
  };
  contacts.push(newContact);
  writeContacts(contacts);
  res.redirect('/contacts');
});

// Read - GET route to list all contacts
app.get('/contacts', (req, res) => {
  const contacts = readContacts();
  res.render('contacts', { contacts });
});

// Read - GET route to display a single contact
app.get('/contacts/:id', (req, res) => {
  const contacts = readContacts();
  const contact = contacts.find(c => c.id === req.params.id);
  res.render('contact_detail', { contact });
});

// Update - PUT route to modify an existing contact
// Note: Implement method override for PUT or handle as POST
app.post('/contacts/:id/edit', (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, notes } = req.body;
  const contacts = readContacts();
  const contactIndex = contacts.findIndex(c => c.id === id);
  if (contactIndex !== -1) {
      contacts[contactIndex] = {
          ...contacts[contactIndex],
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          notes: notes.trim(),
          dateModified: new Date().toISOString(),
      };
      writeContacts(contacts);
      res.redirect('/contacts/' + id);
  } else {
      res.status(404).send('Contact not found');
  }
});

// Delete - DELETE route to remove an existing contact
// Note



module.exports = router;
