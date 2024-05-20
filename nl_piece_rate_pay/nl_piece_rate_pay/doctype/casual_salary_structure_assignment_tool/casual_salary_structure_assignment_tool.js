// Copyright (c) 2024, Navari Limited and contributors
// For license information, please see license.txt
frappe.ui.form.on('Casual Salary Structure Assignment Tool', {
    refresh: function(frm) {
        frm.add_custom_button(__('Calculate Payout'), function() {
            frappe.call({
                method: 'nl_piece_rate_pay.nl_piece_rate_pay.doctype.casual_salary_structure_assignment_tool.casual_salary_structure_assignment_tool.get_employees_calculate_weekly_pay',
                args: {
                    "start_date": frm.doc.start_date,
                    "end_date": frm.doc.end_date
                },
                callback: function(response) {
                    if (response.message) {
                        var employee_amount = response.message;

                        // Clear existing child table rows
                        frm.clear_table('casuals_weekly_amount');

                        // Iterate through the employee amounts and add to child table
                        Object.entries(employee_amount).forEach(([employee, amount]) => {
                            var new_casual_payout = frm.add_child('casuals_weekly_amount');
                            new_casual_payout.employee = employee;
                            new_casual_payout.amount = amount;
                        });

                        // Refresh the form to display updated child table
                        frm.refresh_field('casuals_weekly_amount');
                    }
                }
            });
        });
    }
});
