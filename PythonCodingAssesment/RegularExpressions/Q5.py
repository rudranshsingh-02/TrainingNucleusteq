import re

text = "Replace all whitespace with hyphens using regex."
replaced = re.sub(r'\s+', '-', text)
print(replaced)
