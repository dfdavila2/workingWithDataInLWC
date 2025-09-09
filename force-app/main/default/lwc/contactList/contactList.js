/**
 * ContactList Lightning Web Component
 * 
 * This component displays a list of Contact records in a data table format
 * using the lightning-datatable base component. It retrieves contact data
 * from the ContactController Apex class and presents it in a user-friendly
 * table with sorting and other interactive features.
 * 
 * Features:
 * - Displays contacts in a sortable data table
 * - Shows FirstName, LastName, and Email fields
 * - Uses wire service for efficient data loading
 * - Includes comprehensive error handling with reduceErrors utility
 * - Loading states and empty state management
 * - Toast notifications for user feedback
 * 
 * Error Handling:
 * - Integrates with ldsUtils.reduceErrors for standardized error formatting
 * - Displays formatted error messages in the UI
 * - Provides fallback error handling for various error types
 * 
 * @author Salesforce Developer
 * @version 1.1
 * @since 2024
 */

// Lightning Web Component framework imports
import { LightningElement, wire } from 'lwc';

// Platform services for user notifications
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

// Apex method import for data retrieval
import getContacts from '@salesforce/apex/ContactController.getContacts';

// Utility function for error handling and formatting
import { reduceErrors } from 'c/ldsUtils';


/**
 * ContactList class extends LightningElement to display contacts in a data table
 */
export default class ContactList extends LightningElement {
    
    /**
     * Array of Contact records retrieved from the server
     * This property is populated by the wire service when getContacts() is called
     */
    contacts = [];
    
    /**
     * Array of column definitions for the lightning-datatable
     * Defines the structure and display properties of each column
     */
    columns = [
        {
            label: 'First Name',
            fieldName: 'FirstName',
            type: 'text',
            sortable: true,
            initialWidth: 150
        },
        {
            label: 'Last Name',
            fieldName: 'LastName',
            type: 'text',
            sortable: true,
            initialWidth: 150
        },
        {
            label: 'Email',
            fieldName: 'Email',
            type: 'email',
            sortable: true,
            initialWidth: 250
        }
    ];
    
    /**
     * Loading state indicator
     * Set to true while data is being retrieved from the server
     */
    isLoading = true;
    
    /**
     * Error message to display if data retrieval fails
     * Populated when the wire service encounters an error
     */
    error;

    /**
     * Getter for formatted error messages
     * 
     * This getter uses the reduceErrors utility function from the ldsUtils module
     * to format various types of LDS (Lightning Data Service) errors into readable
     * error messages. It handles different error formats including:
     * - UI API read errors
     * - Page level errors
     * - Field level errors
     * - DML, Apex and network errors
     * - JavaScript errors
     * 
     * The getter returns an empty array when no errors are present, ensuring
     * the template can safely iterate over the errors array.
     * 
     * @returns {Array} Array of formatted, user-friendly error messages
     * @example
     * // In template: <template for:each={errors} for:item="errorMsg">
     * //   <div key={errorMsg}>{errorMsg}</div>
     * // </template>
     */
    get errors() {
        return this.error ? reduceErrors(this.error) : [];
    }

    /**
     * Wire service method to retrieve contacts from the ContactController
     * 
     * This method uses the @wire decorator to automatically call the
     * ContactController.getContacts() method and handle the response.
     * The wire service provides reactive data binding and automatic
     * re-execution when dependencies change.
     * 
     * @param {Object} result - The result object from the wire service
     * @param {Object} result.data - The contact data returned from the server
     * @param {Object} result.error - Any error that occurred during the call
     */
    @wire(getContacts)
    wiredContacts(result) {
        // Set loading state to false when the wire service completes
        this.isLoading = false;
        
        if (result.data) {
            // Successfully retrieved contacts
            this.contacts = result.data;
            this.error = undefined;
            
            // Log the number of contacts retrieved for debugging
            console.log('Retrieved ' + this.contacts.length + ' contacts');
            
        } else if (result.error) {
            // Handle errors from the wire service
            this.error = result.error;
            this.contacts = [];
            
            // Log the error for debugging
            console.error('Error retrieving contacts:', result.error);
            
            // Show a toast notification to the user
            this.showErrorToast(result.error);
        }
    }

    /**
     * Displays an error toast notification to the user
     * 
     * This method creates and dispatches a ShowToastEvent to inform
     * the user when an error occurs during data retrieval.
     * 
     * @param {Object} error - The error object from the wire service
     */
    showErrorToast(error) {
        const toastEvent = new ShowToastEvent({
            title: 'Error Loading Contacts',
            message: 'Unable to retrieve contact data. Please try again.',
            variant: 'error',
            mode: 'sticky'
        });
        
        this.dispatchEvent(toastEvent);
    }
}
