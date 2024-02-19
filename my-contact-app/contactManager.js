const fs = require('fs');
const Contact = require('./contact');
const contactDataFile = './contacts.json'; // The file where contacts will be stored

class ContactManager {
  constructor() {
    this.contacts = this.loadContacts();
  }

  loadContacts() {
    // Read the contacts from the JSON file
    try {
      const data = fs.readFileSync(contactDataFile, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      return []; // If the file does not exist, return an empty array
    }
  }

  saveContacts() {
    // Save the contacts to the JSON file
    try {
      const data = JSON.stringify(this.contacts, null, 2); // Beautify the JSON output
      fs.writeFileSync(contactDataFile, data, 'utf8');
    } catch (error) {
      console.error('Error saving contacts:', error);
    }
  }

  addContact(firstName, lastName, email, notes) {
    // Create a new contact and add it to the list
    const newContact = new Contact(firstName, lastName, email, notes);
    this.contacts.push(newContact);
    this.saveContacts(); // Save the updated contacts list to the file
  }

  // ... you would continue to add methods here for finding, updating, and deleting contacts
}

module.exports = new ContactManager(); // Export an instance of the ContactManager
