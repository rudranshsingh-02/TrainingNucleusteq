import logging

logging.basicConfig(filename='error_log.txt', level=logging.ERROR)

def divide(a, b):
    try:
        return a / b
    except Exception as e:
        logging.error(f"Exception occurred: {e}")
        print("An error occurred. Check error_log.txt.")

divide(10, 0)
