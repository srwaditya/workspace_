import tkinter as tk
from datetime import datetime

# Create the main window
window = tk.Tk()
window.title("Age Calculator")
window.geometry("400x300")

# Create labels
dob_label = tk.Label(window, text="Enter your Date of Birth (YYYY-MM-DD):")
dob_label.pack(pady=10)

# Create Entry box to take DOB input
dob_entry = tk.Entry(window)
dob_entry.pack(pady=10)

# Function to calculate age
def calculate_age():
    dob = dob_entry.get()  # Get DOB from entry field
    try:
        # Convert input string into date format
        dob_date = datetime.strptime(dob, "%Y-%m-%d")
        today = datetime.today()

        # Calculate the age
        age = today.year - dob_date.year
        if today.month < dob_date.month or (today.month == dob_date.month and today.day < dob_date.day):
            age -= 1  # Subtract 1 year if birthday hasn't occurred yet this year

        result_label.config(text=f"Your Age is: {age} years")  # Display the result
    except ValueError:
        result_label.config(text="Please enter a valid date (YYYY-MM-DD)")  # Error handling for invalid input

# Create a button to calculate age
calculate_button = tk.Button(window, text="Calculate Age", command=calculate_age)
calculate_button.pack(pady=20)

# Create a label to show the result
result_label = tk.Label(window, text="Your Age will be shown here.")
result_label.pack(pady=10)

# Run the main loop
window.mainloop()
