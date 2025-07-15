import csv

def calculate_column_averages(file_path):
    try:
        with open(file_path, 'r') as csvfile:
            reader = csv.DictReader(csvfile)
            columns = reader.fieldnames
            totals = {col: 0 for col in columns if col != "Name"}
            counts = {col: 0 for col in columns if col != "Name"}
            for row in reader:
                for col in totals:
                    value = row[col].strip()
                    if value.isdigit():
                        totals[col] += int(value)
                        counts[col] += 1
            for col in totals:
                average = totals[col] / counts[col] if counts[col] != 0 else 0
                print(f"Average of '{col}': {average:.2f}")
    except FileNotFoundError:
        print("CSV file not found.")
    except Exception as e:
        print(f"An error occurred: {e}")
calculate_column_averages("FileHandling/data.csv")