# NL Piece Rate Pay


**Piece-rate ("casual") worker payroll for ERPNext & Frappe HR.**

NL Piece Rate Pay manages pay for workers who are paid for *what they do* — bags loaded, nets washed, crates packed — rather than a fixed monthly salary. It captures daily piece work, splits the day's earnings among the casuals who were present, rolls those amounts up over a pay period, and feeds the result into the standard Frappe HR payroll engine as Salary Structure Assignments — so statutory deductions like NSSF flow through the official payroll run.


📖 **Full documentation:** https://docs.navari.co.ke/nl-piece-rate-pay/introduction

## Why this app?

A large part of the workforce in many businesses — warehouses, fish processors, construction sites, agricultural depots — isn't on a fixed monthly salary. These **casual workers** are paid for *output*: bags loaded, nets washed, crates packed, sacks offloaded. Their pay is a function of piece work, not hours clocked or a flat salary.

Standard ERPNext/Frappe HR payroll assumes the opposite — a salaried employee with a stable monthly base and a recurring cycle. Forcing casual, output-based pay through that machinery by hand is slow, error-prone, and nearly impossible to audit at the end of a week with dozens of workers across several activity types. The numbers usually end up in a spreadsheet on someone's laptop, disconnected from payroll and from statutory deductions.

NL Piece Rate Pay closes that gap. It turns daily piece work into auditable records, splits earnings fairly among the casuals who showed up, and rolls the period up into the *same* payroll engine everyone else runs through — so casual pay is a first-class, traceable part of the system, with NSSF and other deductions handled by the standard salary structure rather than worked out by hand.

## Features

- **Activity & rate setup** — define activity types ("Loading", "Washing", …) and the pay rate for each *activity + item* pair.
- **Automatic rate fetching** — daily payouts pull the configured rate automatically and compute line and total amounts; unpriced work is blocked rather than paid at zero.
- **Shift-based attendance** — pulls the workers who were present from existing Frappe HR attendance, filtered by shift and date (including their check-in/out times).
- **Equal payout distribution** — the day's total pool is shared evenly among the casuals present.
- **Pay-period roll-up** — aggregates all submitted daily payouts in a date range into a single total per worker.
- **Payroll integration** — generates one Salary Structure Assignment per worker so casual pay enters the normal payroll run, with statutory deductions applied via the chosen salary structure.
- **Double-payment guard** — a "Payment Processed" flag excludes consumed payouts from future roll-ups and is automatically reversed if a roll-up is cancelled.
- **Desk integration** — a dedicated "Casual Piece Rate" workspace and a traceability link from each Salary Structure Assignment back to the roll-up that created it.

## Requirements

- [Frappe Framework](https://github.com/frappe/frappe)
- [ERPNext](https://github.com/frappe/erpnext) *(required)*
- [Frappe HR](https://github.com/frappe/hrms) *(required)*
- Python ≥ 3.10

## Installation

1. [Install bench](https://github.com/frappe/bench)
2. [Install ERPNext](https://github.com/frappe/erpnext#installation)
3. [Install Frappe HR](https://github.com/frappe/hrms)
4. With bench, ERPNext and Frappe HR in place, add the app to your bench:

   ```sh
   bench get-app https://github.com/navariltd/nl-piece-rate-pay.git
   ```

   To pull a specific branch (e.g. `version-15`):

   ```sh
   bench get-app https://github.com/navariltd/nl-piece-rate-pay.git --branch version-15
   ```

5. Install it on your site:

   ```sh
   bench --site {sitename} install-app nl_piece_rate_pay
   ```

   Replace `{sitename}` with your site name.

**Branches:** `develop` (default) and `version-15` — match the branch to your ERPNext/Frappe HR major version.


## Basic usage

The app runs in three stages: set up pricing once, capture work and pay daily, then roll the period up into payroll.

### 1. Set up pricing

Create your **Activity Types**, then for each priced unit of work create a **Casual Activity Item**: choose the activity, the item, and set the **rate per unit**.

![Activity Type](https://github.com/user-attachments/assets/7c6d7da4-ed24-4d6d-9a74-6e57463aaa97)
![Casual Activity Item](https://github.com/user-attachments/assets/8930c6a9-944d-467b-95dd-34ebc8ca509c)

### 2. Daily payout

Make sure casuals have clocked attendance on their **own dedicated shift** for the day, then create a **Casual Payroll Payout**:

1. Set the company, shift type, and attendance date.
2. Add the activities and quantities worked — rates and totals fill in automatically.
3. Click **Get Employees** to pull the workers present on that shift/date.
4. Click **Calculate Payout** to split the day's total equally among them.
5. **Submit.**

![Casual Payroll Payout](https://github.com/user-attachments/assets/66dae217-e76b-4c4a-a13f-a1931cefc658)

### 3. Weekly roll-up

Create a **Casual Salary Structure Assignment Tool**:

1. Set the pay period's start and end dates.
2. Click **Calculate Payout** to total each worker's earnings across the period (consumed payouts are marked *Payment Processed* so they can't be double-counted).
3. Choose the **Salary Structure** to assign — pick one that includes the NSSF component for the period where the deduction should apply.
4. **Save and Submit** to generate a Salary Structure Assignment per worker, ready for the standard payroll run.

![Casual Salary Structure Assignment Tool](https://github.com/user-attachments/assets/a173690d-0eb6-4137-9856-02a813d00274)



For the full workflow, data model, permissions, and operational notes, see the **[full documentation](https://docs.navari.co.ke/nl-piece-rate-pay/introduction)**.


## Support & contributing

- Hit a bug or unexpected behaviour? [Open a GitHub issue](https://github.com/navariltd/nl-piece-rate-pay/issues) — we aim to respond within one business day.
- Built something useful on top of it? Pull requests are welcome.

## License

[GNU AGPLv3](LICENSE)
