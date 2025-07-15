from datetime import datetime

def write_log_entry(message, log_file='log.txt'):
    timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    with open(log_file, 'a') as file:
        file.write(f"[{timestamp}] {message}\n")

write_log_entry("Program started.")
write_log_entry("Another log entry.")