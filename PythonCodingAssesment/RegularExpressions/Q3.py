import re

text = "Loving the #Python course! #coding #100DaysOfCode"
hashtags = re.findall(r'#\w+', text)
print(hashtags)
