import locale

def format_currency_us(number):
    return "{:,}".format(number)

def format_currency_indian(number):
    try:
        locale.setlocale(locale.LC_ALL, 'en_IN')
    except:
        locale.setlocale(locale.LC_ALL, '')  
    return locale.format_string("%d", number, grouping=True)

try:
    num = int(input("Enter a number: "))
    system = input("Choose formatting system (US / Indian): ").strip().lower()
    if system == "us":
        print("Formatted (US):", format_currency_us(num))
    elif system == "indian":
        print("Formatted (Indian):", format_currency_indian(num))
    else:
        print("Invalid! Please choose 'US' or 'Indian'.")
except ValueError:
    print("Please enter a valid number.")