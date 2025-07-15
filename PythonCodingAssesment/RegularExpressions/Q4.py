import re

text = "Rudransh and rohit went to New York for Conference."
capital_words = re.findall(r'\b[A-Z][a-z]*\b', text)
print(capital_words)
