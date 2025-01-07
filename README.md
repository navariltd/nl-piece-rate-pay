
## NL Piece Rate Pay

  

The Piece Rate Pay streamlines the management of casual workers' payments by providing tools for setting up activity types and linking them to specific items/products. It includes functionalities for daily attendance logging, calculating daily payouts based on attended activities, and assigning salary structures for specified timeframes. With automated rate fetching and payout calculations, this system ensures accurate and efficient payroll processing for casual workers.

### 1. Set-Up

  

**Doctypes:**

  

-  **Activity Type:**

![Screenshot from 2024-08-14 16-27-52](https://github.com/user-attachments/assets/7c6d7da4-ed24-4d6d-9a74-6e57463aaa97)

  

Define primary tasks for casual workers, such as "Washing" "Loading" or "Un-Loading".

- Write the 'Activity Type' name and Save.

-  **Casual Activity Item:**

![Screenshot from 2024-08-14 16-24-54](https://github.com/user-attachments/assets/8930c6a9-944d-467b-95dd-34ebc8ca509c)

  

Link specific items/products to activity types. Set the cost per item task (e.g., Loading each 50 KG Bag of Cement @ KSH. 100, Washing each Fishing Net, @ Ksh. 150).<br/>

  
  

- Choose the Activity Type

- Choose the Item

- Enter the cost

- Save

### 2. Daily Casual Payout

  

**Doctypes:**

  

-  **Attendance:**

Log daily attendance, including the type of shift worked.

-  **Casual Payroll Payout:**

![image (3)](https://github.com/user-attachments/assets/66dae217-e76b-4c4a-a13f-a1931cefc658)


Has two important tables.

- **Casual Payroll Payout Item:**

- Select the activity type

- Select Item worked on.

- The system will automatically fetch the rate set in the Casual Activity Item(if the item has not been set in the Casual Activity Item, then uswr will get a message to go and vcreate the Activity item).

- Enter the quantity of items worked on that day.

- Total payout for all activities is calculated automatically.

- **Casual Payroll Payout Employee:**

- Choose the shift type and attendance date.

- Click on 'Get Employees' button.

- The system retrieves employees present during the specified shift and date.(Always ensure casuals have there separate shift).

- Click on 'Calculate Payout', the system then calculates the payout per employee. i.e Total Amount/Number of Employees fetched

  

### 3. Casual Salary Structure Assignment Tool

  
  
![image (4)](https://github.com/user-attachments/assets/a173690d-0eb6-4137-9856-02a813d00274)


**Doctypes:**

  

-  **Casual Salary Structure Assignment Tool:**

- Specify the date range for attendance.

- Click "Calculate Payout" to sum the total amount earned by all casual workers during that period.

- Assign the appropriate salary structure for the specified timeframe.

- To ensure NSSF deductions, select the structure that includes NSSF contributions for the final week.

- Save and Submit to automatically generate salary structure assignments for each employee, with the designated salary structure. The total amount the employee has worked within the specified duration becomes their base.
- Once this is completed, a checkbox on the Doctype **Casual Payroll Payout** labeled _Payment Processed_ will be checked. This will prevent the creation of another Casual Salary Structure Assignment from it.
However, if the salary structure is canceled, the checkbox will be unchecked, allowing for the creation of a new structure.
  

This system simplifies the process of calculating daily and weekly payouts for casual workers, ensuring accurate payroll processing and efficient management of salary structures.

  

## Installation

### Manual Installation

1. [Install bench](https://github.com/frappe/bench)

2. [Install ERPNext](https://github.com/frappe/erpnext#installation)

3. [Install Frappe HR](https://github.com/frappe/hrms)

4. Once bench, ERPNext and Frappe HR are installed, add nl_piece_rate_pay to your bench by running

```sh

$ bench get-app https://github.com/navariltd/nl-piece-rate-pay.git

```

If you want to get specific branch use

```sh

$ bench get-app https://github.com/navariltd/nl-piece-rate-pay.git --branch {branch-name}

```

Replace <i>{branch-name}</i> with any of the repository's branches

5. After that, you can install the nl_piece_rate_pay app on the required site by running

```sh

$ bench --site {sitename}  install-app  nl_piece_rate_pay

```

Replace <i>{sitename}</i> with the name of your site.

>In case you encounter any issues with installation or functionality, please raise a GitHub issue, and we will respond within one business day.
>Also do a PR incase you have additional functionality that you want incoporated in the application.
>Thank you.
