/**
 * ContactCreator Lightning Web Component
 * 
 * This component provides a form interface for creating new Contact records
 * using the lightning-record-form base component. It includes fields for
 * First Name, Last Name, and Email, and displays a success toast message
 * with the created contact's record ID upon successful creation.
 * 
 * @author Salesforce Developer
 * @version 1.0
 * @since 2024
 */

import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import CONTACT_OBJECT from '@salesforce/schema/Contact';
import FIRST_NAME_FIELD from '@salesforce/schema/Contact.FirstName';
import LAST_NAME_FIELD from '@salesforce/schema/Contact.LastName';
import EMAIL_FIELD from '@salesforce/schema/Contact.Email';

/**
 * ContactCreator class extends LightningElement to create a contact creation form
 */
export default class ContactCreator extends LightningElement {
    
    /**
     * The API name of the Contact object
     * Used by lightning-record-form to determine which object to create
     */
    objectApiName = CONTACT_OBJECT;
    
    /**
     * Array of field API names to display in the form
     * Includes FirstName, LastName, and Email fields
     */
    fields = [FIRST_NAME_FIELD, LAST_NAME_FIELD, EMAIL_FIELD];

    /**
     * Event handler for successful contact creation
     * 
     * This method is triggered when the lightning-record-form successfully
     * creates a new contact record. It displays a toast notification
     * showing the created contact's record ID.
     * 
     * @param {Object} event - The success event from lightning-record-form
     * @param {string} event.detail.id - The ID of the newly created contact record
     */
    handleSuccess(event) {
        // Create a toast event to notify the user of successful contact creation
        const toastEvent = new ShowToastEvent({
            title: "Contact created",
            message: "Record ID: " + event.detail.id,
            variant: "success"
        });
        
        // Dispatch the toast event to display the notification
        this.dispatchEvent(toastEvent);
    }
}
