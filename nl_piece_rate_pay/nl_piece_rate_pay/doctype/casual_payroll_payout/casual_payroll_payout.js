// Copyright (c) 2024, Navari Limited and contributors
// For license information, please see license.txt

frappe.ui.form.on('Casual Payroll Payout', {
    refresh: function(frm) {
        if(frm.doc.attendance_date!=null){
            frm.add_custom_button(__('Get Employees'), function() {
                // Handle button click event
                var attendanceDate = frm.doc.attendance_date;
                var shiftType = frm.doc.shift_type;
                var company = frm.doc.company;
                fetchEmployees(frm, attendanceDate, shiftType, company);
            }),
            frm.add_custom_button(__('Calculate Payout'), function() {
                calculatePayout(frm);
    }
    )
        }
    
    },

    attendance_date: function(frm) { 
        frm.add_custom_button(__('Get Employees'), function() {
            var attendanceDate = frm.doc.attendance_date;
            var shiftType = frm.doc.shift_type;
            var company = frm.doc.company;
            fetchEmployees(frm, attendanceDate, shiftType, company);
        }),
        frm.add_custom_button(__('Calculate Payout'), function() {
            calculatePayout(frm);
}
)
     
    }
    
});

// Define a function to handle rate, amount, and totals calculation
function updateItemDetails(frm, cdt, cdn, child) {
    var total_quantity = 0;
    var total_amount = 0;

    frappe.call({
        method: 'nl_piece_rate_pay.nl_piece_rate_pay.doctype.casual_payroll_payout.casual_payroll_payout.get_rate',
        args: {
            activity: child.activity_type,
            item: child.item,
        },
        callback: function(response) {
            if (response && response.message) {
                var rate = response.message;
                var amount = rate * (child.quantity || 1); // Use child.quantity or default to 1 if undefined

                frappe.model.set_value(cdt, cdn, 'rate', rate);
                frappe.model.set_value(cdt, cdn, 'amount', amount);

                frm.refresh_field('casual_payroll_payout_item');

                frm.doc.casual_payrol_payout_item.forEach(function(row) {
                    total_quantity += row.quantity || 0;
                    total_amount += row.amount || 0;
                });

                frm.set_value('total_quantity', total_quantity);
                frm.set_value('total_amount', total_amount);
                frm.refresh_field('total_quantity');
                frm.refresh_field('total_amount');
            }
        }
    });
}

// Attach event handlers using a single function for both 'item' and 'quantity' events
frappe.ui.form.on('Casual Payroll Payout Item', {
    item: function(frm, cdt, cdn) {
        var child = locals[cdt][cdn];
        // Set child.quantity to 1 if it's null or undefined
        frappe.model.set_value(cdt, cdn, 'quantity', 1.00);
        child.quantity = child.quantity || 1;
        updateItemDetails(frm, cdt, cdn, child);
    },

    quantity: function(frm, cdt, cdn) {
        var child = locals[cdt][cdn];
        updateItemDetails(frm, cdt, cdn, child);
    },
 
    
});

// Function to fetch employees based on predefined filters
function fetchEmployees(frm, attendanceDate, shiftType, company) {
    frappe.call({
        method: 'nl_piece_rate_pay.nl_piece_rate_pay.doctype.casual_payroll_payout.casual_payroll_payout.fetch_employees',
        args: {
            "attendance_date": attendanceDate,
            "shift_type": shiftType,
            "company": company,
            "total_amount": frm.doc.total_amount,
            "salary_structure": frm.doc.salary_structure,

        },

        callback: function(response) {
            if (response && response.message) {
                var employees = response.message;
                frappe.model.clear_table(frm.doc, 'casual_payrol_payout_employee');

                response.message.forEach(function(casual) {
                    var new_casual_payrol_payout_employee = frm.add_child('casual_payrol_payout_employee');
                    

                    new_casual_payrol_payout_employee.employee = casual.employee;
                    new_casual_payrol_payout_employee.employee_name = casual.employee_name;
                    new_casual_payrol_payout_employee.shift_type = casual.shift_type;
                    new_casual_payrol_payout_employee.attendance = casual.attendance;
                 
                    new_casual_payrol_payout_employee.amount = casual.amount;
                    new_casual_payrol_payout_employee.checkin=casual.checkin;
                    new_casual_payrol_payout_employee.checkout=casual.checkout;

                });

                frm.refresh();

            }
        }
    });
}

// Function to calculate payout based on total amount and number of employees
function calculatePayout(frm) {
    var totalAmount = frm.doc.total_amount || 0;
    var numberOfEmployees = frm.doc.casual_payrol_payout_employee.length;

    if (numberOfEmployees > 0) {
        var payoutPerEmployee = totalAmount / numberOfEmployees;
        
        frm.doc.casual_payrol_payout_employee.forEach(function(employee) {
            frappe.model.set_value(employee.doctype, employee.name, 'amount', payoutPerEmployee);
        });

        frm.refresh_field('casual_payrol_payout_employee');

    } else {
        frappe.msgprint("No employees found. Unable to calculate payout.");
    }
}