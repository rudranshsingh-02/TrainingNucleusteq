def convert_to_int(value):
    try:
        return int(value)
    except ValueError as e:
        raise TypeError("Conversion failed due to invalid type.") from e

try:
    num = convert_to_int("abc")
except TypeError as e:
    print(f"Caught exception: {e}")
