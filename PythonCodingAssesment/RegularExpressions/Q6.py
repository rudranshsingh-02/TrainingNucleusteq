import re

def validate_password(password):
    pattern = r'^(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$'
    return bool(re.match(pattern, password))

print(validate_password("Pass@123"))   
print(validate_password("password"))    
print(validate_password("12345678"))   
print(validate_password("Strong1!")) 
