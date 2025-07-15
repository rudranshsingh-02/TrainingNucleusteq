import re

query = "name=John&age=30&city=New+York"
pairs = re.findall(r'([^=&]+)=([^&]*)', query)
print(pairs)