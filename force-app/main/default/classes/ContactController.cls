/**
 * ContactController Apex Class
 * 
 * This class provides server-side methods for retrieving Contact records
 * to be consumed by Lightning Web Components. It follows Salesforce best
 * practices for data access and security.
 * 
 * Current Status:
 * - Contains a forced exception for testing error handling functionality
 * - Demonstrates proper error handling in Lightning Web Components
 * - Includes comprehensive CRUD validation and field-level security checks
 * 
 * Testing Features:
 * - Forced AuraHandledException to test error display in contactList component
 * - Error message demonstrates the reduceErrors utility function integration
 * 
 * @author Salesforce Developer
 * @version 1.1
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
     * IMPORTANT: This method currently contains a forced exception for testing
     * error handling functionality in the contactList Lightning Web Component.
     * The forced exception demonstrates how the reduceErrors utility function
     * processes and formats error messages for display in the UI.
     * 
     * Security Considerations:
     * - Uses 'with sharing' to enforce user's sharing rules
     * - Only returns fields that are accessible to the current user
     * - Respects field-level security and object permissions
     * - Validates CRUD permissions before executing SOQL queries
     * 
     * Error Handling:
     * - Throws AuraHandledException for proper error propagation to LWC
     * - Includes comprehensive error logging for debugging
     * - Provides user-friendly error messages
     * 
     * @return List<Contact> A list of Contact records with FirstName, LastName, and Email fields
     * @throws AuraHandledException If the query fails, user lacks permissions, or forced test exception
     */
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts() {
        try {
            // ========================================
            // FORCED EXCEPTION FOR TESTING ERROR HANDLING
            // ========================================
            // 
            // This exception is intentionally thrown to test the error handling
            // functionality in the contactList Lightning Web Component. It demonstrates:
            // 
            // 1. How AuraHandledException is caught by the @wire service
            // 2. How the reduceErrors utility function processes the error
            // 3. How formatted error messages are displayed in the UI
            // 4. The complete error handling workflow from Apex to LWC
            // 
            // IMPORTANT: Remove this exception after testing is complete
            // to restore normal contact retrieval functionality.
            // ========================================
            throw new AuraHandledException('This is a test error to demonstrate error handling in the contactList component.');
            
            // ========================================
            // NORMAL FUNCTIONALITY (COMMENTED OUT FOR TESTING)
            // ========================================
            // The following code is commented out because the forced exception above
            // makes it unreachable. Uncomment this section after removing the test exception.
            // ========================================
            
            /*
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
            */
            
        } catch (Exception e) {
            // Log the exception for debugging purposes
            System.debug('Error retrieving contacts: ' + e.getMessage());
            
            // Throw an AuraHandledException to be caught by the Lightning Web Component
            throw new AuraHandledException('Unable to retrieve contacts: ' + e.getMessage());
        }
    }
}
