## NL Piece Rate Pay


## Casual Payroll System
The Casual Payroll System streamlines the management of casual workers' payments by providing tools for setting up activity types and linking them to specific items/products. It includes functionalities for daily attendance logging, calculating daily payouts based on attended activities, and assigning salary structures for specified timeframes. With automated rate fetching and payout calculations, this system ensures accurate and efficient payroll processing for casual workers.
### 1. Set-Up

**Doctypes:**

-   **Activity Type:**
        ![Screenshot from 2024-04-28 07-40-42](https://github.com/navariltd/navari_csf_ke/assets/60258622/7e9a53c0-347c-452f-87bd-546934a455a1)

    Define primary tasks for casual workers, such as "Washing" or "Cleaning".
    -   Write activity type name and Save.
-   **Casual Activity Item:**
         ![Screenshot from 2024-04-28 08-58-46](https://github.com/navariltd/navari_csf_ke/assets/60258622/36ca612f-1e12-4f22-bd81-45a732d9665e)

      Link specific items/products to activity types. Set the cost per item manipulation (e.g., washing each NETM-001 costs Ksh. 150).<br/>


    - Choose the Activity Type
    -    Choose the Item
    -    Enter the cost
    -    Save
      
### 2. Daily Casual Payout

**Doctypes:**

-   **Attendance:**  
    Log daily attendance, including the type of shift worked.
    
-   **Casual Payroll Payout:**
![image (1)](https://github.com/navariltd/navari_csf_ke/assets/60258622/ed9bbeea-997e-41af-a462-48e3e2d87239)
    Has two important tables.
    
    -   **Casual Payroll Payout Item:**
        -   Select the activity type
        -   Select Item worked on.
        -   The system will automatically fetch the rate set in the Casual Activity Item.
        -   Enter the quantity of items worked on that day.
        -   Total payout for all activities is calculated automatically.
    -   **Casual Payroll Payout Employee:**
        -   Choose the shift type and attendance date.
        -   Click on 'Get Employees' button.
        -   The system retrieves employees present during the specified shift and date.
        -   Click on 'Calculate Payout', the system then calculates the payout per employee. i.e Total Amount/Number of Employees fetched

### 3. Casual Salary Structure Assignment Tool


![image (2)](https://github.com/navariltd/navari_csf_ke/assets/60258622/7fa5d17e-1ca2-475d-937c-c5580637c9cc)
**Doctypes:**

-   **Casual Salary Structure Assignment Tool:**
    -   Specify the date range for attendance.
    -   Click "Calculate Payout" to sum the total amount earned by all casual workers during that period.
    -   Assign the appropriate salary structure for the specified timeframe.
    -   To ensure NSSF deductions, select the structure that includes NSSF contributions for the final week.
    -   Save and submit to automatically generate salary structure assignments for each employee, with the designated salary structure.

This system simplifies the process of calculating daily and weekly payouts for casual workers, ensuring accurate payroll processing and efficient management of salary structures.


#### License

AGPL
