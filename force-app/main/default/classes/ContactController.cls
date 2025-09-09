/**
 * ContactController Apex Class
 * 
 * This class provides server-side methods for retrieving Contact records
 * to be consumed by Lightning Web Components. It follows Salesforce best
 * practices for data access and security.
 * 
 * @author Salesforce Developer
 * @version 1.0
 * @since 2024
 */
public with sharing class ContactController {
    
    /**
     * Retrieves a list of Contact records with specified fields
     * 
     * This method queries the Contact object and returns a list of Contact
     * records containing FirstName, LastName, and Email fields. The method
     * is designed to be called from Lightning Web Components using the
     * @AuraEnabled annotation.
     * 
     * Security Considerations:
     * - Uses 'with sharing' to enforce user's sharing rules
     * - Only returns fields that are accessible to the current user
     * - Respects field-level security and object permissions
     * 
     * @return List<Contact> A list of Contact records with FirstName, LastName, and Email fields
     * @throws AuraHandledException If the query fails or user lacks permissions
     */
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts() {
        try {
            // Check if the user has read access to the Contact object and required fields
            if (!Schema.sObjectType.Contact.isAccessible() ||
                !Schema.sObjectType.Contact.fields.FirstName.isAccessible() ||
                !Schema.sObjectType.Contact.fields.LastName.isAccessible() ||
                !Schema.sObjectType.Contact.fields.Email.isAccessible()) {
                throw new AuraHandledException('You do not have permission to access Contact records or required fields.');
            }
            
            // Query Contact records with the specified fields
            // Using SOQL to retrieve only the required fields for better performance
            List<Contact> contacts = [
                SELECT Id, FirstName, LastName, Email
                FROM Contact
                ORDER BY LastName, FirstName
                LIMIT 1000
            ];
            
            return contacts;
            
        } catch (Exception e) {
            // Log the exception for debugging purposes
            System.debug('Error retrieving contacts: ' + e.getMessage());
            
            // Throw an AuraHandledException to be caught by the Lightning Web Component
            throw new AuraHandledException('Unable to retrieve contacts: ' + e.getMessage());
        }
    }
}
