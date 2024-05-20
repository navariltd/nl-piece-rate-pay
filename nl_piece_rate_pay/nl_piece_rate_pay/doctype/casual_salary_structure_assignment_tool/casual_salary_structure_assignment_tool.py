# Copyright (c) 2024, Navari Limited and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class CasualSalaryStructureAssignmentTool(Document):
	def on_submit(self):
		employees_list=self.casuals_weekly_amount
		for employee in employees_list:
			salary_structure_assignment = frappe.new_doc("Salary Structure Assignment")
			salary_structure_assignment.employee = employee.employee
			salary_structure_assignment.salary_structure =self.salary_structure
			salary_structure_assignment.docstatus = 1
			salary_structure_assignment.from_date = self.end_date
			salary_structure_assignment.base = employee.amount
			salary_structure_assignment.custom_casual_weekly_pay=self.name
			salary_structure_assignment.save()
   
	def on_cancel(self):
		casual_payout_list=casual_payout_list = frappe.get_all("Casual Payroll Payout",  filters={
											"attendance_date": (">=", self.start_date),
											"attendance_date": ("<=", self.end_date),
											"docstatus":1,
											"payment_processed":1
										},fields=["name"])
		for doc in casual_payout_list:
			doc = frappe.get_doc("Casual Payroll Payout", doc.name)
			doc.payment_processed=0
			doc.save()


@frappe.whitelist(allow_guest=True)
def get_employees_calculate_weekly_pay():
	start_date=frappe.form_dict.get("start_date")
	end_date=frappe.form_dict.get("end_date")
	employee_total_amount = {}

# Retrieve all Casual Payroll Payout documents within the specified date range
	casual_payout_list = frappe.get_all("Casual Payroll Payout",  filters={
											"attendance_date": (">=", start_date),
											"attendance_date": ("<=", end_date),
											"docstatus":1,
											"payment_processed":0
										},fields=["name"])
	if casual_payout_list:
		for payout in casual_payout_list:
			# Fetch the Casual Payroll Payout document
			doc = frappe.get_doc("Casual Payroll Payout", payout.name)
			if doc.casual_payrol_payout_employee:
				# Iterate over each employee payout in the document
				for pay in doc.casual_payrol_payout_employee:
					employee_name = pay.employee
					amount = pay.amount

					# Update or initialize the total amount for the employee in the dictionary
					if employee_name in employee_total_amount:
						employee_total_amount[employee_name] += amount
					else:
						employee_total_amount[employee_name] = amount
				doc.payment_processed=1
				doc.save()
      
	frappe.response['message'] = employee_total_amount

