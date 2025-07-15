import re

text = "Important dates: 12-05-2021, 03-11-2022, and 25-12-2023."
dates = re.findall(r'\b\d{2}-\d{2}-\d{4}\b', text)
print(dates)
