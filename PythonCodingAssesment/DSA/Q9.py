
phonebook = {}
def add_contact(name, number):
    if number.isdigit() and len(number) == 10:
        phonebook[name] = number
        print(f"Added {name}: {number}")
    else:
        print("Invalid phone number. It must be exactly 10 digits and contain only numbers.")

def search_contact(name):
    if name in phonebook:
        print(f"{name}'s number is {phonebook[name]}")
    else:
        print(f"{name} not found.")

def delete_contact(name):
    if name in phonebook:
        del phonebook[name]
        print(f"{name} deleted.")
    else:
        print(f"{name} not found.")

def show_all_contacts():
    print("\nPhonebook:")
    for name, number in phonebook.items():
        print(f"{name} → {number}")

add_contact("Alice", "9876543210")
add_contact("Bob", "8832939992") 
add_contact("Charlie", "123456789")  
search_contact("ruds")
delete_contact("Bob")
show_all_contacts()
