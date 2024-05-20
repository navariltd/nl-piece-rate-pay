# Copyright (c) 2024, Navari Limited and contributors
# For license information, please see license.txt
from datetime import datetime

import frappe
from frappe.model.document import Document

class CasualPayrollPayout(Document):
	def validate(self):
		if not self.attendance_date:
			frappe.throw("Attendance Date is mandatory field")
		if not self.shift_type:
			frappe.throw("Shift Type is mandatory field")
  
@frappe.whitelist(allow_guest=True)
def get_rate():
	activity=frappe.form_dict.get("activity")
	item=frappe.form_dict.get("item")
	costing=frappe.get_all("Casual Activity Item", filters={"activity_type":activity, "item":item}, fields=["costing_rate"])
	if costing:
		rate=costing[0].costing_rate
		frappe.response['message']=rate
	else:
		frappe.throw("Create Costing for this Activity in Casual Activity Item doctype")


@frappe.whitelist(allow_guest=True)
def fetch_employees():
	total_amount=frappe.form_dict.get("total_amount")
	shift_type=frappe.form_dict.get("shift_type")
	attendance_date=frappe.form_dict.get("attendance_date")
	company=frappe.form_dict.get("company")
	employees_attendance = frappe.get_all("Attendance", filters={"attendance_date": attendance_date, "shift": shift_type, "company":company}, fields=["employee", "employee_name", "shift", "status","name"])
	employee_details=[]
	for employee_attendance in employees_attendance:
   
		employee_checkin=frappe.get_all("Employee Checkin", filters={"attendance": employee_attendance.name, "employee":employee_attendance.employee, "log_type":"IN"}, fields=["time"])
		employee_checkout=frappe.get_all("Employee Checkin", filters={"attendance": employee_attendance.name, "employee":employee_attendance.employee, "log_type":"OUT"}, fields=["time"])
  
		employee_detail={
			"employee":employee_attendance.employee,
			"employee_name":employee_attendance.employee_name,
			"shift_type":employee_attendance.shift,
			"attendance":employee_attendance.name,
			"checkin":employee_checkin[0].time if employee_checkin else None,
			"checkout":employee_checkout[0].time if employee_checkout else None,

		}
		
		employee_details.append(employee_detail)
	frappe.response['message']=employee_details

 
#get activity items related to activity type
@frappe.whitelist(allow_guest=True)
def get_activity_items():
	activity_type = frappe.form_dict.get("activity_type")
	items = frappe.get_all("Casual Activity Item", filters={"activity_type": activity_type}, fields=["item"])

	item_names = [item["item"] for item in items]
	frappe.response['message'] = item_names


# @frappe.whitelist(allow_guest=True)
# def open_monthly_nssf_deduction():
# 	salary_components=frappe.get_all("Salary Component", filters={"name": ["like", "%NSSF%"]}, fields=["name"])
# 	for salary_component in salary_components:
# 		if salary_component.monthly==1:
# 			salary_component_doc=frappe.get_doc("Salary Component", salary_component.name)
# 			salary_component_doc.monthly=0
# 			salary_component_doc.save()
# 			frappe.db.commit()
# 	frappe.msgprint(str(salary_component))
	