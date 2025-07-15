import re

def remove_html(text):
    clean_text = re.sub(r'<[^>]+>', '', text)  # pattern, replacement, string
    return clean_text

print(remove_html("hello<h1>world</h1>"))