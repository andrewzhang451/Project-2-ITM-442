const { v4: uuidv4 } = require('uuid'); // We will use this to generate a unique ID

class Contact {
  constructor(firstName, lastName, email, notes) {
    this.id = uuidv4(); // Generates a unique ID for each contact
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email || ''; // Email is not required, so it defaults to an empty string
    this.notes = notes || '';
    this.createdAt = new Date(); // Sets the current date and time for when the contact is created
    this.updatedAt = new Date(); // Initially, this will be the same as createdAt
  }

  update(data) {
    const { firstName, lastName, email, notes } = data;
    if (firstName) this.firstName = firstName;
    if (lastName) this.lastName = lastName;
    if (email) this.email = email;
    if (notes) this.notes = notes;
    this.updatedAt = new Date(); // Update the updatedAt field to the current date and time
  }
}

module.exports = Contact;
