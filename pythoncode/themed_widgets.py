import tkinter as tk
from tkinter import messagebox
from datetime import datetime

# Main window setup
window = tk.Tk()
window.title("Age Calculator")
window.geometry("400x300")

# Birthdate label
birth_label = tk.Label(window, text="Enter your birthdate (YYYY-MM-DD):")
birth_label.pack(pady=10)

# Entry for birthdate
birth_entry = tk.Entry(window)
birth_entry.pack(pady=5)

# Function to calculate age
def calculate_age():
    try:
        # Getting birthdate from the user
        birthdate = birth_entry.get()
        birthdate = datetime.strptime(birthdate, "%Y-%m-%d")
        
        # Getting current date
        current_date = datetime.now()
        
        # Calculating age
        age = current_date.year - birthdate.year
        
        # Checking if the birthday has already occurred this year
        if current_date.month < birthdate.month or (current_date.month == birthdate.month and current_date.day < birthdate.day):
            age -= 1
        
        # Displaying the result
        result_label.config(text=f"Your age is: {age} years")
    except ValueError:
        messagebox.showerror("Invalid Input", "Please enter a valid date in the format YYYY-MM-DD")

# Calculate button
calculate_button = tk.Button(window, text="Calculate Age", command=calculate_age)
calculate_button.pack(pady=20)

# Result label
result_label = tk.Label(window, text="Your age will be displayed here")
result_label.pack(pady=10)

# Run the main loop
window.mainloop()
