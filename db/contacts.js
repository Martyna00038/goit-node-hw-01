const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "./contacts.json");

async function listContacts() {
    try {
        const data = await fs.readFile(contactsPath, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        console.log("Błąd listy kontaktów", error);
        return [];
    }
}

async function getContactById(contactId) {
    try {
        const contacts = await listContacts();
        const contact = contacts.find(
            (contact) => contact.id === contactId.toString()
        );
        return contact;
    } catch (error) {
        console.log("Błąd pobierania kontaktu po ID.");
    }
}

async function removeContact(contactId) {
    try {
        const contacts = await listContacts();
        const filteredContacts = contacts.filter(
            (contact) => contact.id !== contactId
        );
        await fs.writeFile(
            contactsPath,
            JSON.stringify(filteredContacts, null, 2)
        );
    } catch (error) {
        console.log("Błąd usuwania kontaktu", error);
    }
}

async function addContact(name, email, phone) {
    try {
        const contacts = await listContacts();
        const newContact = {
            id: nanoid(),
            name,
            email,
            phone,
        };
        contacts.push(newContact);
        await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
        return newContact;
    } catch (error) {
        console.log("Błąd dodawania kontaktu", error);
    }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
